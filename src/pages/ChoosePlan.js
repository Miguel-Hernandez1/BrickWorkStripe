import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./ChoosePlan.css";

const ChoosePlan = () => {
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [cardElement, setCardElement] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (selectedPlan === "basic") {
      // Handle basic plan sign up without card details
      console.log("Basic plan selected");
      // Implement your sign up logic here
    } else if (selectedPlan === "pro") {
      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card);

      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log("Token created");
        // Implement your payment processing logic here
      }
    }
  };

  return (
    <div className="bg-brickwork-blue text-white min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-10">Our Pricing Plans</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            className={`plan-card p-10 rounded-lg ${
              selectedPlan === "basic" ? "border-4 border-brickwork-yellow" : ""
            }`}
            onClick={() => handlePlanSelect("basic")}
          >
            <h2 className="text-2xl font-bold mb-5">Basic Plan</h2>
            <p className="text-xl">$0.00 USD / month</p>
          </div>
          <div
            className={`plan-card p-10 rounded-lg ${
              selectedPlan === "pro" ? "border-4 border-brickwork-yellow" : ""
            }`}
            onClick={() => handlePlanSelect("pro")}
          >
            <h2 className="text-2xl font-bold mb-5">Pro Plan</h2>
            <p className="text-xl">$25.00 USD / month</p>
          </div>
        </div>

        {selectedPlan && (
          <form
            className="w-full max-w-md mt-10 mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {selectedPlan === "pro" && (
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Card Details
                </label>
                <CardElement
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#fa755a",
                        iconColor: "#fa755a",
                      },
                    },
                  }}
                  onChange={(e) => setCardElement(e.target)}
                />
              </div>
            )}

            <button
              className="bg-brickwork-yellow hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={!stripe}
            >
              Purchase
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChoosePlan;
