import axios from "axios";
import ProductDetails from "../_component/DisplayDetails";

const ProductDetailsPage = async ({params}) => {
     const {id} = await params;

     try {
          const response = await axios.get(
               `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${id}`,
          );
          const product = response.data;

          return <ProductDetails product={product} />;
     } catch (error) {
          console.error("Error fetching product:", error);
          return <div className="text-center">Product not found!</div>;
     }
};

export default ProductDetailsPage;
