import React, { useState } from 'react';

// 2Checkout (Verifone) Hosted Checkout Integration
// Redirects user to secure 2Checkout page to complete payment.
// Solves "Precondition Required" errors and ensures 2Monetize compliance.

export default function TwoCheckoutPayment({ amount, listingId, plan, paymentType, onSuccess, onError, onWillRedirect, productCode }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Form State
  const [billingData, setBillingData] = useState({
    name: "",
    email: ""
  });

  // Use environment variable for Buy Link if provided (Static Link Fallback)
  const BUY_LINK = import.meta.env.VITE_TWOCHECKOUT_BUY_LINK;
  
  // 2Checkout Merchant Code
  const MERCHANT_CODE = import.meta.env.VITE_TWOCHECKOUT_MERCHANT_CODE || "255485315409";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handlePay = async () => {
    setErrorMessage(null);

    // Validate inputs
    if (!billingData.name || !billingData.email) {
      setErrorMessage("Please enter your name and email.");
      return;
    }

    setIsProcessing(true);

    try {
      // Option 1: Use Product Code (Static Product Method) - MOST RELIABLE
      if (productCode) {
        console.log(`Redirecting to 2Checkout for Product Code: ${productCode}`);
        
        // Construct Return URL with query params
        const baseUrl = window.location.origin + window.location.pathname;
        const returnUrl = `${baseUrl}?2checkout_return=true&listingId=${listingId}&plan=${plan}&paymentType=${paymentType}`;
        
        // Build Direct Buy Link (No backend signature needed for standard products)
        const params = new URLSearchParams({
          merchant: MERCHANT_CODE,
          prod: productCode,
          qty: "1",
          type: "digital", // or "tangible" depending on product settings
          "return-type": "redirect",
          "return-url": returnUrl,
          name: billingData.name,
          email: billingData.email,
          country: "MK",
          currency: "EUR", // Force currency to EUR
          ref: listingId // Track listing ID in 2Checkout
        });
        
        const directUrl = `https://secure.2checkout.com/checkout/buy?${params.toString()}`;
        
        console.log("Direct Link:", directUrl);
        
        if (onWillRedirect) {
          onWillRedirect();
        }

        window.location.href = directUrl;
        return;
      }

      // Option 2: Use Static Buy Link (if provided in env)
      if (BUY_LINK) {
        console.log("Redirecting to Static Buy Link...");
        window.location.href = BUY_LINK;
        return;
      }

      // Option 2: Generate Dynamic Link via Backend
      console.log("Generating Dynamic Payment URL...");
      // Determine API URL based on environment
      const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname === "localhost" ? "http://localhost:5000" : "https://lsm-wozo.onrender.com");
      
      // Construct Return URL with query params so we can handle post-payment logic
      const baseUrl = window.location.origin + window.location.pathname;
      const returnUrl = `${baseUrl}?2checkout_return=true&listingId=${listingId}&plan=${plan}&paymentType=${paymentType}`;
      
      const response = await fetch(`${API_BASE}/api/2checkout/payment-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount).toFixed(2),
          currency: "EUR",
          billingDetails: billingData,
          listingId,
          plan,
          paymentType,
          returnUrl: returnUrl
        })
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Failed to generate payment link.");
      }

      console.log("Redirecting to:", data.url);
      
      if (onWillRedirect) {
        onWillRedirect();
      }

      window.location.href = data.url;

    } catch (err) {
      console.error("Payment Error:", err);
      setErrorMessage(err.message || "An error occurred. Please try again.");
      setIsProcessing(false);
      if (onError) onError(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
        <p className="text-gray-500 text-sm">
          Pay <span className="font-bold text-blue-600">€{amount}</span> securely via 2Checkout
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              name="name"
              value={billingData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              value={billingData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition-all transform active:scale-[0.98] flex justify-center items-center mt-6
            ${isProcessing 
              ? 'bg-gray-400 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'
            }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Redirecting to 2Checkout...
            </>
          ) : (
            <>
              Pay €{amount}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
        
        <div className="mt-4 flex items-center justify-center space-x-2 opacity-60">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4" />
           <span className="text-xs text-gray-500 font-medium ml-1">Secured by 2Checkout</span>
        </div>
      </div>
    </div>
  );
}
