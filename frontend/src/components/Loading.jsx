import React from "react";
import '../css/Loading.css'
const Loading = () => {
  return (
    <>
      <section className=" flex items-center justify-center min-h-screen">
        <div className="">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-28 w-28 mb-4"></div>
         <div className="w-full flex flex-col">
         <h2 className="text-xl font-semibold text-white">Loading...</h2>
         </div>
        </div>
      </section>
    </>
  );
};

export default Loading;
