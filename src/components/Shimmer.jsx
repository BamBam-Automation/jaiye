import React from "react";

const Shimmer = () => {
  return (
    <div className="relative overflow-hidden w-full h-full bg-gray-300">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
    </div>
  );
};

export default Shimmer;
