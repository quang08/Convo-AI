import { React, useContext, useEffect } from "react";
import AppContext from "../utils/context";
import FAQs from "./FAQs";

function Modal() {
  const { setShowModal, isOpened, apiInput, handleAPI, setApiInput } =
    useContext(AppContext);

  useEffect(() => {
    const apiInput = localStorage.getItem("apiInput");
    if (apiInput) {
      setApiInput(apiInput);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div
        className={
          isOpened
            ? `bg-white text-black p-2 max-h-max rounded-lg max-w-lg relative`
            : `bg-white text-black p-2 rounded-lg max-h-max max-w-lg relative`
        }
      >
        <button
          className="top-1 right-1 absolute p-2  text-sm w-4 h-4 md:text-lg font-bold rounded-md md:w-8 md:h-8 border-gray-400 cursor-pointer transition duration-300  hover:border-2 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          X
        </button>

        <div className="w-full  flex flex-col items-center gap-4 p-3 mt-3">
          <p className="font-bold text-xl md:text-3xl w-full text-center">
            🔑 Enter Your OpenAI API Key:
          </p>
          <p className="text-sm md:text-lg w-3/4 md:w-[95%] text-center">
            You need a working OpenAI API Key in order to use ConvoAI.
          </p>

          <input
            value={apiInput}
            onChange={(e) => setApiInput(e.target.value)}
            required
            className="border-[2.5px] rounded-lg p-2 w-[90%] text-lg focus:outline-none"
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxx"
          />

          <p className="text-teal-600 hover:underline cursor-pointer flex items-center w-3/4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 inline mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
            <a
              href="https://platform.openai.com/account/api-keys"
              target="_blank"
            >
              Get your API key from OpenAI dashboard.
            </a>
          </p>

          <div className="w-[50%] flex justify-between gap-x-2">
            <button
              className="p-1 text-sm md:text-md md:p-2 bg-teal-500 text-white font-bold rounded-lg flex justify-center items-center flex-1 transition duration-300 hover:bg-teal-400 disabled:bg-gray-400"
              onClick={() => handleAPI()}
              disabled={!apiInput.startsWith("sk-")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 inline mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Save
            </button>

            <button
              className="p-1 text-sm md:text-md md:p-2 border text-gray-400 font-bold rounded-lg flex justify-center items-center flex-1 transition duration-300 hover:border-teal-400"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>

          <p className="w-[95%] text-gray-500 text-sm md:text-md">
            The app will connect to OpenAI API server to check if your API Key
            is working properly.
          </p>

          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default Modal;
