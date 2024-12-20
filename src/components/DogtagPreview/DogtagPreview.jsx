"use client";

import html2canvas from "html2canvas";
import CustomHeadline from "../CustomHeadline/CustomHeadline";
import {useFormContext} from "../context/FormContext";
import {Download} from "lucide-react";
import {Button} from "../ui/button";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useDogtagContext} from "../context/DogtagContext";
import {useRouter} from "next/navigation";

// Helper function to check if an object has at least one non-empty value
const hasNonEmptyValues = (obj) => {
     return Object.values(obj).some((value) => value && value.trim() !== "");
};

const DogtagPreview = () => {
     const {formData} = useFormContext();
     const router = useRouter();
     const {setPreviews} = useDogtagContext();

     const [buynow, setBuynow] = useState(false);

     const renderFormData = (form) => {
          return Object.entries(form).map(([key, value]) => (
               <div key={key} className="plate py-2">
                    {value}
               </div>
          ));
     };

     const handleDownload = async (divId) => {
          const element = document.getElementById(divId);
          if (element) {
               const canvas = await html2canvas(element);
               const link = document.createElement("a");
               link.download = `${divId}-image.png`;
               link.href = canvas.toDataURL("image/png");
               link.click();
          }
     };

     useEffect(() => {
          // Check if formData.form1 or formData.form2 has non-empty values
          if (
               formData &&
               hasNonEmptyValues(formData.form1 || {}) &&
               hasNonEmptyValues(formData.form2 || {})
          ) {
               setBuynow(true);
          } else {
               
               setBuynow(false);
          }
     }, [formData]);

     const handleBuyNowSubmit = async () => {
          try {
               const dogtag1 = document.getElementById("dogtag-1");
               const dogtag2 = document.getElementById("dogtag-2");
               const previews = [];

               if (dogtag1) {
                    const canvas1 = await html2canvas(dogtag1);
                    previews.push(canvas1.toDataURL("image/png"));
               }

               if (dogtag2) {
                    const canvas2 = await html2canvas(dogtag2);
                    previews.push(canvas2.toDataURL("image/png"));
               }

               if (previews.length) {
                    // Save to context or global state
                    setPreviews(previews);

                    // Navigate to the billing details page
                    router.push("/CustomOrder");
               } else {
                    Swal.fire({
                         title: "No Data",
                         text: "Please create a dog tag before proceeding.",
                         icon: "warning",
                    });
               }
          } catch (error) {
               Swal.fire({
                    title: "Error",
                    text: "Failed to process the Dog Tags. Please try again later.",
                    icon: "error",
               });
          }
     };

     return (
          <div className=" font-serif">
               <CustomHeadline title="My Dog Tag" />

               {/* --------Dogtags Preview----------- */}
               <div className="grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 justify-center items-center w-full 2xl:max-w-[50%] mx-auto p-6 sm:p-8 md:p-10 lg:p-10 2xl:gap-20">
                    {/* div 1 */}
                    <div
                         id="dogtag-1"
                         className="relative w-[400px] h-52 bg-content md:bg-cover bg-center bg-no-repeat"
                         style={{backgroundImage: "url('/plate.png')"}}>
                         <div className="absolute ml-40 mt-8">
                              <h1 className="text-3d uppercase text-center font-bold text-black">
                                   {formData?.form1
                                        ? renderFormData(formData.form1)
                                        : null}
                              </h1>
                         </div>

                         <div className="flex justify-end">
                              <button
                                   onClick={() => handleDownload("dogtag-1")}>
                                   <Download />
                              </button>
                         </div>
                    </div>

                    {/* div 2 */}
                    <div
                         id="dogtag-2"
                         className="relative w-[400px] my-2  h-52 bg-content md:bg-cover bg-center bg-no-repeat "
                         style={{backgroundImage: "url('/plate.png')"}}>
                         <div className="absolute ml-40 mt-8">
                              <h1 className="text-3d uppercase text-center font-bold text-black">
                                   {formData?.form2
                                        ? renderFormData(formData.form2)
                                        : null}
                              </h1>
                         </div>

                         <div className="flex justify-end">
                              <button
                                   onClick={() => handleDownload("dogtag-2")}>
                                   <Download />
                              </button>
                         </div>
                    </div>
               </div>

               {/* Buy Now Button */}
               {buynow && (
                    <div className="flex justify-center p-2">
                         <Button
                              onClick={handleBuyNowSubmit}
                              className="bg-main text-center text-2xl w-full lg:max-w-[30%] mx-auto my-20 py-6 border border-white">
                              Buy Now
                         </Button>
                    </div>
               )}
          </div>
     );
};

export default DogtagPreview;
