import Swal from "sweetalert2";

export const useToast = () => {
  const showToast = (title, icon = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      background: "#fff",
      color: "#333",
    });
  };

  return { showToast };
};
