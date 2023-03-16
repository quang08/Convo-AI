import { React, useContext} from "react";
import AppContext from "../utils/context";

import Socials from "./Socials";
import Login from "./Login";
import Logout from "./Logout";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function Sidebar() {
  const { setShowSidebar, showSidebar, handleNewChat, handleModal } =
    useContext(AppContext);

  const [user, loading] = useAuthState(auth);

  return (
    <>
      {!showSidebar && (
        <div
          className="flex flex-col items-center justify-center w-8 h-8 cursor-pointer transition duration-300 hover:ring-2 ring-teal-500 rounded-md p-1"
          onClick={() => setShowSidebar(true)}
        >
          <div className="w-full h-px dark:bg-white bg-black"></div>
          <div className="w-full h-px mt-2 dark:bg-white bg-black"></div>
          <div className="w-full h-px mt-2 dark:bg-white bg-black"></div>
        </div>
      )}

      <div
        className={`dark:text-white shadow-2xl text-black top-0 left-0 w-full md:max-w-[350px] dark:bg-neutral-900 bg-slate-50 p-3 fixed h-[100vh] md:h-[98vh] z-40 ease-in-out md:mt-2 duration-500 md:rounded-xl ${
          showSidebar ? "translate-x-0 md:m-2" : "-translate-x-full"
        }`}
      >
        <div className="flex w-full justify-between p-2 items-center">
          <div className="text-4xl font-bold">Menu</div>
          <button
            className="dark:text-white text-black p-2 text-lg font-bold rounded-md w-8 h-8 border-gray-400 cursor-pointer transition duration-300  hover:ring-1 flex justify-center items-center ring-teal-500"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            X
          </button>
        </div>

        <div className="flex flex-col p-2 mt-5 h-[93%] gap-4">
          <button
            onClick={() => handleNewChat()}
            className="dark:text-white text-black dark:bg-teal-500 bg-teal-400 p-2 h-12 rounded-lg text-lg transition duration-300 dark:hover:bg-teal-400 hover:bg-teal-300 font-bold flex items-center justify-center md:justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline md:mr-20 mr-5"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
            New Chat
            <div></div>
          </button>

          <button
            className="dark:text-white text-black rounded-lg text-lg dark:bg-teal-500 bg-teal-400 p-2 h-12 font-bold transition duration-300 dark:hover:bg-teal-400 hover:bg-teal-300 flex items-center justify-center md:justify-start"
            onClick={handleModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 inline md:mr-16 mr-5"
            >
              <path
                fillRule="evenodd"
                d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
                clipRule="evenodd"
              />
            </svg>
            <p className="inline">Enter API Key</p>
            <div></div>
          </button>

          {!user && <Login />}

          {user && <Logout />}
          <div className="flex flex-1 border-b-2 border-gray-400"></div>

          <Socials />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
