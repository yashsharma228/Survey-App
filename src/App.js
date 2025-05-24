import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import WelcomeScreen from "./components/WelcomeScreen";
import SurveyScreen from "./components/SurveyScreen";
import ThankYouScreen from "./components/ThankYouScreen";
import Login from "./components/login";
import SignUp from "./components/register";
import Profile from "./components/profile";
import UserNavBar from "./components/UserNavBar";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { SurveyProvider } from "./context/SurveyContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth, db } from "./components/firebase";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          setUser(user);
          if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            } else {
              console.warn("No user document found in Firestore");
            }
          } else {
            setUserData(null);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      })
      .catch((err) => {
        console.error("Error setting persistence:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">🔄 Authenticating...</div>;
  }

  return (
    <SurveyProvider>
      <div className="app-container">
         <header className="survey-header">
    <h2>📋 Survey App</h2>
  </header>
        {user && <UserNavBar />}
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Auth Routes */}
              <Route path="/" element={user ? <Navigate to="/welcome" /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

              {/* Survey Routes */}
              <Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/survey" element={<SurveyScreen />} />
              <Route path="/thankyou" element={<ThankYouScreen />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </SurveyProvider>
  );
};

export default App;
