"use client";

import {
  ProductContext,
  useProducts,
} from "@/components/context/ProductContext";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "antd";
import axios from "axios";
import { Plus, X } from "lucide-react";

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const BillingDetails = () => {
  
  const { cardProducts } = useContext(ProductContext);
  const router = useRouter();

  // Product details extract

  const productDetails = cardProducts;

  const [selectTab, setSelectedTab] = useState("itemsTag");

  const [tagImage, setTagImage] = useState(null);
  const handleTagImageChange = (event) => {
    setTagImage(URL.createObjectURL(event.target.files[0]));
  };

  const defaultorderType = "regular";
  const orderType = selectTab;
  const [token, setToken] = useState(null); // State for storing token

  // Get token only when running on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      if (!storedToken) {
        router.push("/Login");
      } else {
        setToken(storedToken); // Set token in state
      }
    }
  }, [router]);

  useEffect(() => {
    if (!cardProducts) {
      redirect("/");
    }
  }, [cardProducts]);

  const {
    register: registerItemTags,
    handleSubmit: handleSubmitItemTags,
    formState: { errors: errorsItemTags },
    control: controlItemTags,
  } = useForm();

  const {
    register: registerMedicalTags,
    handleSubmit: handleSubmitMedicalTags,
    formState: { errors: errorsMedicalTags },
    control: controlMedicalTags,
    reset,
  } = useForm();

  // const token = localStorage.getItem("accessToken");

  // items tags submit button and backend logic here :

  const onSubmitItemTags = async (data) => {
    // validation and backend logic here :
    const finalData = { ...data, orderType };

    const formData = new FormData();

    const formDataWithProductId = {
      billingDetails: finalData,
      orderType: defaultorderType,
      product: productDetails?.id,
      quantity: productDetails?.quantity,
      totalAmount: total,
    };

    formData.append("data", JSON.stringify(formDataWithProductId));

    formData.append("image", data?.image);
    
    console.log('formdata',formData)

    const orderPaymentLoading = toast.loading("Order creating....");

    try {
      // Send the order creation request
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderId = await res.data?.data;

      // Payment API request
      try {
        const paymentRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments/checkout`,
          {
            order: orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const paymentLink = paymentRes?.data?.data;

        if (!paymentLink) {
          return toast.error("Payment failed", {
            id: orderPaymentLoading,
          });
        }

        toast.success("Order created successfully", {
          id: orderPaymentLoading,
        });

        // Redirect to payment page
        if (window !== undefined) {
          window.location.href = paymentLink;
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, try refreshing it
          try {
            let refreshToken = null;
            if (typeof window !== "undefined") {
              refreshToken = localStorage.getItem("refreshToken");
            }

            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const refreshRes = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
              {
                refreshToken,
              }
            );

            const newAccessToken = refreshRes.data?.accessToken;

            if (newAccessToken) {
              // Update token on the client side
              if (typeof window !== "undefined") {
                localStorage.setItem("accessToken", newAccessToken);
              }

              // Retry the original request
              const retryRes = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments/checkout`,
                {
                  order: orderId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }
              );

              const retryPaymentLink = retryRes?.data?.data;

              if (!retryPaymentLink) {
                return toast.error("Payment failed", {
                  id: orderPaymentLoading,
                });
              }

              toast.success("Order created successfully", {
                id: orderPaymentLoading,
              });

              // Redirect to payment page
              if (typeof window !== "undefined") {
                window.location.href = retryPaymentLink;
              }
            } else {
              throw new Error("Failed to refresh token");
            }
          } catch (refreshError) {
            console.error("Refresh token error:", refreshError);
            toast.error("Session expired, please log in again.", {
              id: orderPaymentLoading,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error, {
        id: orderPaymentLoading,
      });
    }
  };

  // medicaltags submit button and backend logic

  const onSubmitMedicalTags = async (data) => {
    // validation and backend logic here :
    const finalData = { ...data, orderType };

    const formDataWithProductId = {
      billingDetails: finalData,
      orderType: defaultorderType,
      product: productDetails?.id,
      quantity: productDetails?.quantity,
      totalAmount: total,
    };

    const orderPaymentLoading = toast.loading("Order creating....");

    const formData = new FormData();

    formData.append("data", JSON.stringify(formDataWithProductId));

    formData.append("image", data?.image);

    try {
      // Send the order creation request
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderId = await res.data?.data;

      // Payment API request
      try {
        const paymentRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments/checkout`,
          {
            order: orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const paymentLink = paymentRes?.data?.data;

        if (!paymentLink) {
          return toast.error("Payment failed", {
            id: orderPaymentLoading,
          });
        }

        toast.success("Order created successfully", {
          id: orderPaymentLoading,
        });

        // Redirect to payment page
        if (window !== undefined) {
          window.location.href = paymentLink;
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, try refreshing it
          try {
            // Safely retrieve the refresh token from localStorage
            let refreshToken = null;
            if (typeof window !== "undefined") {
              refreshToken = localStorage.getItem("refreshToken");
            }

            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            // Attempt to refresh the token
            const refreshRes = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const newAccessToken = refreshRes.data?.accessToken;

            if (newAccessToken) {
              // Safely update the new access token in localStorage
              if (typeof window !== "undefined") {
                localStorage.setItem("accessToken", newAccessToken);
              }

              // Retry the original payment request
              const retryRes = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments/checkout`,
                { order: orderId },
                {
                  headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                }
              );

              const retryPaymentLink = retryRes?.data?.data;

              if (!retryPaymentLink) {
                return toast.error("Payment failed", {
                  id: orderPaymentLoading,
                });
              }

              toast.success("Order created successfully", {
                id: orderPaymentLoading,
              });

              // Redirect to the payment link
              if (typeof window !== "undefined") {
                window.location.href = retryPaymentLink;
              }
            } else {
              throw new Error("Failed to refresh token");
            }
          } catch (refreshError) {
            console.error("Refresh token error:", refreshError);
            toast.error("Session expired, please log in again.", {
              id: orderPaymentLoading,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        id: orderPaymentLoading,
      });
    } finally {
      reset(); // reset the form after the request is completed
    }
  };

  if (!productDetails) {
    return <Skeleton />;
  }

  const subtotal = productDetails?.price * (productDetails?.quantity || 1);

  const total = subtotal;

  const domain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

  return (
    <div className="p-8 grid grid-cols-1 xl:grid-cols-2  gap-16 w-full md:max-w-[60%] mx-auto font-serif">
      
      {/* Right Section: Billing Form */}

      <Tabs
        defaultValue="itemsTag"
        value={selectTab}
        onValueChange={setSelectedTab}
        className="w-[400px] order-2 md:order-1"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="itemsTag">Item Tags</TabsTrigger>
          <TabsTrigger value="medicalTag">Medical Tags</TabsTrigger>
        </TabsList>

        <TabsContent value="itemsTag">
          <form
            onSubmit={handleSubmitItemTags(onSubmitItemTags)}
            className="space-y-4"
          >
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
              <label className="block mb-1">Tag Name (Optional)</label>
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
              <label className="block mb-1">Description (Optional)</label>
              <Textarea
                {...registerItemTags("description")}
                className="w-full p-2 border rounded bg-white text-black"
                placeholder="Tell us more about your tag design"
              />
              {errorsItemTags?.billingDetails?.description && (
                <span className="text-red-500 text-sm">
                  {errorsItemTags.description.message}
                </span>
              )}
            </div>

            {/* Tag Image */}
            <div>
              <Label
                htmlFor="image"
                className="mb-2 block font-semibold text-primary-black"
              >
                Tag Image
              </Label>

              <Controller
                name="image"
                control={controlItemTags}
                render={({ field }) => (
                  <div className="flex min-h-[100px] items-center justify-center rounded border border-dashed border-primary-black/50 py-4">
                    <input
                      type="file"
                      id="tagImageInput"
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                        handleTagImageChange(e);
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
                            setTagImage(null);
                            document.getElementById("tagImageInput").value =
                              null;
                          }}
                        >
                          <X color="#fff" size={16} />
                        </button>
                      </div>
                    )}
                    {!tagImage && (
                      <div
                        className="flex flex-col items-center gap-x-4"
                        role="button"
                        onClick={() =>
                          document.getElementById("tagImageInput").click()
                        }
                      >
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
              <label className="block mb-1">Phone Number</label>
              <Input
                {...registerItemTags("phoneNumber", {
                  required: "Phone number is required",
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
                  {errorsItemTags.phoneNumber.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Pay Now
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="medicalTag">
          <form
            onSubmit={handleSubmitMedicalTags(onSubmitMedicalTags)}
            className="space-y-4"
          >
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
              <label className="block mb-1">Tag Name (Optional)</label>
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
              <label className="block mb-1">Description (Optional)</label>
              <Textarea
                {...registerMedicalTags("description")}
                className="w-full p-2 border rounded bg-white text-black"
                placeholder="Tell us more about your tag design"
              />
              {errorsItemTags?.billingDetails?.description && (
                <span className="text-red-500 text-sm">
                  {errorsItemTags.description.message}
                </span>
              )}
            </div>

            {/* Tag Image */}
            <div>
              <Label
                htmlFor="image"
                className="mb-2 block font-semibold text-primary-black"
              >
                Tag Image
              </Label>

              <Controller
                name="image"
                control={controlMedicalTags}
                render={({ field }) => (
                  <div className="flex min-h-[100px] items-center justify-center rounded border border-dashed border-primary-black/50 py-4">
                    <input
                      type="file"
                      id="tagImageInput"
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                        handleTagImageChange(e);
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
                            setTagImage(null);
                            document.getElementById("tagImageInput").value =
                              null;
                          }}
                        >
                          <X color="#fff" size={16} />
                        </button>
                      </div>
                    )}
                    {!tagImage && (
                      <div
                        className="flex flex-col items-center gap-x-4"
                        role="button"
                        onClick={() =>
                          document.getElementById("tagImageInput").click()
                        }
                      >
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
              <label className="block mb-1">Date of Birth</label>
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
              <label className="block mb-1">Emargency Contact</label>
              <Input
                {...registerMedicalTags("emergencyContact", {
                  required: " Number is required",
                })}
                className="w-full p-2 border rounded"
                placeholder="Emargency Contact"
              />
              {errorsMedicalTags.emergencyContact && (
                <span className="text-red-500 text-sm">
                  {errorsMedicalTags.emergencyContact.message}
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
                  {errorsMedicalTags.phoneNumber.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1">Blood Type</label>
              <Input
                {...registerMedicalTags("bloodType", {
                  required: " Blood type is required",
                })}
                className="w-full p-2 border rounded"
                placeholder="Blood Type"
              />
              {errorsMedicalTags.bloodType && (
                <span className="text-red-500 text-sm">
                  {errorsMedicalTags.bloodType.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1">Health Conditions</label>
              <Input
                {...registerMedicalTags("healthConditions", {
                  required: " Health condition is required",
                })}
                className="w-full p-2 border rounded"
                placeholder="Healthcondition"
              />
              {errorsMedicalTags.healthConditions && (
                <span className="text-red-500 text-sm">
                  {errorsMedicalTags.healthConditions.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1">Allergies</label>
              <Input
                {...registerMedicalTags("allergies", {
                  required: " Allergies condition is required",
                })}
                className="w-full p-2 border rounded"
                placeholder="Allergies"
              />
              {errorsMedicalTags.allergies && (
                <span className="text-red-500 text-sm">
                  {errorsMedicalTags.allergies.message}
                </span>
              )}
            </div>
            <div>
              <label className="block mb-1">Main Doctor</label>
              <Input
                {...registerMedicalTags("mainDoctor", {
                  required: " Doctor is required",
                })}
                className="w-full p-2 border rounded"
                placeholder="Main Doctor"
              />
              {errorsMedicalTags.mainDoctor && (
                <span className="text-red-500 text-sm">
                  {errorsMedicalTags.mainDoctor.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Pay Now
            </Button>
          </form>
        </TabsContent>
      </Tabs>

      {/* Left Section: Product Details */}
      <div className="order-1 md:order-2  ">
        <div className="flex gap-5">
          {productDetails?.images?.length > 0 && (
            <Image
              src={`${domain}${productDetails?.images[0]?.url}`}
              alt={`Image of ${productDetails?.name}`}
              className="w-40 h-auto object-cover rounded-md"
              width={1200}
              height={1200}
            />
          )}
          <p className="mt-4">
            <strong>Product:</strong> {productDetails?.name}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <h1>Subtotal :</h1>
          <h2>${subtotal}</h2>
        </div>
        <hr />

        <div className="flex justify-between items-center">
          <h1>Shipping :</h1>
          <h2>Free</h2>
        </div>
        <hr />

        <div className="flex justify-between items-center">
          <h1>Total :</h1>
          <p>${total}</p>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
