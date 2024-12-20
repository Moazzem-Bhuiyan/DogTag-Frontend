"use client";
import {useDogtagContext} from "@/components/context/DogtagContext";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {Plus, X} from "lucide-react";

import Image from "next/image";
import { useState } from "react";
import {Controller, useForm} from "react-hook-form";

const CustomorderForm = () => {
     const {previews} = useDogtagContext();
     const [selectTab, setSelectedTab] = useState("itemsTag");

     const [tagImage, setTagImage] = useState(null);
     const handleTagImageChange = (event) => {
          setTagImage(URL.createObjectURL(event.target.files[0]));
     };

     const {
          register: registerItemTags,
          handleSubmit: handleSubmitItemTags,
          formState: {errors: errorsItemTags},
          control: controlItemTags,
     } = useForm();

     const {
          register: registerMedicalTags,
          handleSubmit: handleSubmitMedicalTags,
          formState: {errors: errorsMedicalTags},
          control: controlMedicalTags,
          reset,
     } = useForm();

     const onSubmitItemTags = async (data) => {
          console.log(data);
     };
     const onSubmitMedicalTags = async (data) => {
          console.log(data);
     };

     return (
          <div className="p-8 grid grid-cols-1 xl:grid-cols-2  gap-16 w-full md:max-w-[60%] mx-auto font-serif">
               


              <div>
              <Tabs
                    defaultValue="itemsTag"
                    value={selectTab}
                    onValueChange={setSelectedTab}
                    className="w-[400px] order-2 md:order-1">
                    <TabsList className="grid w-full grid-cols-2">
                         <TabsTrigger value="itemsTag">Item Tags</TabsTrigger>
                         <TabsTrigger value="medicalTag">
                              Medical Tags
                         </TabsTrigger>
                    </TabsList>

                    <TabsContent value="itemsTag">
                         <form
                              onSubmit={handleSubmitItemTags(onSubmitItemTags)}
                              className="space-y-4">
                              <div>
                                   <label className="block mb-1">Name</label>
                                   <Input
                                        {...registerItemTags("name", {
                                             required: "Name is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Name"
                                   />
                                   {errorsItemTags?.billingDetails?.name && (
                                        <span className="text-red-500 text-sm">
                                             {errorsItemTags.name.message}
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Tag Name (Optional)
                                   </label>
                                   <Input
                                        {...registerItemTags("tagName")}
                                        className="w-full p-2 border rounded"
                                        placeholder="Tag Name"
                                   />
                                   {errorsItemTags?.billingDetails?.tagName && (
                                        <span className="text-red-500 text-sm">
                                             {errorsItemTags.tagName.message}
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Description (Optional)
                                   </label>
                                   <Textarea
                                        {...registerItemTags("description")}
                                        className="w-full p-2 border rounded bg-white text-black"
                                        placeholder="Tell us more about your tag design"
                                   />
                                   {errorsItemTags?.billingDetails
                                        ?.description && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsItemTags.description
                                                       .message
                                             }
                                        </span>
                                   )}
                              </div>

                              {/* Tag Image */}
                              <div>
                                   <Label
                                        htmlFor="image"
                                        className="mb-2 block font-semibold text-primary-black">
                                        Tag Image
                                   </Label>

                                   <Controller
                                        name="image"
                                        control={controlItemTags}
                                        render={({field}) => (
                                             <div className="flex min-h-[100px] items-center justify-center rounded border border-dashed border-primary-black/50 py-4">
                                                  <input
                                                       type="file"
                                                       id="tagImageInput"
                                                       onChange={(e) => {
                                                            field.onChange(
                                                                 e.target
                                                                      .files[0],
                                                            );
                                                            handleTagImageChange(
                                                                 e,
                                                            );
                                                       }}
                                                       className="hidden"
                                                  />
                                                  {tagImage && (
                                                       <div className="relative">
                                                            <Image
                                                                 src={tagImage}
                                                                 alt="Front of ID"
                                                                 width={200}
                                                                 height={200}
                                                            />
                                                            <button
                                                                 className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                                                                 onClick={() => {
                                                                      setTagImage(
                                                                           null,
                                                                      );
                                                                      document.getElementById(
                                                                           "tagImageInput",
                                                                      ).value =
                                                                           null;
                                                                 }}>
                                                                 <X
                                                                      color="#fff"
                                                                      size={16}
                                                                 />
                                                            </button>
                                                       </div>
                                                  )}
                                                  {!tagImage && (
                                                       <div
                                                            className="flex flex-col items-center gap-x-4"
                                                            role="button"
                                                            onClick={() =>
                                                                 document
                                                                      .getElementById(
                                                                           "tagImageInput",
                                                                      )
                                                                      .click()
                                                            }>
                                                            <Plus /> Upload
                                                       </div>
                                                  )}
                                             </div>
                                        )}
                                   />

                                   {errorsItemTags?.tagImage && (
                                        <p className="mt-1 text-danger">
                                             {errorsItemTags.tagImage.message}
                                        </p>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">Address</label>
                                   <Input
                                        {...registerItemTags("address", {
                                             required: "Address is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Address"
                                   />
                                   {errorsItemTags?.address && (
                                        <span className="text-red-500 text-sm">
                                             {errorsItemTags.address.message}
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">Email</label>
                                   <Input
                                        {...registerItemTags("email", {
                                             required: "Email is required",
                                             pattern: {
                                                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                  message: "Invalid email format",
                                             },
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Email"
                                   />
                                   {errorsItemTags?.email && (
                                        <span className="text-red-500 text-sm">
                                             {errorsItemTags.email.message}
                                        </span>
                                   )}
                              </div>
                              <div>
                                   <label className="block mb-1">
                                        Phone Number
                                   </label>
                                   <Input
                                        {...registerItemTags("phoneNumber", {
                                             required:
                                                  "Phone number is required",
                                             pattern: {
                                                  value: /^[0-9]{10,15}$/,
                                                  message: "Invalid phone number",
                                             },
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Phone Number"
                                   />
                                   {errorsItemTags?.phoneNumber && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsItemTags.phoneNumber
                                                       .message
                                             }
                                        </span>
                                   )}
                              </div>
                              <Button
                                   type="submit"
                                   className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                                   Pay Now
                              </Button>
                         </form>
                    </TabsContent>

                    <TabsContent value="medicalTag">
                         <form
                              onSubmit={handleSubmitMedicalTags(
                                   onSubmitMedicalTags,
                              )}
                              className="space-y-4">
                              <div>
                                   <label className="block mb-1">Name</label>
                                   <Input
                                        {...registerMedicalTags("name", {
                                             required: " Name is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder=" Name"
                                   />
                                   {errorsMedicalTags.name && (
                                        <span className="text-red-500 text-sm">
                                             {errorsMedicalTags.name.message}
                                        </span>
                                   )}
                              </div>
                              <div>
                                   <label className="block mb-1">Email</label>
                                   <Input
                                        {...registerMedicalTags("email", {
                                             required: " email is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder=" Email"
                                   />
                                   {errorsMedicalTags.email && (
                                        <span className="text-red-500 text-sm">
                                             {errorsMedicalTags.email.message}
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Tag Name (Optional)
                                   </label>
                                   <Input
                                        {...registerMedicalTags("tagName")}
                                        className="w-full p-2 border rounded"
                                        placeholder="Tag Name"
                                   />
                                   {errorsItemTags?.billingDetails?.tagName && (
                                        <span className="text-red-500 text-sm">
                                             {errorsItemTags.tagName.message}
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Description (Optional)
                                   </label>
                                   <Textarea
                                        {...registerMedicalTags("description")}
                                        className="w-full p-2 border rounded bg-white text-black"
                                        placeholder="Tell us more about your tag design"
                                   />
                                   {errorsItemTags?.billingDetails
                                        ?.description && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsItemTags.description
                                                       .message
                                             }
                                        </span>
                                   )}
                              </div>

                              {/* Tag Image */}
                              <div>
                                   <Label
                                        htmlFor="image"
                                        className="mb-2 block font-semibold text-primary-black">
                                        Tag Image
                                   </Label>

                                   <Controller
                                        name="image"
                                        control={controlMedicalTags}
                                        render={({field}) => (
                                             <div className="flex min-h-[100px] items-center justify-center rounded border border-dashed border-primary-black/50 py-4">
                                                  <input
                                                       type="file"
                                                       id="tagImageInput"
                                                       onChange={(e) => {
                                                            field.onChange(
                                                                 e.target
                                                                      .files[0],
                                                            );
                                                            handleTagImageChange(
                                                                 e,
                                                            );
                                                       }}
                                                       className="hidden"
                                                  />
                                                  {tagImage && (
                                                       <div className="relative">
                                                            <Image
                                                                 src={tagImage}
                                                                 alt="Front of ID"
                                                                 width={200}
                                                                 height={200}
                                                            />
                                                            <button
                                                                 className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary"
                                                                 onClick={() => {
                                                                      setTagImage(
                                                                           null,
                                                                      );
                                                                      document.getElementById(
                                                                           "tagImageInput",
                                                                      ).value =
                                                                           null;
                                                                 }}>
                                                                 <X
                                                                      color="#fff"
                                                                      size={16}
                                                                 />
                                                            </button>
                                                       </div>
                                                  )}
                                                  {!tagImage && (
                                                       <div
                                                            className="flex flex-col items-center gap-x-4"
                                                            role="button"
                                                            onClick={() =>
                                                                 document
                                                                      .getElementById(
                                                                           "tagImageInput",
                                                                      )
                                                                      .click()
                                                            }>
                                                            <Plus /> Upload
                                                       </div>
                                                  )}
                                             </div>
                                        )}
                                   />

                                   {errorsItemTags?.tagImage && (
                                        <p className="mt-1 text-danger">
                                             {errorsItemTags.tagImage.message}
                                        </p>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">Address</label>
                                   <Input
                                        {...registerMedicalTags("address", {
                                             required: " Address is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Address"
                                   />
                                   {errorsMedicalTags.address && (
                                        <span className="text-red-500 text-sm">
                                             {errorsMedicalTags.address.message}
                                        </span>
                                   )}
                              </div>
                              <div>
                                   <label className="block mb-1">
                                        Date of Birth
                                   </label>
                                   <Input
                                        {...registerMedicalTags("dob", {
                                             required: " Address is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Date of Birth"
                                        type="date"
                                   />
                                   {errorsMedicalTags.dob && (
                                        <span className="text-red-500 text-sm">
                                             {errorsMedicalTags.dob.message}
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Emargency Contact
                                   </label>
                                   <Input
                                        {...registerMedicalTags(
                                             "emergencyContact",
                                             {
                                                  required:
                                                       " Number is required",
                                             },
                                        )}
                                        className="w-full p-2 border rounded"
                                        placeholder="Emargency Contact"
                                   />
                                   {errorsMedicalTags.emergencyContact && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsMedicalTags
                                                       .emergencyContact.message
                                             }
                                        </span>
                                   )}
                              </div>
                              <div>
                                   <label className="block mb-1">Contact</label>
                                   <Input
                                        {...registerMedicalTags("phoneNumber", {
                                             required: " Number is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Phone Number"
                                   />
                                   {errorsMedicalTags.phoneNumber && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsMedicalTags.phoneNumber
                                                       .message
                                             }
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Blood Type
                                   </label>
                                   <Input
                                        {...registerMedicalTags("bloodType", {
                                             required:
                                                  " Blood type is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Blood Type"
                                   />
                                   {errorsMedicalTags.bloodType && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsMedicalTags.bloodType
                                                       .message
                                             }
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Health Conditions
                                   </label>
                                   <Input
                                        {...registerMedicalTags(
                                             "healthConditions",
                                             {
                                                  required:
                                                       " Health condition is required",
                                             },
                                        )}
                                        className="w-full p-2 border rounded"
                                        placeholder="Healthcondition"
                                   />
                                   {errorsMedicalTags.healthConditions && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsMedicalTags
                                                       .healthConditions.message
                                             }
                                        </span>
                                   )}
                              </div>

                              <div>
                                   <label className="block mb-1">
                                        Allergies
                                   </label>
                                   <Input
                                        {...registerMedicalTags("allergies", {
                                             required:
                                                  " Allergies condition is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Allergies"
                                   />
                                   {errorsMedicalTags.allergies && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsMedicalTags.allergies
                                                       .message
                                             }
                                        </span>
                                   )}
                              </div>
                              <div>
                                   <label className="block mb-1">
                                        Main Doctor
                                   </label>
                                   <Input
                                        {...registerMedicalTags("mainDoctor", {
                                             required: " Doctor is required",
                                        })}
                                        className="w-full p-2 border rounded"
                                        placeholder="Main Doctor"
                                   />
                                   {errorsMedicalTags.mainDoctor && (
                                        <span className="text-red-500 text-sm">
                                             {
                                                  errorsMedicalTags.mainDoctor
                                                       .message
                                             }
                                        </span>
                                   )}
                              </div>

                              <Button
                                   type="submit"
                                   className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                                   Pay Now
                              </Button>
                         </form>
                    </TabsContent>
               </Tabs>

              </div>


               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 ">
                    {previews.map((image, index) => (
                         <div
                              key={index}
                              className="border h-[150px] w-full flex justify-center">
                              <Image
                                   className=" w-full h-[150px] "
                                   width={1200}
                                   height={1200}
                                   src={image}
                                   alt={`Dog Tag ${index + 1}`}
                              />
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default CustomorderForm;
