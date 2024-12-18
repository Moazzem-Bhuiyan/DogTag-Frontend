import React from "react";
import { CircleLoader } from "react-spinners";

const loading = () => {
  return (
    <div className=" flex justify-center items-center text-white my-16">
      <CircleLoader color="#ffff" className="animate-spin"></CircleLoader>
    </div>
  );
};

export default loading;
