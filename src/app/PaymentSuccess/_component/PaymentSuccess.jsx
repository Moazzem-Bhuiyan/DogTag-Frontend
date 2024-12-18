"use client";
import React from "react";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="bg-green-500 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="h-10 w-10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <path
              fillRule="evenodd"
              d="M9 12l2 2 4-4a1 1 0 011.414 0l.086.086a1 1 0 010 1.414l-4.5 4.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600">
          Thank you for your payment. Your transaction has been completed.
        </p>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => (window.location.href = "/")} // Replace with your route
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
