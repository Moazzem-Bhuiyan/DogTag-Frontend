"use server";

export const registerUser = async (formData) => {
     const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`,
          {
               method: "POST",
               body: formData,
               caches: "no-store",
          },
     );

     const userinfo = await res.json();

     return userinfo;
};
