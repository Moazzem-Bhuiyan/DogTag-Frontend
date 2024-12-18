import Image from "next/image";
import Link from "next/link";
import {
     Carousel,
     CarouselContent,
     CarouselDots,
     CarouselItem,
} from "../ui/carousel";

const ProductCard = ({product}) => {
     const domain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

     console.log(product);

     return (
          <div className=" w-[300px] md:w-[250px] lg:w-[300px] mx-auto p-4 my-5 md:my-0 rounded border shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-white ">
               <Link href={`/ProductDetails/${product?._id}`}>
                    {/* Image Slider */}
                    <Carousel>
                         <CarouselContent>
                              {product?.images?.map((img) => (
                                   <CarouselItem
                                        key={img?.url}
                                        className="w-full">
                                        <Image
                                             src={`${domain}${img?.url}`}
                                             alt="Product Image"
                                             height={1200}
                                             width={1200}
                                             className="h-[200px] w-auto mx-auto"
                                        />
                                   </CarouselItem>
                              ))}
                         </CarouselContent>

                         <div>
                              <CarouselDots />
                         </div>
                    </Carousel>

                    <h2 className="text-xl font-semibold mt-4">
                         {product?.name}
                    </h2>
                    <p className="text-white">£ {product?.price}</p>
               </Link>
          </div>
     );
};

export default ProductCard;
