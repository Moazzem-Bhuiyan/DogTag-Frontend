"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import ChangePasswordForm from "../(auth)/ChangePassword/Component/ChangePasswordForm";
import {ListOrdered, LogOut, Settings} from "lucide-react";

import {useRouter} from "next/navigation";
import {useLogin} from "@/components/context/LoginContext";

const Profile = () => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);

     const router = useRouter();

     const {logout} = useLogin();

     useEffect(() => {
          const token = localStorage.getItem("accessToken");
          setIsLoggedIn(!!token);
     }, []);

     const handleLogout = () => {
          logout();
          router.push("/"); // Redirect to home page after logout
     };

     return (
          <div className=" w-full md:max-w-[60%] m-auto md:grid grid-cols-4 gap-10 justify-center items-center  font-serif py-10">
               {/* sideber */}

               <div className=" space-y-6 col-span-1">
                    <div>
                         <li className=" flex gap-2">
                              {" "}
                              <Settings />
                              <Link href="/profile">Setting</Link>
                         </li>
                    </div>
                    <div>
                         <li className="flex gap-2">
                              {" "}
                              <ListOrdered />
                              <Link href="/Orderhistory">OrderHistory</Link>
                         </li>
                    </div>
                    <div>
                         <li className=" flex gap-2">
                              {" "}
                              {isLoggedIn ? (
                                   <>
                                        <LogOut />
                                        <button
                                             className="bg-transparent text-start text-"
                                             onClick={handleLogout}>
                                             Logout
                                        </button>
                                   </>
                              ) : (
                                   ""
                              )}
                         </li>
                    </div>
               </div>

               {/* main content */}

               <div className=" col-span-3">
                    <ChangePasswordForm />
               </div>
          </div>
     );
};

export default Profile;
