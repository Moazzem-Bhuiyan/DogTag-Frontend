import axios from "axios";

export const verifyOtp = async ({email, otp, token}) => {
     try {
          const response = await axios.post(
               `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/otp/verify-otp`,
               {email, otp},
               {
                    headers: {
                         token: token,
                    },
               },
          );
          return response.data;
     } catch (error) {
          console.error("Error in verifyOtp:", error);
          throw error;
     }
};
