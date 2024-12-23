"use client";

import {useProducts} from "@/components/context/ProductContext";
import ProductCard from "@/components/product/ProductCard";
import {Skeleton} from "antd";
import Link from "next/link";
import {motion} from "framer-motion";
import {toast} from "sonner";

const HomePageProduct = () => {
     const {products, loading, error} = useProducts();
     const featuredProductss = Array.isArray(products) ? products : [];

     const featuredProducts = featuredProductss.slice(0, 3);

     if (loading)
          return (
               <div className=" h-screen">
                    <Skeleton />
               </div>
          );

     // if (error) return <div>{toast.error(error)}</div>;

     const containerVariants = {
          hidden: {opacity: 0, scale: 0.9},
          visible: {
               opacity: 1,
               scale: 1,
               transition: {
                    delayChildren: 0.2,
                    staggerChildren: 0.25,
                    ease: "easeInOut",
                    duration: 1,
               },
          },
     };

     const itemVariants = {
          hidden: {opacity: 0, y: 30},
          visible: {
               opacity: 1,

               y: 0,
               transition: {
                    ease: "easeInOut",
                    duration: 0.8,
               },
          },
     };

     return (
          <div className="p-8 font-serif">
               <div className="mt-6 w-full lg:max-w-[60%] mx-auto flex justify-between">
                    <h1 className="md:text-3xl font-bold mb-6 font-serif">
                         Featured Products
                    </h1>
                    <Link href="/AllProducts">
                         <button className="px-6 py-2 text-white rounded mt-2.5 justify-end hover:underline">
                              See All
                         </button>
                    </Link>
               </div>

               <motion.div
                    className="w-full lg:max-w-[60%] lg:mx-auto md:grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    {featuredProducts.length > 0 ? (
                         featuredProducts.map((product) => (
                              <motion.div
                                   key={product._id}
                                   variants={itemVariants}>
                                   <ProductCard product={product} />
                              </motion.div>
                         ))
                    ) : (
                         <motion.div
                              className="text-center"
                              initial={{opacity: 0}}
                              animate={{opacity: 1}}
                              transition={{duration: 1.2, ease: "easeInOut"}}>
                              No featured products available.
                         </motion.div>
                    )}
               </motion.div>
          </div>
     );
};

export default HomePageProduct;
