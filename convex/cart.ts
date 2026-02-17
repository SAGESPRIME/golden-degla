import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return Promise.all(
      cartItems.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          ...item,
          product: {
            ...product,
            imageUrl: product?.imageId ? await ctx.storage.getUrl(product.imageId) : null,
          },
        };
      })
    );
  },
});

export const add = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const product = await ctx.db.get(args.productId);
    if (!product || !product.isActive) throw new Error("Product not found");
    if (product.stock < args.quantity) throw new Error("Insufficient stock");

    const existing = await ctx.db
      .query("cart")
      .withIndex("by_user_product", (q) => q.eq("userId", userId).eq("productId", args.productId))
      .unique();

    if (existing) {
      const newQuantity = existing.quantity + args.quantity;
      if (product.stock < newQuantity) throw new Error("Insufficient stock");
      await ctx.db.patch(existing._id, { quantity: newQuantity });
    } else {
      await ctx.db.insert("cart", {
        userId,
        productId: args.productId,
        quantity: args.quantity,
      });
    }
  },
});

export const updateQuantity = mutation({
  args: {
    itemId: v.id("cart"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const item = await ctx.db.get(args.itemId);
    if (!item || item.userId !== userId) throw new Error("Item not found");

    if (args.quantity <= 0) {
      await ctx.db.delete(args.itemId);
    } else {
      const product = await ctx.db.get(item.productId);
      if (product && product.stock < args.quantity) throw new Error("Insufficient stock");
      await ctx.db.patch(args.itemId, { quantity: args.quantity });
    }
  },
});

export const remove = mutation({
  args: { itemId: v.id("cart") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const item = await ctx.db.get(args.itemId);
    if (!item || item.userId !== userId) throw new Error("Item not found");

    await ctx.db.delete(args.itemId);
  },
});

export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const cartItems = await ctx.db
      .query("cart")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));
  },
});
