"use client";

import React, {useState} from "react";
import Image from "next/image";
import hero from "/public/hero.png";
import Navber from "./Navber";
import LoginPage from "@/app/(auth)/Login/component/LoginForm";
import RegisterModal from "@/app/(auth)/Register/Component/RegisterForm";
import ForgetPasswordModal from "@/app/(auth)/ForgetPassword/page";
import VerifyModal from "@/app/(auth)/VerifyCode/page";
// import UpdatePassWordForm from "@/app/(auth)/UpdatePassword/Component/UpdatePassWordForm";
import Link from "next/link";
import UpdatePassWordForm from "@/app/(auth)/UpdatePassword/Component/UpdatePassWordForm";

const Hero = () => {
     const [isLoginOpen, setIsLoginOpen] = useState(false);
     const [isRegisterOpen, setIsRegisterOpen] = useState(false);
     const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);
     const [isverifycodedOpen, setIsverifycodeOpen] = useState(false);
     const [isupdatepasswordOpen, setIsupdatepasswordOpen] = useState(false);

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
     };

     const handleOpenForgetPassword = () => {
          setIsForgetPasswordOpen(true);
          setIsLoginOpen(false);
     };

     const handleOpenVerifyCode = () => {
          setIsverifycodeOpen(true);
          setIsForgetPasswordOpen(false);
          setIsRegisterOpen(false);
     };

     const handleUpdatePassword = () => {
          setIsupdatepasswordOpen(true);
          setIsverifycodeOpen(false);
     };
     return (
          <div className="bg-main h-[600px]  flex justify-center items-center  ">
               <div className="relative w-full">
                    <div className="flex justify-center items-center">
                         <Link href="/">
                              <Image src={hero} alt="hero img" />
                         </Link>
                    </div>

                    <div className="mt-32">
                         <Navber onLoginClick={handleOpenLogin} />
                    </div>

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
                              onLoginClick={isLoginOpen}
                         />
                    </>
               </div>
          </div>
     );
};

export default Hero;
