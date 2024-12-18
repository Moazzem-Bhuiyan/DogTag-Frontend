import CustomHeadline from "@/components/CustomHeadline/CustomHeadline";
import Image from "next/image";
import React from "react";
import CustomFontTypeSubHead from "../CustomFontTypeSubHead";
import font2 from "/public/font2.png";

const FontTypeTwo = () => {
  return (
    <div className=" w-full lg:max-w-[60%] m-auto">
      <section>
        <CustomHeadline
          title="Font Type"
          className="w-full max-w-[90%] mx-auto"
        />
      </section>

      <div className=" md:grid gap-10 xl:grid-cols-3 p-5">
        <div className=" col-span-1">
          <Image className=" w-full" src={font2} alt="img" />
        </div>

        <div className="col-span-2 space-y-5">
          <CustomFontTypeSubHead title="Mil-Spec Matte Dog Tag x 2" />

          <h1>
            Stainless Steel Dull 2D Finish. Most popular Dog Tag, choose this if
            unsure. Hole and rolled edge can be re-oriented. Complies with
            military specifications.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FontTypeTwo;
