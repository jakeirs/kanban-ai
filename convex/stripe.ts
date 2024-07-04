import { action } from "./_generated/server";
import Stripe from "stripe";

export const pay = action({
  args: {},
  handler: async (ctx, {}) => {
    const domain = process.env.HOSTING_URL ?? "http://localhost:3000";
    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: "2024-06-20",
    });

    console.log("stripe", stripe);

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
