import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../utils/firebase";

function Login() {
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user)
    } catch (e){
        console.log(e);
    }
  };

  return (
    <div onClick={GoogleLogin} className="dark:text-white text-black rounded-lg text-lg dark:bg-teal-500 bg-teal-400 p-2 h-12 font-bold transition duration-300 dark:hover:bg-teal-400 hover:bg-teal-300 flex items-center justify-center md:justify-start">
      <FaGoogle className="w-6 h-6 inline md:mr-[6rem] mr-5" />
      <p className="inline">Sign In</p>
      <div></div>
    </div>
  );
}

export default Login;
