import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { ref as dbRef, onValue } from 'firebase/database';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      return undefined;
    }

    const profileRef = dbRef(db, `users/${user.uid}`);
    const unsubscribe = onValue(profileRef, (snapshot) => {
      setUserProfile(snapshot.val() || null);
    });

    return () => unsubscribe();
  }, [user]);

  return { user, userProfile };
};
