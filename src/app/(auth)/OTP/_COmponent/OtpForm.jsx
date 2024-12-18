"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "antd";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const OtpVerificationModal = ({
  isOpen,
  otpToken,
  email,
  onSuccess,
  setIsOpen,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await verifyOtp({
        email,
        otp: data.otp,
        token: otpToken,
      });

      if (res.success) {
        toast.success(res.message || "OTP verified successfully!");

        redirect("/");
        // onSuccess();
      } else {
        toast.error(res.message || "OTP verification failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-bold text-white">
          Verify OTP
        </h1>
        <Input
          {...register("otp", { required: true })}
          placeholder="Enter OTP"
        />
        <Button type="submit">Verify</Button>
      </form>
    </Modal>
  );
};

export default OtpVerificationModal;
