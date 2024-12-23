"use client";

import React, {useState} from "react";
import {Checkbox, Modal, message} from "antd";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation"; // Use this for navigation in Next.js App Router
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {loginUser} from "@/Services/actions/loginUser";
import {toast} from "sonner";
import {useLogin} from "@/components/context/LoginContext";
import EyeIconInverse from "@/components/EyeConinverse/EyeConinverse";
import {ErrorModal} from "../../../../../utils/CustomModal";

const LoginPage = ({isOpen, onClose, onSignupClick, onForgetPasswordClick}) => {
     const {
          register,
          handleSubmit,
          reset,
          formState: {errors},
     } = useForm();
     const {login} = useLogin(); // Get login function from context
     const router = useRouter();
     const [loading, setLoading] = React.useState(false);

     const [showPassword, setShowPassword] = useState(false);

     const onSubmit = async (values) => {
          setLoading(true);

          try {
               const res = await loginUser(values);

               if (res?.data) {
                    const {accessToken, refreshToken, user} = res.data;

                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);

                    // Call login from context to update state
                    login(accessToken, refreshToken);

                    toast.success(`Welcome back, ${user?.name}!`);

                    // Redirect to the homepage
                    router.back();
                    onClose();
               }

               if (res?.error?.message) {
                    ErrorModal(res?.message);
               }
          } catch (error) {
               ErrorModal(error?.message);
          } finally {
               setLoading(false);
               reset();
          }
     };

     return (
          <Modal centered open={isOpen} onCancel={onClose} footer={null}>
               <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 py-10">
                    <h1 className="text-center text-2xl font-bold text-white">
                         Welcome Back
                    </h1>

                    <div>
                         <label htmlFor="email" className="block text-white">
                              Email
                         </label>
                         <Input
                              id="email"
                              type="email"
                              {...register("email", {
                                   required: "Email is required",

                                   pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Please enter a valid email address",
                                   },
                              })}
                              className="border p-2 w-full"
                              placeholder="Enter your email"
                         />
                         {errors.email && (
                              <p className="text-red-500 text-sm">
                                   {errors.email.message}
                              </p>
                         )}
                    </div>

                    <div className=" relative ">
                         <label htmlFor="password" className="block text-white">
                              Password
                         </label>
                         <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              {...register("password", {
                                   required: "Password is required",
                                   minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                   },
                                   // pattern: {
                                   //      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                   //      message: "Password must have at least one uppercase, one lowercase letter, one number, one special character and 8 characters long",
                                   // },
                              })}
                              className="border p-2 w-full"
                              placeholder="Enter your password"
                         />
                         <EyeIconInverse
                              showPassword={showPassword}
                              setShowPassword={setShowPassword}
                         />

                         {errors.password && (
                              <p className="text-red-500 text-sm">
                                   {errors.password.message}
                              </p>
                         )}
                    </div>

                    <div className="flex justify-between items-center mt-5">
                         <div className="flex items-center space-x-2">
                              <Checkbox />
                              <label
                                   htmlFor="rememberMe"
                                   className="text-sm font-medium leading-none text-white">
                                   Remember me
                              </label>
                         </div>
                         <Button
                              onClick={onForgetPasswordClick}
                              className="text-white"
                              variant="link"
                              type="button">
                              Forgot Password?
                         </Button>
                    </div>

                    <Button type="submit" className="mt-5" disabled={loading}>
                         {loading ? "Logging in..." : "Login"}
                    </Button>
               </form>

               <Button
                    onClick={onSignupClick}
                    className="text-center w-full mt-4 text-white"
                    variant="link">
                    Don&apos;t have an account?{" "}
                    <span className="text-red-500">Register</span>
               </Button>
          </Modal>
     );
};

export default LoginPage;
