"use client";
import Link from "next/link";

import {useEffect, useState} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import {useLogin} from "../context/LoginContext";

const Navber = ({onLoginClick}) => {
     const {isLoggedIn, setIsLoggedIn} = useLogin();
     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

     useEffect(() => {
          const token = localStorage.getItem("accessToken");
          if (token) {
               setIsLoggedIn(true);
          }
     }, [setIsLoggedIn]);

     const Navlink = [
          {title: "Home", link: "/"},
          {title: "Gifts", link: "#"},
          {title: "Services", link: "#"},
          {title: "Shop", link: "/AllProducts"},
          {title: "Contact", link: "#"},
     ];

     return (
          <div className="w-full font-serif">
               {/* Desktop Navbar */}
               <div className="hidden md:flex flex-col md:flex-row justify-center items-center md:gap-10 lg:gap-40 w-full p-4">
                    {Navlink.map((item, index) => (
                         <div
                              key={index}
                              className="relative mb-2 md:mb-0 group">
                              <Link href={item.link}>
                                   <h1 className="text-lg font-medium relative">
                                        {item.title}
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                   </h1>
                              </Link>
                         </div>
                    ))}
                    <div className="mt-2 md:mt-0 relative group">
                         {isLoggedIn ? (
                              <Link href="/profile">
                                   <button className="px-4 text-white text-lg rounded-md relative">
                                        Profile
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                   </button>
                              </Link>
                         ) : (
                              <button
                                   onClick={onLoginClick}
                                   className="px-4 text-white text-lg rounded-md relative">
                                   Login
                                   <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                              </button>
                         )}
                    </div>
               </div>

               {/* Mobile Navbar */}
               <div className="flex md:hidden justify-between items-center p-4">
                    <button
                         onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                         className="text-white text-2xl focus:outline-none">
                         {isDrawerOpen ? <FaTimes /> : <FaBars />}
                    </button>
               </div>

               {/* Drawer */}
               <div
                    className={`fixed top-0 left-0 w-3/4 h-full bg-main text-white z-50 flex flex-col p-6 transition-transform duration-500 ${
                         isDrawerOpen
                              ? "transform translate-x-0 opacity-100"
                              : "transform -translate-x-full opacity-100"
                    }`}>
                    <div className="flex justify-between items-center mb-6">
                         <h1 className="text-lg font-bold">DOG TAGS</h1>
                         <button
                              onClick={() => setIsDrawerOpen(false)}
                              className="text-white text-2xl focus:outline-none">
                              <FaTimes />
                         </button>
                    </div>

                    {/* Drawer Links */}
                    <div className="flex flex-col gap-4">
                         {Navlink.map((item, index) => (
                              <Link
                                   key={index}
                                   href={item.link}
                                   className="text-lg font-medium group"
                                   onClick={() => setIsDrawerOpen(false)}>
                                   <h1 className="relative">
                                        {item.title}
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                   </h1>
                              </Link>
                         ))}

                         <div className="mt-2 md:mt-0 relative group">
                              {isLoggedIn ? (
                                   <Link href="/profile">
                                        <button className="px-4 text-white text-lg rounded-md relative">
                                             Profile
                                             <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                        </button>
                                   </Link>
                              ) : (
                                   <button
                                        onClick={onLoginClick}
                                        className="px-4 text-white text-lg rounded-md relative w-full text-center">
                                        Login
                                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                   </button>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Navber;
