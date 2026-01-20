import React, { useEffect, useRef, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function PayPalV6({ 
  amount, 
  listingId, 
  type = "create", 
  plan, 
  formData, // passed to save in localStorage
  onSuccess, 
  onError, 
  onCancel 
}) {
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const buttonRef = useRef(null);
  const sessionRef = useRef(null);
  const sdkInstanceRef = useRef(null);

  // Load SDK Script
  useEffect(() => {
    if (document.getElementById("paypal-sdk-v6")) {
      // If script exists, check if global paypal is ready
      if (window.paypal) setIsReady(true);
      return;
    }
    
    const script = document.createElement("script");
    script.id = "paypal-sdk-v6";
    script.src = "https://www.paypal.com/web-sdk/v6/core";
    script.async = true;
    script.onload = () => setIsReady(true);
    script.onerror = () => setError("Failed to load PayPal SDK");
    document.body.appendChild(script);
  }, []);

  const createOrderFn = async () => {
    console.log("[PayPal V6] Creating Order...");
    
    // Save state for redirects
    if (type === "create" || type === "create_listing") {
      if (formData) {
         localStorage.setItem("pending_listing_data", JSON.stringify({
           ...formData,
           plan: plan
         }));
      }
    }

    const returnUrlObj = new URL(window.location.origin + window.location.pathname);
    returnUrlObj.searchParams.set("paypal_return", "true");
    returnUrlObj.searchParams.set("listingId", listingId);
    returnUrlObj.searchParams.set("paymentType", type);
    if (type === "extend" && plan) {
      returnUrlObj.searchParams.set("plan", plan);
    }

    const body = { 
      listingId, 
      amount, 
      action: type === "extend" ? "extend" : "create_listing",
      returnUrl: returnUrlObj.toString(),
      cancelUrl: window.location.href
    };

    const res = await fetch(`${API_BASE}/api/paypal/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Order creation failed");
    
    console.log("[PayPal V6] Order Created:", data.orderID);
    return data.orderID;
  };

  // Initialize SDK and Session
  useEffect(() => {
    if (!isReady) return;

    let cleanupListener = null;

    const init = async () => {
      try {
        if (!sdkInstanceRef.current) {
          // 1. Get Token
          const tokenRes = await fetch(`${API_BASE}/api/paypal/token`);
          if (!tokenRes.ok) throw new Error("Failed to fetch PayPal token");
          const { accessToken } = await tokenRes.json();
          
          if (!accessToken) throw new Error("No access token returned");

          // 2. Create Instance
          sdkInstanceRef.current = await window.paypal.createInstance({
            clientToken: accessToken,
            components: ["paypal-payments"],
            pageType: "checkout",
          });
        }

        // 3. Check Eligibility
        const methods = await sdkInstanceRef.current.findEligibleMethods({ 
          currencyCode: "EUR" 
        });
        
        if (methods.isEligible("paypal")) {
          // 4. Create Session
          sessionRef.current = sdkInstanceRef.current.createPayPalOneTimePaymentSession({
            onApprove: (data) => {
              console.log("[PayPal V6] Approved:", data);
              if (onSuccess) onSuccess(data);
            },
            onCancel: (data) => {
              console.log("[PayPal V6] Cancelled:", data);
              if (onCancel) onCancel(data);
            },
            onError: (err) => {
              console.error("[PayPal V6] Error:", err);
              if (onError) onError(err);
            },
          });

          // 5. Show Button and Attach Listener
          if (buttonRef.current) {
            buttonRef.current.hidden = false;
            
            const handleClick = async () => {
              if (!sessionRef.current) return;
              try {
                const orderId = await createOrderFn();
                await sessionRef.current.start({
                  presentationMode: "auto",
                }, orderId);
              } catch (err) {
                console.error("[PayPal V6] Start Error:", err);
                if (onError) onError(err);
              }
            };

            buttonRef.current.addEventListener("click", handleClick);
            cleanupListener = () => buttonRef.current.removeEventListener("click", handleClick);
          }
        } else {
          setError("PayPal is not eligible for this transaction.");
        }
      } catch (err) {
        console.error("[PayPal V6] Init Exception:", err);
        setError(err.message);
      }
    };

    init();

    return () => {
      if (cleanupListener) cleanupListener();
    };
  }, [isReady]);



  if (error) return <div className="text-red-500 text-sm p-2 bg-red-50 rounded">Error: {error}</div>;

  return (
    <div className="w-full flex justify-center py-2">
      {/* Custom element for PayPal V6 */}
      <paypal-button 
        ref={buttonRef} 
        type="pay" 
        hidden 
        style={{
            display: 'block',
            width: '100%',
            height: '45px'
        }}
      ></paypal-button>
    </div>
  );
}
