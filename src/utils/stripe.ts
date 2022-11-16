import { firebaseApp, getCurrentUser } from "./firebase";
import {
  createCheckoutSession,
  getProducts,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51M3vNtGqAjaLGqgkQ9GgZthAGc9zWhGm9VinnLOb8OgHVj7Q7GESnAPgKWXaJPlpePP6hmAgnit6dCoonGBz4ErI00PnHZ8NIt"
);

const payments = getStripePayments(firebaseApp, {
  productsCollection: "products",
  customersCollection: "stripe_customers",
});

export async function getSubscriptionProducts() {
  const products = await getProducts(payments);
  for (const product of products) {
    console.log(product);
  }
  return products;
}

// Start a subscription checkout session
export async function startCheckout() {
  if (await getCurrentUser()) {
    const session = await createCheckoutSession(payments, {
      price: "myPriceId",
      // success_url: "https://example.com/payments/success",
      // cancel_url: "https://example.com/payments/cancel",
    });
    window.location.assign(session.url);
    return session;
  }
  return null;
}
