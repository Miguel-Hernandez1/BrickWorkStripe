import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brickwork-dark-blue text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Brickwork</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/choose-plan">Choose a Plan</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow bg-gray-100">
        <section className="container mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Pricing Plans</h2>
            <p className="text-xl">
              Choose the best plan that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Basic Plan</h3>
              <p className="text-xl font-semibold mb-6">$0.00 USD / month</p>
              <Link
                to="/choose-plan"
                className="bg-brickwork-orange text-white px-4 py-2 rounded-lg"
              >
                Choose Plan
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
              <p className="text-xl font-semibold mb-6">$25.00 USD / month</p>
              <Link
                to="/choose-plan"
                className="bg-brickwork-orange text-white px-4 py-2 rounded-lg"
              >
                Choose Plan
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brickwork-dark-blue text-white py-4">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Brickwork. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
