import CustomHeadline from "@/components/CustomHeadline/CustomHeadline";
import Image from "next/image";
import React from "react";
import font1 from "/public/Font1.png";
import CustomFontTypeSubHead from "../CustomFontTypeSubHead";

const FontTypeOne = () => {
  return (
    <div className=" w-full lg:max-w-[60%] m-auto">
      <section>
        <CustomHeadline
          title="Font Type"
          className="w-full lg:max-w-[90%] mx-auto"
        />
      </section>

      <div className=" md:grid gap-10 md:grid-cols-3 p-5">
        <div className=" col-span-1">
          <Image className=" w-full" src={font1} alt="img" />
        </div>

        <div className="col-span-2 space-y-5">
          <CustomFontTypeSubHead title="Embossed Mil-spec" />

          <h1>
            2mm x 3mm characters are raised above surface. This modern military
            font is the most popular, select this if you are unsure. Has the
            most available characters &
            symbols:A…Z 0…9*.# ? $ % ! : ; • + = , \ / & _-¯() @ Ø © ® ™☆ ✝ ✡ ♡    
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FontTypeOne;
