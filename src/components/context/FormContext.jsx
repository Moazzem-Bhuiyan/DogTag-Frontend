"use client";
import {createContext, useContext, useState} from "react";

const FormContext = createContext();

export const FormProvider = ({children}) => {
     const [formData, setFormData] = useState({form1: {}, form2: {}});

     const saveFormData = (formName, data) => {
          setFormData((prev) => ({
               ...prev,
               [formName]: data,
          }));
     };

     return (
          <FormContext.Provider value={{formData, saveFormData}}>
               <div className="text-white">{children}</div>
          </FormContext.Provider>
     );
};

export const useFormContext = () => useContext(FormContext);
