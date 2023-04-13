import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ plan }) => {
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      console.error("[error]", error);
    } else {
      const response = await axios.post("/api/payment", {
        email: email,
        payment_method_id: paymentMethod.id,
        plan: plan,
      });

      const clientSecret = response.data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        console.error("[error]", result.error);
      } else {
        console.log("[PaymentResult]", result.paymentIntent);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="card">Card</label>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Purchase
      </button>
    </form>
  );
};

const StripeWrapper = ({ plan }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm plan={plan} />
  </Elements>
);

export default StripeWrapper;
