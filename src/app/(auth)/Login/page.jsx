"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";

import UpdatePassWordForm from "../UpdatePassword/Component/UpdatePassWordForm";
import LoginPage from "./component/LoginForm";
import RegisterModal from "../Register/Component/RegisterForm";
import ForgetPasswordModal from "../ForgetPassword/page";
import VerifyModal from "../VerifyCode/page";


const Page = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
  const [isverifycodedOpen, setIsverifycodeOpen] = useState(false);
  const [isupdatepasswordOpen, setIsupdatepasswordOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsForgetPasswordOpen(false);
  };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsForgetPasswordOpen(false);
  };

  const handleCloseAll = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsForgetPasswordOpen(false);
    setIsverifycodeOpen(false);
    setIsupdatepasswordOpen(false);
    router.push("/"); // Navigate back to the previous location
  };

  const handleOpenForgetPassword = () => {
    setIsForgetPasswordOpen(true);
    setIsLoginOpen(false);
  };

  const handleOpenVerifyCode = () => {
    setIsverifycodeOpen(true);
    setIsForgetPasswordOpen(false);
  };

  const handleUpdatePassword = () => {
    setIsupdatepasswordOpen(true);
    setIsverifycodeOpen(false);
  };
  return (
    <div>
      <>
        {/* Login Modal */}
        <LoginPage
          isOpen={isLoginOpen}
          onClose={handleCloseAll}
          onSignupClick={handleOpenRegister}
          onForgetPasswordClick={handleOpenForgetPassword}
        />

        {/* Register Modal */}
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={handleCloseAll}
          onLoginClick={handleOpenLogin}
        />

        {/* Forget Password Modal */}
        <ForgetPasswordModal
          isOpen={isForgetPasswordOpen}
          onClose={handleCloseAll}
          onpenVerifyCodeclick={handleOpenVerifyCode}
        />

        <VerifyModal
          isOpen={isverifycodedOpen}
          onClose={handleCloseAll}
          OnupdatePassClick={handleUpdatePassword}
        />
        <UpdatePassWordForm
          isOpen={isupdatepasswordOpen}
          onClose={handleCloseAll}
        />
      </>
    </div>
  );
};

export default Page;
