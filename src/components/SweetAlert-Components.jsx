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

export const InteractiveToast = (title, text, icon, confirmButtonText, confirmColor) => {
  return Swal.fire({
    title: title ? title : "Oops...",
    text: text ? text : "Something went wrong!",
    icon: icon ? icon : "error",
    confirmButtonText: confirmButtonText ? confirmButtonText : "Okay",
    confirmButtonColor: confirmColor ? confirmColor : "#243448",
    customClass: {
      container: "modal-toast-container",
      popup: "modal-toast-popup",
      title: "modal-toast-title",
      content: "modal-toast-content",
      actions: "modal-toast-actions",
      confirmButton: "modal-toast-confirm-button",
    },
  });
};

export const ModalToast = (
  title,
  text,
  icon,
  confirmColor,
  cancelColor,
  confirmButtonText,
  cancelButtonText
) => {
  return Swal.fire({
    title: title ? title : "Are you sure you want to do this action?",
    text: text ? text : "",
    icon: icon ? icon : "question",
    showCancelButton: true,
    confirmButtonColor: confirmColor ? confirmColor : "#243448",
    cancelButtonColor: cancelColor ? cancelColor : "#E5E5E5",
    confirmButtonText: confirmButtonText ? confirmButtonText : "Yes",
    cancelButtonText: cancelButtonText ? cancelButtonText : 'Cancel',
    customClass: {
      container: "modal-toast-container",
      popup: "modal-toast-popup",
      title: "modal-toast-title",
      content: "modal-toast-content",
      actions: "modal-toast-actions",
      cancelButton: "modal-toast-cancel-button",
    },
  });
};

export const RemarksToast = (
  title,
  text,
  icon,
  inputType,
  inputOptions,
  inputPlaceholder,
  confirmColor,
  cancelColor,
  confirmButtonText
) => {
  const defaultInputType = inputType || "text";

  const inputConfig =
    inputType === "select"
      ? { input: "select", inputOptions }
      : { input: defaultInputType };

  return Swal.fire({
    title: title ? title : "Submit your remarks",
    text: text ? text : "",
    icon: icon ? icon : "question",
    ...inputConfig,
    inputPlaceholder: inputPlaceholder
      ? inputPlaceholder
      : "Enter your reason here...",
    showCancelButton: true,
    confirmButtonColor: confirmColor ? confirmColor : "#243448",
    cancelButtonColor: cancelColor ? cancelColor : "#E5E5E5",
    confirmButtonText: confirmButtonText ? confirmButtonText : "Submit",
    showLoaderOnConfirm: true,
    preConfirm: (remarks) => {
      if (inputType === "select" && !remarks) {
        Swal.showValidationMessage("Please select a reason!");
        return false;
      } else if (defaultInputType === "text" && !remarks) {
        Swal.showValidationMessage("This field is required!");
        return false;
      }
      return remarks;
    },
    allowOutsideClick: () => !Swal.isLoading(),
    customClass: {
      container: "modal-toast-container",
      popup: "modal-toast-popup",
      title: "modal-toast-title",
      content: "modal-toast-content",
      actions: "modal-toast-actions",
      cancelButton: "modal-toast-cancel-button",
    },
  });
};
