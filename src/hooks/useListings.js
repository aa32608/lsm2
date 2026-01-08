import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { ref as dbRef, onValue } from 'firebase/database';

export const useListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const listingsRef = dbRef(db, "listings");
    const unsubscribe = onValue(listingsRef, (snapshot) => {
      const val = snapshot.val() || {};
      const arr = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
      const valid = arr.filter((i) => !i.expiresAt || i.expiresAt > Date.now());
      setListings(valid);
    });
    return () => unsubscribe();
  }, []);

  const verifiedListings = useMemo(
    () => listings.filter((l) => l.status === "verified"),
    [listings]
  );

  return { listings, verifiedListings };
};
