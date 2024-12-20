"use client";
import { useDogtagContext } from "@/components/context/DogtagContext";
import Image from "next/image";


const CustomorderForm = () => {
     const { previews } = useDogtagContext();

     return (
          <div className="p-6">
               <h1 className="text-2xl font-bold mb-4">Billing Details</h1>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 lg:max-w-[50%] mx-auto" >
                    {previews.map((image, index) => (
                         <div key={index} className="border p-4 flex justify-center">
                              <Image className=" w-[200px]" width={1200} height={1200} src={image} alt={`Dog Tag ${index + 1}`} />
                         </div>
                    ))}
               </div>

               <form className="space-y-4">
                    <div>
                         <label className="block text-sm font-medium">Name</label>
                         <input
                              type="text"
                              className="w-full border p-2"
                              placeholder="Enter your name"
                         />
                    </div>
                    <div>
                         <label className="block text-sm font-medium">Address</label>
                         <textarea
                              className="w-full border p-2"
                              placeholder="Enter your address"
                         ></textarea>
                    </div>
                    <div>
                         <label className="block text-sm font-medium">Payment Method</label>
                         <select className="w-full border p-2">
                              <option value="credit-card">Credit Card</option>
                              <option value="paypal">PayPal</option>
                              <option value="cod">Cash on Delivery</option>
                         </select>
                    </div>
                    <button type="submit" className="bg-main py-2 px-4 text-white">
                         Confirm Purchase
                    </button>
               </form>
          </div>
     );
};

export default CustomorderForm;
