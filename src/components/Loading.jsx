import React from 'react'

function Loading() {
  return (
    <div className="text-white bg-gray-500 p-3 rounded-lg mt-10 flex max-w-max">
      <div className="w-1 h-1 rounded-full bg-gray-200 mr-1 animate-pulse"></div>
      <div className="w-1 h-1 rounded-full bg-gray-200 mr-1 animate-pulse"></div>
      <div className="w-1 h-1 rounded-full bg-gray-200 mr-1 animate-pulse"></div>
    </div>
  );
}

export default Loading