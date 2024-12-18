const Footer = () => {
     return (
          <div className=" bg-main w-full md:h-[266px] md:flex justify-around items-center p-4 font-serif ">
               <div className=" space-y-3 ">
                    <h1 className=" md:text-center text-2xl">ADDRESS</h1>
                    <li className=" text-center md:text-start ">unitedtags.x10.mx</li>
                    <li className=" text-center md:text-start ">New York, USA</li>
                    <li className=" text-center md:text-start ">Test 12345</li>
               </div>
               <hr />

               <div className=" space-y-3">
                    <h1 className="text-2xl">CONTACT</h1>

                    <div className=" flex flex-col justify-center">
                         <li className=" text-center md:text-start ">Get in touch!</li>
                         <li className=" text-center md:text-start ">+1-12345-678910</li>
                         <li className=" text-center md:text-start ">abc@gmail.com</li>
                    </div>
               </div>
               <hr />

               <div className=" space-y-3">
                    <h1 className=" md:text-center text-center text-2xl">
                         QUICK LINKS
                    </h1>
                    <li className=" text-center md:text-start">Shop now</li>
                    <li className=" text-center md:text-start  ">Legal Notice</li>
                    <li className=" text-center md:text-start  ">Privacy</li>
               </div>
          </div>
     );
};

export default Footer;
