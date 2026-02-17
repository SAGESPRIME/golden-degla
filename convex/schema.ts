import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    stock: v.number(),
    categoryId: v.id("categories"),
    imageId: v.optional(v.id("_storage")),
    isActive: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId", "isActive"])
    .index("by_active", ["isActive"]),

  cart: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId"]),

  orders: defineTable({
    userId: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    total: v.number(),
    stripeSessionId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    shippingAddress: v.object({
      name: v.string(),
      email: v.string(),
      line1: v.string(),
      line2: v.optional(v.string()),
      city: v.string(),
      postalCode: v.string(),
      country: v.string(),
    }),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_stripe_session", ["stripeSessionId"]),

  orderItems: defineTable({
    orderId: v.id("orders"),
    productId: v.id("products"),
    quantity: v.number(),
    price: v.number(),
    productName: v.string(),
  }).index("by_order", ["orderId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
