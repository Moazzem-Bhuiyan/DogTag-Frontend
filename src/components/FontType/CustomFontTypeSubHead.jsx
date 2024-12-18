import React from "react";

const CustomFontTypeSubHead = ({ title, className }) => {
  return (
    <div>
      <h1
        className={`${className} bg-main text-center text-xl w-full max-w-[80%]  mt-5 p-2 rounded-sm border`}
      >
        {title}
      </h1>
    </div>
  );
};

export default CustomFontTypeSubHead;
