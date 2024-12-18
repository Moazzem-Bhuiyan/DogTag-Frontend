"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import EyeIconInverse from "@/components/EyeConinverse/EyeConinverse";

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Check if new password and confirm password match
    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("New Password and Confirm Password do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/change-password`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.success) {
        setSuccessMessage("Password changed successfully!");
        toast.success("Password changed successfully");

        router.push("/"); // Redirect to home page if password change is successful
      } else {
        setErrorMessage(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again.."
      );
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="w-full lg:max-w-[80%] mx-auto px-10 my-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-10"
      >
        <h1 className="text-center text-2xl font-bold">Change Password</h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className=" relative">
          <label htmlFor="CurrentPassword" className="block text-white">
            Current Password
          </label>
          <Input
            id="current-password"
            type={showPassword ? "password" : "text"}
            {...register("oldPassword", {
              required: "Current Password is required",
            })}
            className="border p-2 w-full"
          />
          <EyeIconInverse
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {errors.oldPassword && (
            <p className="text-red-500">{errors.oldPassword.message}</p>
          )}
        </div>

        <div className=" relative">
          <label htmlFor="NewPassword" className="block text-white">
            New Password
          </label>
          <Input
            id="New-password"
            type={showPassword ? "password" : "text"}
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
            })}
            className="border p-2 w-full"
          />
          <EyeIconInverse
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {errors.newPassword && (
            <p className="text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div className=" relative">
          <label htmlFor="ConfirmPassword" className="block text-white">
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type={showPassword ? "password" : "text"}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            className="border p-2 w-full"
          />
          <EyeIconInverse
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="mt-5" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
