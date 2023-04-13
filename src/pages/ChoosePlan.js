import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const ChoosePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBasicPlanSignup = async (email) => {
    try {
      const response = await axios.post("/api/signup-basic", {
        email: email,
      });

      if (response.status === 200) {
        console.log("User signed up for the Basic plan");
      }
    } catch (error) {
      console.error("Error signing up for the Basic plan:", error);
    }
  };

  const handleProPlanPayment = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const { data: clientSecret } = await axios.post(
      "/api/create-checkout-session",
      {
        email: email,
        plan: "pro",
      }
    );

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (paymentResult.error) {
      setError(paymentResult.error.message);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      console.log("Pro plan payment successful");
    }
  };

  return (
    <>
      <h2>Choose a Plan</h2>
      <div>
        <button onClick={() => handleSelectPlan("basic")}>Basic Plan</button>
        <button onClick={() => handleSelectPlan("pro")}>Pro Plan</button>
      </div>
      {selectedPlan === "basic" && (
        <div>
          <h3>Sign up for the Basic plan</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => handleBasicPlanSignup(email)}>Sign Up</button>
        </div>
      )}
      {selectedPlan === "pro" && (
        <div>
          <h3>Sign up for the Pro plan</h3>
          <form onSubmit={handleProPlanPayment}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CardElement />
            {error && <div className="error">{error}</div>}
            <button disabled={processing} type="submit">
              {processing ? "Processing..." : "Purchase"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChoosePlan;
