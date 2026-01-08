import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { ref as dbRef, onValue } from 'firebase/database';

export const useFeedback = () => {
  const [feedbackStore, setFeedbackStore] = useState({});

  useEffect(() => {
    const feedbackRef = dbRef(db, "feedback");
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const val = snapshot.val() || {};
      const normalized = {};

      Object.entries(val).forEach(([listingId, entriesObj]) => {
        const entries = Object.values(entriesObj || {})
          .map((entry) => ({
            rating: Number(entry.rating) || 0,
            comment: entry.comment || "",
            createdAt: entry.createdAt || 0,
            userId: entry.userId || null,
            author: entry.author || null,
          }))
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          .slice(0, 50);

        normalized[listingId] = { entries };
      });

      setFeedbackStore(normalized);
    });

    return () => unsubscribe();
  }, []);

  const feedbackAverages = useMemo(() => {
    const map = {};
    Object.entries(feedbackStore).forEach(([listingId, data]) => {
      const entries = data?.entries || [];
      const total = entries.reduce((sum, e) => sum + (Number(e.rating) || 0), 0);
      const count = entries.length;
      map[listingId] = { count, avg: count ? Number((total / count).toFixed(1)) : null };
    });
    return map;
  }, [feedbackStore]);

  return { feedbackStore, feedbackAverages };
};
