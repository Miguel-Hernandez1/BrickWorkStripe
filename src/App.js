import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ChoosePlan from "./pages/ChoosePlan";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51MvmeYCJok6azSgF01pya9b9eQKaEvP2AtZYZicoWRC0XnfG7TWQl5ep2MEqjSrpdT8IqraRss1NU1wlQj4rWXmb00HX9YUIwV"
);

function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <ChoosePlan />
      </Elements>
    </div>
  );
}

export default App;
