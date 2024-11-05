import React from "react";

import "@styles/loading.css"

const Loading = () => {
  return (
    <div class="relative w-full max-w-[1300px] mx-auto h-screen flex flex-col">
      <div class="flex-grow flex items-center justify-center">
        <div class="text-center">
          <div class="flex justify-center mb-6 bg-white rounded-[50%]">
            <img src="/images/logo.png" class="h-[120px] md:h-[180px]  " />
          </div>
          <span className="loading loading-dots text-primary loading-lg"></span>
          </div>
      </div>
      <div class="absolute inset-x-0 bottom-0  py-4 px-4 sm:px-6 md:px-8 lg:px-10">
        <div class="flex flex-col items-center">
          <p class="tracking-[1px] text-[12px]">Library</p>
          <div class="flex items-center mt-1">
            <img src="/images/logo.png" class="h-6 sm:h-8 mx-2 bg-white rounded-[50%]" />
            <p class="text-center text-xs sm:text-sm md:text-base lg:text-lg font-[500]">
              Bagong Barrio Senior High School
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
