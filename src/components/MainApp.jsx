"use client";
import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import HomeTab from './HomeTab';
import ListingsTab from './ListingsTab';
import MyListingsTab from './MyListingsTab';
import AccountTab from './AccountTab';
import ListingDetailView from './ListingDetailView';

export default function MainApp() {
  const { selectedTab, setSelectedTab, selectedListing, setSelectedListing } = useApp();

  // Scroll to top when tab changes, if desired. 
  // For "instant" feel, maybe we don't want to scroll to top if user was there?
  // But usually tabs are independent views.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTab]);

  return (
    <div className="main-app-container">
      <div style={{ display: selectedTab === 'home' ? 'block' : 'none' }}>
        <HomeTab />
      </div>
      
      {/* 'allListings' and 'explore' map to ListingsTab */}
      <div style={{ display: (selectedTab === 'allListings' || selectedTab === 'explore') ? 'block' : 'none' }}>
        <ListingsTab />
      </div>
      
      <div style={{ display: selectedTab === 'myListings' ? 'block' : 'none' }}>
        <MyListingsTab />
      </div>
      
      <div style={{ display: selectedTab === 'account' ? 'block' : 'none' }}>
        <AccountTab />
      </div>
      
      {selectedListing && (
        <ListingDetailView 
          initialListing={selectedListing} 
          onClose={() => {
            setSelectedListing(null);
            if (typeof window !== 'undefined' && window.location.pathname.includes('/listings/')) {
               window.history.back();
            }
          }} 
        />
      )}
    </div>
  );
}
