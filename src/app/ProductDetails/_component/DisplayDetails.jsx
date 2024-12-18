"use client";

import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import {useProducts} from "@/components/context/ProductContext";
import {Button} from "@/components/ui/button";
import {
     Carousel,
     CarouselContent,
     CarouselDots,
     CarouselItem,
     CarouselNext,
     CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";
import placeholderImg from "/public/placeholder-image.png";

const ProductDetails = ({product}) => {
     // console.log("single product details", product);

     const [quantity, setQuantity] = useState(1);
     // const {setProducts} = useProducts();

     const {setCardProducts} = useProducts();
     const router = useRouter();

     const productDetails = product?.data;

     if (!productDetails) {
          router.push("/404");
          return null;
     }

     const handleQuantityChange = (type) => {
          setQuantity((prev) =>
               type === "increase" ? prev + 1 : Math.max(prev - 1, 1),
          );
     };

     const handleBuyNow = () => {
          console.log("Setting card products with:", {
               name: productDetails.name,
               price: productDetails.price,
               quantity,
               image: productDetails.image || placeholderImg,
          });

          setCardProducts({
               name: productDetails.name,
               id: productDetails._id,
               price: productDetails.price,
               quantity,
               images: productDetails.images || placeholderImg,
          });

          router.push("/order");
     };

     const domain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

     return (
          <div className="p-8 font-serif">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-[90%] mx-auto">
                    {/* Left Section - Product Image */}
                    <div>
                         <Carousel
                              opts={{
                                   loop: false,
                                   duration: 50,
                                   align: "start",
                              }}
                              plugins={[
                                   Autoplay({
                                        delay: 5000,
                                        stopOnInteraction: false,
                                        stopOnMouseEnter: true,
                                   }),
                              ]}>
                              <CarouselContent>
                                   {productDetails?.images?.map((img) => (
                                        <CarouselItem
                                             key={img?._id}
                                             className="w-full">
                                             <Image
                                                  src={domain + img?.url}
                                                  alt="Product Image"
                                                  height={1200}
                                                  width={1200}
                                                  className="w-auto h-auto block mx-auto"
                                             />
                                        </CarouselItem>
                                   ))}
                              </CarouselContent>

                              <div className="mt-10">
                                   <CarouselDots />
                              </div>
                         </Carousel>
                    </div>

                    {/* Right Section - Product Details */}
                    <div className="space-y-5">
                         <h1 className="text-start text-2xl font-bold">
                              {productDetails.name}
                         </h1>
                         <p className="text-2xl font-bold text-white">
                              ${productDetails.price}
                         </p>
                         <div className="text-white">
                              <ContentWrapper
                                   content={productDetails.description}
                              />
                         </div>
                         <hr />

                         <div className="flex items-center space-x-4 pt-10">
                              {/* Quantity Selector */}
                              <div className="flex items-center border border-white w-[124px] h-10">
                                   <button
                                        aria-label="Decrease quantity"
                                        className="px-4 w-full h-full border-r text-white hover:bg-white hover:text-black"
                                        onClick={() =>
                                             handleQuantityChange("decrease")
                                        }>
                                        -
                                   </button>
                                   <span className="text-xl px-3">
                                        {quantity}
                                   </span>
                                   <button
                                        aria-label="Increase quantity"
                                        className="px-4 w-full h-full border-l text-white hover:bg-white hover:text-black"
                                        onClick={() =>
                                             handleQuantityChange("increase")
                                        }>
                                        +
                                   </button>
                              </div>

                              {/* Buy Button */}
                              <Button
                                   className="w-full py-2 bg-white text-black hover:text-white"
                                   onClick={handleBuyNow}>
                                   Buy Now
                              </Button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default ProductDetails;
