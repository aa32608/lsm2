import React, { useState, useEffect, useRef } from 'react';

// 2Checkout (Verifone) "2Pay.js" Integration
// Documentation: https://verifone.cloud/docs/2checkout/API-Integration/2Pay.js-payments-solution

export default function TwoCheckoutPayment({ amount, onSuccess, onError }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Form State
  const [billingData, setBillingData] = useState({
    name: "",
    email: ""
  });

  // References to keep track of the 2Pay.js instances
  const componentRef = useRef(null);
  const clientRef = useRef(null);
  
  // REAL KEYS provided by user
  // Ensure this is your "Merchant Code" from the 2Checkout Dashboard -> API section
  const MERCHANT_CODE = "255881426731"; 
  
  // Load 2Pay.js script
  useEffect(() => {
    // Check if script is already loaded
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
      console.log("2Pay.js script loaded successfully");
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load 2Pay.js script");
      setErrorMessage("Failed to load payment system. Please check your connection.");
      if (onError) onError(new Error("Failed to load payment system"));
    };
    document.body.appendChild(script);
  }, []);

  // Initialize 2Pay.js Component
  useEffect(() => {
    if (!isScriptLoaded || !window.TwoPayClient || componentRef.current) return;

    try {
      console.log("Initializing 2Checkout Component with Merchant Code:", MERCHANT_CODE);
      
      // Initialize the client
      const jsPaymentClient = new window.TwoPayClient(MERCHANT_CODE);
      clientRef.current = jsPaymentClient;
      
      // Customize the card input style
      const component = jsPaymentClient.components.create('card', {
        style: {
          base: {
             fontFamily: '"Inter", "Segoe UI", sans-serif',
             fontSize: '16px',
             color: '#1f2937', // gray-800
             lineHeight: '24px',
             fontWeight: '400',
             '::placeholder': {
               color: '#9ca3af' // gray-400
             }
          },
          invalid: {
             color: '#ef4444', // red-500
             fontWeight: '500'
          }
        }
      });
      
      // Mount the component to the DOM element
      component.mount('#card-element');
      
      // Store the component reference
      componentRef.current = component;
      console.log("2Checkout Component mounted successfully");
      
    } catch (err) {
      console.error("Failed to initialize 2Pay.js component:", err);
      setErrorMessage("Payment system initialization failed.");
      if (onError) onError(new Error("Payment system initialization failed"));
    }
  }, [isScriptLoaded, MERCHANT_CODE]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    
    // validation
    if (!billingData.name.trim() || !billingData.email.trim()) {
      setErrorMessage("Please fill in all required fields (Name and Email).");
      return;
    }

    if (!componentRef.current || !clientRef.current) {
      setErrorMessage("Payment system is not ready. Please refresh the page.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Preparing to generate token...");
      
      // Construct the billing details payload
      // For 2Pay.js token generation, we only pass the cardholder name.
      // Passing extra fields (like email or dummy address data) can sometimes trigger 
      // strict validation errors (e.g. 428 Precondition Required) if the account isn't fully configured.
      const billingDetails = {
        name: billingData.name
      };
      
      console.log("Generating token with payload:", JSON.stringify(billingDetails));
      
      // Call 2Pay.js to tokenize the card
      // We pass the component instance and the billing details
      const result = await clientRef.current.tokens.generate(componentRef.current, billingDetails);
      
      console.log("Token generation result:", result);
      
      if (!result || !result.token) {
        throw new Error("Failed to generate payment token. No token received.");
      }
      
      const token = result.token;
      
      // Send the token to your backend
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
            name: billingData.name,
            email: billingData.email
          }
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Payment failed at backend processing");
      }

      console.log("Payment successful:", data);
      if (onSuccess) onSuccess(data);

    } catch (err) {
      console.error("Payment Error:", err);
      // Handle the specific 428 Precondition Required error if it bubbles up
      if (err.toString().includes("Precondition Required") || (err.message && err.message.includes("428"))) {
         setErrorMessage("Payment initialization failed (428). This often means your 2Checkout Merchant Account has pending actions (e.g. Terms of Service, Password Update). Please check your 2Checkout Dashboard.");
      } else {
         setErrorMessage(err.message || "An error occurred during payment processing.");
      }
      if (onError) onError(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure Payment
        </h3>
        <div className="flex gap-2 opacity-80">
           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-5" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Cardholder Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Cardholder Name</label>
            <input 
              type="text" 
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              placeholder="e.g. John Doe"
              value={billingData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              placeholder="e.g. john@example.com"
              value={billingData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Card Input (Iframe) */}
        <div>
           <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Card Details</label>
           <div 
             id="card-element" 
             className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white min-h-[50px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all shadow-sm"
           >
             {/* 2Checkout injects here */}
           </div>
        </div>

        {/* Pay Button */}
        <button 
          onClick={handlePay}
          disabled={isProcessing || !isScriptLoaded}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md transition-all transform active:scale-[0.98] flex justify-center items-center
            ${isProcessing || !isScriptLoaded 
              ? 'bg-gray-400 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
            }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="h-5 w-5 mr-2 opacity-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Pay €{amount}
            </>
          )}
        </button>
        
        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-400 flex justify-center items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Encrypted & Secure Payment
          </p>
        </div>
      </div>
    </div>
  );
}