import React from 'react';

export default function BankTransferPayment({ amount, listingId, plan, onConfirm }) {
  return (
    <div className="bank-transfer-container p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-bold text-lg mb-4 text-gray-800">Bank Transfer Instructions</h4>
      
      <div className="bg-white p-4 rounded border border-gray-100 mb-4 shadow-sm">
        <p className="text-sm text-gray-500 mb-1">Recipient Name:</p>
        <p className="font-mono font-medium mb-3 select-all">Jovan Petrov</p>
        
        <p className="text-sm text-gray-500 mb-1">Bank Name:</p>
        <p className="font-medium mb-3">Komercijalna Banka</p>
        
        <p className="text-sm text-gray-500 mb-1">Account Number (MKD):</p>
        <p className="font-mono font-bold text-lg mb-3 select-all text-blue-600">300000000123456</p>
        
        <p className="text-sm text-gray-500 mb-1">Payment Reference / Note:</p>
        <p className="font-mono font-bold select-all bg-yellow-50 p-1 rounded inline-block">
          Listing #{listingId.slice(-6)}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Amount to Pay:</p>
            <p className="font-bold text-xl text-green-600">{(amount * 61.5).toFixed(0)} MKD <span className="text-xs text-gray-400 font-normal">(~€{amount})</span></p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        <p>1. Use your mobile banking app or visit a bank/post office.</p>
        <p>2. Make a payment to the account above.</p>
        <p>3. Use the Reference ID in the payment description.</p>
        <p>4. Click "Confirm Payment" below once sent.</p>
      </div>

      <button
        onClick={onConfirm}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center"
      >
        <span>I Have Sent the Payment</span>
      </button>
      
      <p className="text-xs text-center text-gray-400 mt-3">
        Your listing will be activated within 24 hours after verification.
      </p>
    </div>
  );
}
