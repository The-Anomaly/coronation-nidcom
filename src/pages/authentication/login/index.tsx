import { LoginUI } from "modules";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Login = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate(Routes.dashboard);
    localStorage.setItem("walletBalance", "0");
    localStorage.setItem("investmentBalance", "0");
  };

  return (
    <>
      <LoginUI submit={login} />
    </>
  );
};

export { Login };
