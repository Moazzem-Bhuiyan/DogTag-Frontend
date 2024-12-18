"use client";

import {useProducts} from "@/components/context/ProductContext";
import ProductList from "@/components/product/ProductList";
import {Skeleton} from "antd";

const AllProducts = () => {
     const {products, loading, error} = useProducts();

     if (loading)
          return (
               <div className=" h-screen">
                    <Skeleton />{" "}
               </div>
          );
     // if (error) return <div>{toast.error(error)}</div>;

     return (
          <div className="p-8 w-full md:max-w-[60%] mx-auto md:h-screen h-full font-serif ">
               <h1 className="text-3xl font-bold mb-6">All Products</h1>
               <ProductList products={products} />
          </div>
     );
};

export default AllProducts;
