"use client";

import { ChevronsUp } from "lucide-react";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down 300px
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
      >
        <ChevronsUp />
      </button>
    )
  );
};

export default ScrollToTop;
