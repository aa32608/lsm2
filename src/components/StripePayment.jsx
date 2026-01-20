import React, { useState } from 'react';

// You would typically install: @stripe/react-stripe-js @stripe/stripe-js
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe("pk_test_...");

export default function StripePayment({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);

  // This is a placeholder component to demonstrate where the Stripe form would go.
  // To enable Stripe:
  // 1. npm install @stripe/react-stripe-js @stripe/stripe-js
  // 2. Uncomment the imports above
  // 3. Provide your Publishable Key in loadStripe()
  // 4. Implement the checkout form below

  const handleDemoPay = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      alert("Stripe integration requires API keys. Please provide Stripe Publishable Key and Secret Key to enable this.");
    }, 1500);
  };

  return (
    <div className="stripe-payment-container p-4 border rounded bg-white">
      <h3 className="text-lg font-bold mb-4">Pay with Card</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="p-3 border rounded bg-gray-50 text-gray-400">
          •••• •••• •••• ••••
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
          <div className="p-3 border rounded bg-gray-50 text-gray-400">
            MM / YY
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
          <div className="p-3 border rounded bg-gray-50 text-gray-400">
            123
          </div>
        </div>
      </div>

      <button 
        onClick={handleDemoPay}
        disabled={isProcessing}
        className="w-full bg-slate-900 text-white py-3 rounded font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : `Pay €${amount}`}
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Powered by Stripe (Integration Pending)
      </p>
    </div>
  );
}
