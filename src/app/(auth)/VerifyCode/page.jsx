import React from "react";

import { Modal } from "antd";
import { VerifyCodeForm } from "./component/VerifyCodeForm";
import { useForm } from "react-hook-form";


const VerifyModal = ({ isOpen, onClose, OnupdatePassClick }) => {
  const form = useForm({
    defaultValues: {
      pin: "",
    },
    mode: "onSubmit",
  });

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={() => {
        onClose();
        form.reset();
      }}
      footer={null}
    >
      <div className=" space-y-10 my-10 ">
        <h1 className=" text-center font-semibold text-3xl text-white ">
          Check your email
        </h1>
        <p className=" text-center text-white">
          We&apos;ve sent an OTP code to your email <br /> Enter 6 digit code
          that mentioned in the email
        </p>

        <VerifyCodeForm OnupdatePassClick={OnupdatePassClick} form={form} />
      </div>
    </Modal>
  );
};

export default VerifyModal;
