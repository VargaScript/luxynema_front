import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OuImcFRD8Q6fnANP1dRRUmJbbSpjFR30tXz6IjcJR3cyDoq1BxrGhduDLbxZYXX2fEzvpU4j2NbXwk5tU03UKcl00fetcDRoN"
);

export const createSession = async (id, title, duration, price) => {
  console.log("Movie ID:", id);
  console.log("Movie title:", title);
  console.log("Movie duration:", duration);
  console.log("Total price:", price);

  return await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: title,
            description: title,
          },
          currency: "mxn",
          unit_amount: parseInt(price),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/payment",
    cancel_url: "http://localhost:3000/cancel",
  });
};
