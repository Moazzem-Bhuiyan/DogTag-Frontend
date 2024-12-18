"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";

const ForgetPasswordModal = ({ isOpen, onClose, onpenVerifyCodeclick }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/forgot-password`,
        { email: data.email }
      );

      if (response.data.success) {
        localStorage.setItem("forgot-token", response.data.data.token);
        onpenVerifyCodeclick();
        reset();
      } else {
        console.error("Error sending OTP:", response.data.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={() => {
        onClose();
        reset();
      }}
      footer={null}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-10"
      >
        <h1 className="text-center text-2xl font-bold text-white">
          Forgot Password
        </h1>
        <div>
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <Input
            id="email"
            {...register("email", {
              required: "Email is required",
            })}
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="relative group px-6 py-3 font-medium text-black bg-black border border-white overflow-hidden mt-5"
          disabled={loading}
        >
          <span className="absolute inset-0 border-2 border-white  bg-white scale-x-0 group-hover:scale-x-100 transform origin-top-left group-hover:origin-top-left transition-transform duration-1000 ease-in-out"></span>
          <span className="z-50 relative text-white group-hover:text-black transition-colors duration-1000 ease-in-out ">
            {loading ? "Sending..." : "Send Code"}
          </span>
        </Button>
      </form>
    </Modal>
  );
};

export default ForgetPasswordModal;
