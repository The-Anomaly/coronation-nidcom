import { Toast, ToastData } from "components";
import { LoginUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Login = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<ToastData>({
    show: false,
    title: "",
    text: "",
    type: "success",
  });

  const login = () => {
    const profile = localStorage.getItem("signupProfile");

    if (profile) {
      navigate(Routes.dashboard);
      const walletBalance = localStorage.getItem("walletBalance");
      const investmentBalance = localStorage.getItem("investmentBalance");
      const transactions = localStorage.getItem("transactions");

      !walletBalance && localStorage.setItem("walletBalance", "0");
      !investmentBalance && localStorage.setItem("investmentBalance", "0");
      !transactions && localStorage.setItem("transactions", `[]`);
    } else {
      setToast({
        show: true,
        title: "Profile not found",
        text: `Please create an account to access the dashboard`,
        type: "error",
      });
    }
  };

  return (
    <>
    <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <LoginUI submit={login} />
    </>
  );
};

export { Login };
