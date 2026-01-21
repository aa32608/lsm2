import React, { useState, useEffect, useRef } from 'react';

// 2Checkout (Verifone) "2Pay.js" Integration
// Documentation: https://verifone.cloud/docs/2checkout/API-Integration/2Pay.js-payments-solution

export default function TwoCheckoutPayment({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "MK" // Default to Macedonia
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({ ...prev, [name]: value }));
  };

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

    if (!billingData.name.trim() || !billingData.email.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Generating token...");
      
      // Generate token using the mounted component
      // Using the structure from documentation: { billing: { name: ... } }
      const billingDetails = {
        billing: {
          name: billingData.name,
          email: billingData.email,
          phone: billingData.phone,
          address: billingData.address || "N/A",
          city: billingData.city || "N/A",
          state: billingData.state || "N/A",
          zip: billingData.zip || "N/A",
          country: billingData.country
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
          billingDetails: billingDetails.billing
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Secure Checkout</h3>
        <div className="flex gap-2 opacity-80">
           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-6" />
        </div>
      </div>
      
      {/* Billing Information */}
      <div className="space-y-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider border-b pb-1">Billing Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input 
              type="text" 
              name="name"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="John Doe"
              value={billingData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input 
              type="email" 
              name="email"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="john@example.com"
              value={billingData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            placeholder="+389 70 123 456"
            value={billingData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input 
            type="text" 
            name="address"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            placeholder="123 Main St"
            value={billingData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              type="text" 
              name="city"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="Skopje"
              value={billingData.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
            <input 
              type="text" 
              name="zip"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder="1000"
              value={billingData.zip}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select 
              name="country"
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white"
              value={billingData.country}
              onChange={handleInputChange}
            >
              <option value="MK">Macedonia</option>
              <option value="US">United States</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              {/* Add more as needed */}
            </select>
        </div>
      </div>

      <div className="mb-6 relative">
        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider border-b pb-1 mb-4">Payment Details</h4>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
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
