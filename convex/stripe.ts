import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import Stripe from "stripe";
import { api, internal } from "./_generated/api";


export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2024-06-20",
});

export const pay = action({
  args: {},
  handler: async (ctx, {}) => {
    const domain = process.env.HOSTING_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: process.env.PRICE_ID!, quantity: 1 }],
      mode: "payment",
      success_url: `${domain}/index-course`,
      cancel_url: `${domain}`,
      automatic_tax: { enabled: true },
    });

    return session.url;
  },
});

export const webhookFulfill = internalAction({
  args: { signature: v.string(), payload: v.any() },
  handler: async (ctx, args) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
      const event = await stripe.webhooks.constructEventAsync(
        args.payload,
        args.signature,
        webhookSecret
      );

      if (event.type === "checkout.session.completed") {
        const completedEvent = event.data.object as Stripe.Checkout.Session;
        const customerEmail = completedEvent.customer_email;

        console.log(
          "customerEmail stripe",
          completedEvent.customer_details?.email
        );
        console.log(" stripe id ", completedEvent.id);

        // await ctx.runMutation(internal.users.setStripeId, {
        //   stripeId: completedEvent.id,
        //   userId,
        // });
      }
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: (err as { message: string }).message };
    }
  },
});
