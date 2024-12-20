"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import EyeIconInverse from "@/components/EyeConinverse/EyeConinverse";

const UpdatePassWordForm = ({ isOpen, onClose,  }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(""); // State to store the token
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Safely access `localStorage` on the client
  useEffect(() => {
    const storedToken = localStorage.getItem("reset-token");
    setToken(storedToken || "");
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    if (data.NewPassword !== data.ConfirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset-password`,
        {
          newPassword: data.NewPassword,
          confirmPassword: data.ConfirmPassword,
        },
        {
          headers: {
            token: token, // Use the token state
          },
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully!");

        onClose(); // Close the modal
      } else {
        setErrorMessage(response.data.message || "Failed to update password.");
      }

      localStorage.removeItem("reset-token");
      reset();
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal centered open={isOpen} onCancel={onClose} footer={null}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-10"
      >
        <h1 className="text-center text-2xl font-bold text-white">
          Update Password
        </h1>

        <div className=" relative">
          <label htmlFor="NewPassword" className="block text-white">
            New Password
          </label>
          <Input
            id="NewPassword"
            {...register("NewPassword", {
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
            })}
            className="border p-2 w-full"
            type={showPassword ? "text" : "password"}
          />
          <EyeIconInverse
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {errors.NewPassword && (
            <p className="text-red-500">{errors.NewPassword.message}</p>
          )}
        </div>

        <div className=" relative">
          <label htmlFor="ConfirmPassword" className="block text-white">
            Confirm Password
          </label>
          <Input
            id="ConfirmPassword"
            {...register("ConfirmPassword", {
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
            })}
            className="border p-2 w-full"
            type={showPassword ? "text" : "password"}
          />
          <EyeIconInverse
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {errors.ConfirmPassword && (
            <p className="text-red-500">{errors.ConfirmPassword.message}</p>
          )}
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <Button
          type="submit"
          className="relative group px-6 py-3 font-medium text-black bg-black !border !border-white overflow-hidden mt-5 "
          disabled={loading}
        >
          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transform origin-top-left group-hover:origin-top-left transition-transform duration-1000 ease-in-out"></span>
          <span className="z-50 relative text-white group-hover:text-black transition-colors duration-1000 ease-in-out">
            {loading ? "Updating..." : "Update Password"}
          </span>
        </Button>
      </form>
    </Modal>
  );
};

export default UpdatePassWordForm;
