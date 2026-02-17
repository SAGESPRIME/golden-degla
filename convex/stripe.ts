"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api, internal } from "./_generated/api";

export const createCheckoutSession = action({
  args: {
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

    const cartItems: any[] = await ctx.runQuery(api.cart.get);
    if (cartItems.length === 0) throw new Error("Cart is empty");

    const lineItems: any[] = cartItems.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.product?.name || "Product",
          images: item.product?.imageUrl ? [item.product.imageUrl] : [],
        },
        unit_amount: Math.round((item.product?.price || 0) * 100),
      },
      quantity: item.quantity,
    }));

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    
    const session: any = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      metadata: {
        userId,
        shippingAddress: JSON.stringify(args.shippingAddress),
      },
    });

    return { sessionId: session.id, url: session.url };
  },
});

export const handleWebhook = action({
  args: {
    signature: v.string(),
    payload: v.string(),
  },
  handler: async (ctx, args): Promise<{ received: boolean }> => {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    
    let event: any;
    try {
      event = stripe.webhooks.constructEvent(
        args.payload,
        args.signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err: any) {
      throw new Error(`Webhook signature verification failed: ${err}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { userId, shippingAddress } = session.metadata;

      // Create order
      const orderId = await ctx.runMutation(api.orders.create, {
        stripeSessionId: session.id,
        shippingAddress: JSON.parse(shippingAddress),
      });

      // Update order status to paid
      await ctx.runMutation(api.orders.updateStatus, {
        orderId,
        status: "paid",
        stripePaymentIntentId: session.payment_intent,
      });
    }

    return { received: true };
  },
});
