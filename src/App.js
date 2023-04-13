import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChoosePlan from "./pages/ChoosePlan";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_publishable_key");

function App() {
  return (
    <div className="App">
      <Router>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<ChoosePlan />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Elements>
      </Router>
    </div>
  );
}

export default App;
