import { React, useContext, useState } from "react";
import AppContext from "../utils/context";
import { data } from "../data";

function FAQs() {
  const [isClicked, setIsClicked] = useState(false);

  const { isOpened, setIsOpened } = useContext(AppContext);

  const revealAnswer = (index) => {
    if (isClicked === index) return setIsClicked(null);
    setIsClicked(index);
  };

  const accordionClosed = "hidden";
  const accordionOpen = "block text-gray-500 mt-2 md:text-md text-sm";

  return (
    <div className="w-full text-left cursor-pointer">
      <div className="flex items-center" onClick={() => setIsOpened(!isOpened)}>
        {isOpened ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4 md:w-6 md:h-6 inline mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4 md:w-6 md:h-6 inline mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        )}

        <h1 className="font-bold hover:underline text-lg md:text-3xl inline">
          FAQs about API Key
        </h1>
      </div>

      {isOpened && (
        <div className="pt-3">
          {data.map((item, i) => (
            <div
              onClick={() => revealAnswer(i)}
              key={item.question}
              className="p-2 border-2 border-white rounded-lg mb-3"
            >
              <div className="flex justify-between h-full items-center">
                <span className="font-bold text-sm md:text-lg">
                  {item.question}
                </span>
                <span className="text-right">
                  {isClicked === i ? "-" : "+"}
                </span>
              </div>
              {isClicked === i && (
                <div
                  className={isClicked === i ? accordionOpen : accordionClosed}
                >
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FAQs;
