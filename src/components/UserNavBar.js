import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { GiHamburgerMenu } from "react-icons/gi";
import "./UserNavBar.css";

function UserNavBar() {
  const [userDetails, setUserDetails] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, "Users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      }
    };
    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = "/login";
  };

  if (!userDetails) return null;

  return (
    <div className="user-navbar">
      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <GiHamburgerMenu />
      </button>

      <div className={`user-info ${menuOpen ? "open" : ""}`}>
        <img src={userDetails.photo || "/default-avatar.png"} alt="User" />
        <span>{userDetails.firstName}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserNavBar;
