import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api, internal } from "./_generated/api";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return Promise.all(
      orders.map(async (order) => {
        const items = await ctx.db
          .query("orderItems")
          .withIndex("by_order", (q) => q.eq("orderId", order._id))
          .collect();
        return { ...order, items };
      })
    );
  },
});

export const getById = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const order = await ctx.db.get(args.orderId);
    if (!order || order.userId !== userId) throw new Error("Order not found");

    const items = await ctx.db
      .query("orderItems")
      .withIndex("by_order", (q) => q.eq("orderId", order._id))
      .collect();

    return { ...order, items };
  },
});

export const create = mutation({
  args: {
    stripeSessionId: v.string(),
    shippingAddress: v.object({
      name: v.string(),
      email: v.string(),
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      postalCode: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    if (cartItems.length === 0) throw new Error("Cart is empty");

    let total = 0;
    const orderItemsData = [];

    for (const item of cartItems) {
      const product = await ctx.db.get(item.productId);
      if (!product || !product.isActive) throw new Error("Product not available");
      if (product.stock < item.quantity) throw new Error("Insufficient stock");

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        productName: product.name,
      });

      // Update stock
      await ctx.db.patch(item.productId, { stock: product.stock - item.quantity });
    }

    const orderId = await ctx.db.insert("orders", {
      userId,
      status: "pending",
      total,
      stripeSessionId: args.stripeSessionId,
      shippingAddress: args.shippingAddress,
    });

    // Create order items
    for (const itemData of orderItemsData) {
      await ctx.db.insert("orderItems", {
        orderId,
        ...itemData,
      });
    }

    // Clear cart
    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));

    return orderId;
  },
});

export const updateStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { orderId, status, stripePaymentIntentId } = args;
    
    const updates: any = { status };
    if (stripePaymentIntentId) {
      updates.stripePaymentIntentId = stripePaymentIntentId;
    }

    await ctx.db.patch(orderId, updates);
  },
});

export const adminList = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const user = await ctx.db.get(userId);
    if (!user?.email?.includes("admin")) throw new Error("Admin access required");

    const orders = await ctx.db
      .query("orders")
      .order("desc")
      .collect();

    return Promise.all(
      orders.map(async (order) => {
        const items = await ctx.db
          .query("orderItems")
          .withIndex("by_order", (q) => q.eq("orderId", order._id))
          .collect();
        const customer = await ctx.db.get(order.userId);
        return { ...order, items, customer };
      })
    );
  },
});
