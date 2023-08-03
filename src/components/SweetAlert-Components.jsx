import Swal from "sweetalert2";
import "../stylesheets/sweetalert.scss";

export const BasicToast = (icon, title, timer, position) => {
  return Swal.fire({
    position: position ? position : "top-right",
    icon: icon ? icon : "success",
    title: title ? title : "Progress saved",
    showConfirmButton: false,
    timer: timer ? timer : 1400,
    timerProgressBar: true,
    customClass: {
      popup: "basic-swal-size",
      container: "custom-zIndex",
    },
  });
};

export const ModalToast = (
  title,
  text,
  icon,
  confirmColor,
  cancelColor,
  confirmButtonText
) => {
  return Swal.fire({
    title: title ? title : "Are you sure you want to do this action?",
    text: text ? text : "",
    icon: icon ? icon : "question",
    showCancelButton: true,
    confirmButtonColor: confirmColor ? confirmColor : "#243448",
    cancelButtonColor: cancelColor ? cancelColor : "#F30737",
    confirmButtonText: confirmButtonText ? confirmButtonText : "Yes",
    customClass: {
      container: "modal-toast-container",
      popup: "modal-toast-popup",
      title: "modal-toast-title",
      content: "modal-toast-content",
      actions: "modal-toast-actions",
    },
  });
};
