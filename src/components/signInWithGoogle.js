import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "./firebase"; 

const SignInWithGoogle = () => {
 
const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName,
        photo: user.photoURL,
        lastName: "",
      });
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      window.location.href = "/welcome";
    }
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.warn("Google Sign-In was cancelled by the user.");
      toast.info("Google Sign-In was cancelled.", { position: "bottom-center" });
    } else {
      console.error("Google Sign-In error:", error);
      toast.error(error.message, { position: "bottom-center" });
    }
  }
};

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../google.png")} alt="Google login" width={"60%"} />
      </div>
    </div>
  );
};

export default SignInWithGoogle;
