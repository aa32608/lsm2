import React, { useState, useEffect, useRef } from 'react';

// 2Checkout (Verifone) "2Pay.js" Integration
// Documentation: https://verifone.cloud/docs/2checkout/API-Integration/2Pay.js-payments-solution

export default function TwoCheckoutPayment({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [billingName, setBillingName] = useState("");
  const componentRef = useRef(null);
  const clientRef = useRef(null);
  
  // REAL KEYS provided by user
  const MERCHANT_CODE = "255881426731"; 
  
  // Load 2Pay.js script
  useEffect(() => {
    if (document.getElementById('2pay-js-script')) {
      if (window.TwoPayClient) {
        setIsScriptLoaded(true);
      }
      return;
    }
    const script = document.createElement('script');
    script.id = '2pay-js-script';
    script.src = "https://2pay-js.2checkout.com/v1/2pay.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      console.log("2Pay.js loaded");
    };
    script.onerror = () => {
      console.error("Failed to load 2Pay.js");
      if (onError) onError(new Error("Failed to load payment system"));
    };
    document.body.appendChild(script);
  }, []); // Removed onError to prevent infinite loops

  // Initialize 2Pay.js Component
  useEffect(() => {
    if (!isScriptLoaded || !window.TwoPayClient || componentRef.current) return;

    try {
      console.log("Initializing 2Checkout Component...");
      // Fix: Use window.TwoPayClient directly as constructor
      const jsPaymentClient = new window.TwoPayClient(MERCHANT_CODE);
      clientRef.current = jsPaymentClient;
      
      // Create the card component with styling
      const component = jsPaymentClient.components.create('card', {
        style: {
          base: {
             fontFamily: '"Inter", sans-serif',
             fontSize: '16px',
             color: '#374151',
             lineHeight: '24px',
             fontWeight: '400',
             '::placeholder': {
               color: '#9CA3AF'
             }
          },
          invalid: {
             color: '#EF4444'
          }
        }
      });
      
      // Mount it to the #card-element div
      component.mount('#card-element');
      
      // Save reference
      componentRef.current = component;
      
    } catch (err) {
      console.error("Failed to initialize 2Pay.js component:", err);
      if (onError) onError(new Error("Payment system initialization failed"));
    }
  }, [isScriptLoaded, MERCHANT_CODE]); // Removed onError

  const handlePay = async (e) => {
    e.preventDefault();
    
    if (!componentRef.current || !clientRef.current) {
      alert("Payment system not ready. Please refresh.");
      return;
    }

    if (!billingName.trim()) {
      alert("Please enter the cardholder name.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Generating token...");
      
      // Generate token using the mounted component
      // Using the structure from documentation: { billing: { name: ... } }
      const billingDetails = {
        billing: {
          name: billingName
        },
        scope: 'ordering'
      };
      
      console.log("Generating token with details:", billingDetails);
      const result = await clientRef.current.tokens.generate(componentRef.current, billingDetails);
      
      console.log("Token generation result:", result);
      
      if (!result || !result.token) {
        throw new Error("Failed to generate payment token");
      }
      
      const token = result.token;
      
      // Send token to backend
      console.log("Sending token to backend...");
      const res = await fetch('http://localhost:5000/api/2checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          amount,
          currency: 'EUR',
          merchantCode: MERCHANT_CODE,
          billingDetails: {
            name: billingName,
            email: "guest@bizcall.mk" // We could add email input too
          }
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }

      console.log("Payment successful:", data);
      if (onSuccess) onSuccess(data);

    } catch (err) {
      console.error("Payment failed", err);
      if (onError) onError(err);
      // alert("Payment Error: " + (err.message || "Unknown error"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="twocheckout-payment-container p-4 border rounded bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Pay with Card</h3>
        <div className="flex gap-2">
           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Visa</span>
           <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">MasterCard</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
        <input 
          type="text" 
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow shadow-sm"
          placeholder="John Doe"
          value={billingName}
          onChange={e => setBillingName(e.target.value)}
        />
      </div>

      <div className="mb-6 relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
        {/* 2Checkout will inject the iframe here */}
        <div 
          id="card-element" 
          className="p-3 border border-gray-300 rounded-md bg-white shadow-sm min-h-[50px] transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
          style={{ minHeight: '60px' }} 
        >
           {/* Visual placeholder that gets covered/removed by the iframe */}
           {!componentRef.current && (
             <div className="flex items-center justify-center h-full text-gray-400 text-sm py-2">
                <span className="animate-pulse">Loading secure payment form...</span>
             </div>
           )}
        </div>
      </div>

      <button 
        onClick={handlePay}
        disabled={isProcessing || !isScriptLoaded}
        className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-md"
      >
        {isProcessing ? "Processing..." : `Pay €${amount}`}
      </button>

      <div className="text-xs text-gray-500 mt-4 text-center">
        <p>Secure payments powered by 2Checkout (Verifone)</p>
        <p className="mt-1">Supported in North Macedonia 🇲🇰</p>
      </div>
    </div>
  );
}
