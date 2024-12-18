import CustomHeadline from "@/components/CustomHeadline/CustomHeadline";
import Image from "next/image";
import React from "react";
import CustomFontTypeSubHead from "../CustomFontTypeSubHead";
import font3 from "/public/font3.png";

const FontTypeThree = () => {
  return (
    <div className=" w-full lg:max-w-[60%] m-auto">
      <section>
        <CustomHeadline
          title="Font Type"
          className="w-full max-w-[90%] mx-auto"
        />
      </section>

      <div className=" md:grid gap-10 md:grid-cols-3 p-5">
        <div className=" col-span-1">
          <Image className=" w-full " src={font3} alt="img" />
        </div>

        <div className="col-span-2 space-y-5">
          <CustomFontTypeSubHead title="Stainless Steel Long BallChain" />

          <h1>
            Mil-spec dull finish long ball-chain necklace. Made in USA. 30″ x
            3/32″. Military Spec.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FontTypeThree;
