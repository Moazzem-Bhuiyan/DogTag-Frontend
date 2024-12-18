import Swal from "sweetalert2";

export const SuccessModal = (message, text = "") => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message || "Successful!",
    text: text || "",
    showConfirmButton: false,
    timer: 2200,
  });
};

export const ErrorModal = (message, text = "") => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: message || "Failed!",
    text: text || "",
    showConfirmButton: false,
    showConfirmButton: true,
    confirmButtonText: "Ok, understood",
    confirmButtonColor: "#232323",
  });
};

export const ConfirmModal = (message, confirmBtnText, cancelBtnText) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f11a00",
    cancelButtonColor: "#000",
    confirmButtonText: confirmBtnText || "Yes, delete it!",
    cancelButtonText: cancelBtnText || "Cancel",
  });
};
