"use client";
import {useState} from "react";
import CustomHeadline from "../CustomHeadline/CustomHeadline";
import {Button} from "../ui/button";
import DogTagone from "./component/DogTagone";
import DogtagTwo from "./component/DogtagTwo";
import {useFormContext} from "../context/FormContext";
import Swal from "sweetalert2";
import {FaTimes} from "react-icons/fa";

const ModifyCustomCustomText = () => {
     const [form1Data, setForm1Data] = useState({});
     const [form2Data, setForm2Data] = useState({});
     const {saveFormData} = useFormContext();

     const handleGlobalSubmit = () => {
          // Swal.fire({
          //      html: '<span style="color: black; font-weight: bold;">Tag Updated Successfully Please purchase now...</span>',
          //      icon: "success",
          //      draggable: true,
          // });

          // saveFormData("form1", form1Data);
          // saveFormData("form2", form2Data);
          Swal.fire({
               html: '<span style="color: black; font-weight: bold;">"Its still under development, please try another option.".</span>',
               icon: "warning",
               draggable: true,
          });
     };

     const isForm1Filled = Object.values(form1Data).some(
          (value) => value.trim() !== "",
     );
     const isForm2Filled = Object.values(form2Data).some(
          (value) => value.trim() !== "",
     );
     const isButtonDisabled = !(isForm1Filled && isForm2Filled);

     // relaod this window
     const hanleReload = () => {
          window.location.reload();
     };

     return (
          <div className="font-serif">
               <CustomHeadline title="Modify Custom Text" />

               <div className="md:grid lg:grid-cols-2 gap-20 justify-center items-center w-full lg:max-w-[50%] mx-auto">
                    <div className="mb-10 md:mb-0 p-5">
                         <DogTagone onChange={(data) => setForm1Data(data)} />
                    </div>

                    <div className="p-5">
                         <DogtagTwo onChange={(data) => setForm2Data(data)} />
                    </div>
               </div>

               <div className="flex justify-center p-2">
                    <Button
                         onClick={hanleReload}
                         disabled={isButtonDisabled} // Disable the button if forms are invalid
                         className={`text-center  text-2xl w-full max-w-[4%] mx-auto border ${
                              isButtonDisabled
                                   ? "bg-gray-400 cursor-not-allowed"
                                   : "bg-main border-white text-red-500"
                         }`}>
                         <FaTimes />
                    </Button>
               </div>
               <div className="flex justify-center p-2">
                    <Button
                         onClick={handleGlobalSubmit}
                         disabled={isButtonDisabled} // Disable the button if forms are invalid
                         className={`text-center text-2xl w-full lg:max-w-[30%] mx-auto my-20 py-6 border ${
                              isButtonDisabled
                                   ? "bg-gray-400 cursor-not-allowed"
                                   : "bg-main border-white"
                         }`}>
                         Update Dog Tag
                    </Button>
               </div>
          </div>
     );
};

export default ModifyCustomCustomText;
