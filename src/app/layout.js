import localFont from "next/font/local";
import "./globals.css";
import Hero from "@/components/shared/Hero";
import Footer from "@/components/shared/Footer";
import { FormProvider } from "@/components/context/FormContext";
import ProgressBar from "@/components/shared/Progressber";
import ScrollToTop from "@/components/shared/ScrollTopButton";
import { ProductProvider } from "@/components/context/ProductContext";
import { Toaster } from "sonner";
import { LoginProvider } from "@/components/context/LoginContext";
import { DogtagProvider } from "@/components/context/DogtagContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Dog-Tag",
  description: "Dog-Tag",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="text-white">
          {/* Include the ProgressBar */}
                                  <ProgressBar />
            <DogtagProvider>
            <LoginProvider>
                   <ProductProvider>
                        {/* Hero Section */}
                             <Hero />
                         {/* Form Context Provider */}
                                <FormProvider>{children}</FormProvider>
                                 {/* Scroll to Top */}
                             <ScrollToTop />
                  </ProductProvider>
             </LoginProvider>
            </DogtagProvider>

          {/* Footer */}
          <Footer />
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
