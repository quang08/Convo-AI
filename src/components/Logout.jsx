import React from "react";
import { auth } from "../utils/firebase";
import { getAuth, signOut } from "firebase/auth";

function Logout() {
  const auth = getAuth();
  const logOut = async () => {
    try {
      signOut(auth).then(() => {
        console.log("signed out");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={logOut}
      className="dark:text-white text-black rounded-lg text-lg dark:bg-teal-500 bg-teal-400 p-2 font-bold transition duration-300 dark:hover:bg-teal-400 hover:bg-teal-300 flex items-center justify-center md:justify-start"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 inline md:mr-[5.2rem] mr-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      <p className="inline">Sign Out</p>
    </button>
  );
}

export default Logout;
