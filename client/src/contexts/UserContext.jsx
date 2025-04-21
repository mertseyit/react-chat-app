/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const loginWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          userUID: result.user.uid,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setUser(null);
      });
  };

  const logOut = () => {
    signOut(auth).then(() => {
      console.log('Log out !');
      setUser(null);
    });
    //kullanıcı her çıkış yaptığında oturum id değerlerini sıfırlayalım. Farklı tür kullanıcılara aynı session id değerlerini vermemek için.
    localStorage.removeItem('session');
  };

  useEffect(() => {
    setPageLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          userUID: currentUser.uid,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
      setPageLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        loginWithGoogle,
        loading,
        user,
        logOut,
        pageLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
