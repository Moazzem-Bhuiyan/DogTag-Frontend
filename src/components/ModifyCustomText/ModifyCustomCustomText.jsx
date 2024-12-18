"use client";
import {useState} from "react";
import CustomHeadline from "../CustomHeadline/CustomHeadline";
import {Button} from "../ui/button";
import DogTagone from "./component/DogTagone";
import DogtagTwo from "./component/DogtagTwo";
import {useFormContext} from "../context/FormContext";
import Swal from "sweetalert2";

const ModifyCustomCustomText = () => {
     const [form1Data, setForm1Data] = useState({});
     const [form2Data, setForm2Data] = useState({});
     const {saveFormData} = useFormContext();
     
     const handleGlobalSubmit = () => {

           Swal.fire({
                         title: "Sorry",
                         text: "It’s still in development. Please try something else",
                         icon: "question",
                    });

          // saveFormData("form1", form1Data);
          // saveFormData("form2", form2Data);
     };
     return (
          <div className=" font-serif">
               <CustomHeadline title="Modify Custom Text" />

               <div className=" md:grid lg:grid-cols-2 gap-20 justify-center items-center w-full lg:max-w-[50%] mx-auto ">
                    <div className="mb-10 md:mb-0 p-5">
                         {" "}
                         <DogTagone onChange={(data) => setForm1Data(data)} />
                    </div>

                    <div className="p-5">
                         <DogtagTwo onChange={(data) => setForm2Data(data)} />
                    </div>
               </div>

               <div className=" flex justify-center p-2">
                    <Button
                         onClick={handleGlobalSubmit}
                         className=" bg-main text-center text-2xl w-full lg:max-w-[30%] mx-auto my-20 py-6 border border-white">
                         Update Dog Tag
                    </Button>
               </div>
          </div>
     );
};

export default ModifyCustomCustomText;
