import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function PayPalV6({ 
  amount, 
  listingId, 
  type = "create", 
  plan, 
  formData, 
  onSuccess, 
  onError, 
  onCancel 
}) {
  const [clientId, setClientId] = useState(null);
  const [error, setError] = useState(null);

  // Fetch PayPal Client ID from backend
  useEffect(() => {
    fetch(`${API_BASE}/api/paypal/config`)
      .then(res => res.json())
      .then(data => {
        if (data.clientId) {
          setClientId(data.clientId);
        } else {
          console.error("PayPal Client ID missing from backend config");
          setError("Payment system configuration missing. Please contact support.");
        }
      })
      .catch(err => {
        console.error("Failed to fetch PayPal config:", err);
        setError("Failed to load payment system. Please try again later.");
      });
  }, []);

  const handleCreateOrder = async (data, actions) => {
    try {
      // Save state just in case (though we expect popup flow)
      if ((type === "create" || type === "create_listing") && formData) {
        localStorage.setItem("pending_listing_data", JSON.stringify({
          ...formData,
          plan: plan
        }));
      }

      const body = { 
        listingId, 
        amount, 
        action: type === "extend" ? "extend" : "create_listing",
        returnUrl: window.location.href, // Required by backend but unused in popup flow
        cancelUrl: window.location.href
      };

      const res = await fetch(`${API_BASE}/api/paypal/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || orderData.message || "Order creation failed");
      
      return orderData.orderID; // Expects just the ID string
    } catch (err) {
      console.error("Create Order Error:", err);
      setError("Could not initiate payment. " + err.message);
      throw err;
    }
  };

  const handleApprove = async (data, actions) => {
    try {
      const res = await fetch(`${API_BASE}/api/paypal/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const captureData = await res.json();
      
      if (!res.ok || !captureData.ok) {
        throw new Error(captureData.error || "Payment capture failed");
      }

      if (onSuccess) onSuccess(captureData);
    } catch (err) {
      console.error("Capture Error:", err);
      setError("Payment failed: " + err.message);
      if (onError) onError(err);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm underline hover:text-red-800"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading secure payment...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Pay Securely with PayPal or Card
      </h3>
      
      <PayPalScriptProvider options={{ 
        "client-id": clientId, 
        currency: "EUR",
        intent: "capture"
      }}>
        <PayPalButtons 
          style={{ layout: "vertical", shape: "rect", color: "gold", label: "pay" }}
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onCancel={() => {
            if (onCancel) onCancel();
          }}
          onError={(err) => {
            console.error("PayPal Button Error:", err);
            setError("An error occurred with the payment system.");
          }}
        />
      </PayPalScriptProvider>
      
      <p className="text-xs text-center text-gray-400 mt-4">
        Powered by PayPal. Secure encryption.
      </p>
    </div>
  );
}
