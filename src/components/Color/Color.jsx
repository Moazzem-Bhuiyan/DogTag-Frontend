"use client";

import {useState} from "react";
import CustomHeadline from "../CustomHeadline/CustomHeadline";
import {Button} from "../ui/button";
import Swal from "sweetalert2";

const ColorPicker = () => {
     const [selectedColor, setSelectedColor] = useState("");

     const handleColorChange = (color) => {
          setSelectedColor(color);
     };

     const handleSubmit = () => {
          Swal.fire({
               title: "Sorry",
               text: "It’s still in development. Please try something else",
               icon: "question",
          });
     };

     return (
          <div className=" font-serif">
               <div className=" font-serif">
                    <CustomHeadline title="Color" className="mb-5" />
               </div>

               <div className="  md:flex md:space-x-8 p-4 justify-center items-center space-y-5">
                    {/* Black Color Option */}
                    <div
                         onClick={() => handleColorChange("black")}
                         className={`relative flex flex-col items-center p-8 md:mt-5 cursor-pointer rounded-md transition-all ${
                              selectedColor === "black"
                                   ? "ring-4 ring-white"
                                   : ""
                         }`}
                         style={{backgroundColor: "black"}}>
                         <input
                              type="checkbox"
                              checked={selectedColor === "black"}
                              onChange={() => handleColorChange("black")}
                              className="absolute bottom-2 left-2"
                         />
                         <label className="text-white mt-2">Black</label>
                    </div>

                    {/* Gray Color Option */}
                    <div
                         onClick={() => handleColorChange("gray")}
                         className={`relative flex flex-col items-center p-8 cursor-pointer rounded-md transition-all ${
                              selectedColor === "gray"
                                   ? "ring-4 ring-white"
                                   : ""
                         }`}
                         style={{backgroundColor: "gray"}}>
                         <input
                              type="checkbox"
                              checked={selectedColor === "gray"}
                              onChange={() => handleColorChange("gray")}
                              className="absolute bottom-2 left-2"
                         />
                         <label className="text-white mt-2">Black</label>
                    </div>

                    {/* White Color Option */}
                    <div
                         onClick={() => handleColorChange("white")}
                         className={`relative flex flex-col items-center p-8 cursor-pointer rounded-md transition-all ${
                              selectedColor === "white"
                                   ? "ring-4 ring-black"
                                   : ""
                         }`}
                         style={{backgroundColor: "white"}}>
                         <input
                              type="checkbox"
                              checked={selectedColor === "white"}
                              onChange={() => handleColorChange("white")}
                              className="absolute bottom-2 left-2"
                         />
                         <label className="text-black mt-2">White</label>
                    </div>

                    {/* Clear Color Option */}
                    <div
                         onClick={() => handleColorChange("clear")}
                         className={`relative flex flex-col items-center p-8 cursor-pointer rounded-md transition-all ${
                              selectedColor === "clear"
                                   ? "ring-4 ring-white"
                                   : ""
                         }`}
                         style={{backgroundColor: "transparent"}}>
                         <input
                              type="checkbox"
                              checked={selectedColor === "clear"}
                              onChange={() => handleColorChange("clear")}
                              className="absolute bottom-2 left-2"
                         />
                         <label className="text-white mt-2">Clear</label>
                    </div>

                    {/* Red Color Option */}
                    <div
                         onClick={() => handleColorChange("red")}
                         className={`relative flex flex-col items-center p-8 cursor-pointer rounded-md transition-all ${
                              selectedColor === "red" ? "ring-4 ring-white" : ""
                         }`}
                         style={{backgroundColor: "red"}}>
                         <input
                              type="checkbox"
                              checked={selectedColor === "red"}
                              onChange={() => handleColorChange("red")}
                              className="absolute bottom-2 left-2"
                         />
                         <label className="text-white mt-2">Red</label>
                    </div>
               </div>

               <div className=" flex justify-center p-5">
                    <Button
                         onClick={handleSubmit}
                         className=" bg-main text-center text-2xl w-full md:max-w-[30%] mx-auto my-20 p-2 font-serif ">
                         Update Dog Tag
                    </Button>
               </div>
          </div>
     );
};

export default ColorPicker;
