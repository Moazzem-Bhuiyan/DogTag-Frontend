"use client";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";

const DogTagtwo = ({onChange, resetForm}) => {
     const [localData, setLocalData] = useState({
          inputA: "",
          inputB: "",
          inputC: "",
          inputD: "",
          inputE: "",
          inputF: "",
     });

     useEffect(() => {
          onChange(localData);
     }, [localData, onChange]);

     useEffect(() => {
          if (resetForm) {
               setLocalData({
                    input1: "",
                    input2: "",
                    input3: "",
                    input4: "",
                    input5: "",
                    input6: "",
               });
          }
     }, [resetForm]);

     const handleInputChange = (e) => {
          const {name, value} = e.target;
          setLocalData((prev) => ({
               ...prev,
               [name]: value,
          }));
     };

     return (
          <div className="space-y-5 p-5 border rounded-lg">
               <h1 className="text-center text-2xl">Dog Tag 2</h1>
               <Input
                    name="inputA"
                    value={localData.inputA}
                    onChange={handleInputChange}
               />
               <Input
                    name="inputB"
                    value={localData.inputB}
                    onChange={handleInputChange}
               />
               <Input
                    name="inputC"
                    value={localData.inputC}
                    onChange={handleInputChange}
               />
               <Input
                    name="inputD"
                    value={localData.inputD}
                    onChange={handleInputChange}
               />
               <Input
                    name="inputE"
                    value={localData.inputE}
                    onChange={handleInputChange}
               />
               <Input
                    name="inputF"
                    value={localData.inputF}
                    onChange={handleInputChange}
               />
          </div>
     );
};

export default DogTagtwo;
