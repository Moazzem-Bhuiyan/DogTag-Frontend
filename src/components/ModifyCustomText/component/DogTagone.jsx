"use client";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";

const DogTagone = ({onChange}) => {
     const [localData, setLocalData] = useState({
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "",
          input6: "",
     });

     useEffect(() => {
          onChange(localData);
     }, [localData, onChange]);

     const handleInputChange = (e) => {
          const {name, value} = e.target;
          setLocalData((prev) => ({
               ...prev,
               [name]: value,
          }));
     };

     return (
          <div className="space-y-5 p-5 border rounded-lg ">
               <h1 className="text-center text-2xl">Dog Tag 1</h1>
               <Input
                    name="input1"
                    value={localData.input1}
                    onChange={handleInputChange}
               />
               <Input
                    name="input2"
                    value={localData.input2}
                    onChange={handleInputChange}
               />
               <Input
                    name="input3"
                    value={localData.input3}
                    onChange={handleInputChange}
               />
               <Input
                    name="input4"
                    value={localData.input4}
                    onChange={handleInputChange}
               />
               <Input
                    name="input5"
                    value={localData.input5}
                    onChange={handleInputChange}
               />
               <Input
                    name="input6"
                    value={localData.input6}
                    onChange={handleInputChange}
               />
          </div>
     );
};

export default DogTagone;
