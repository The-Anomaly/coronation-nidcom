import { LoginUI } from "modules";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Login = () => {
  const navigate = useNavigate();

  const login = () => navigate(Routes.dashboard);

  return (
    <>
      <LoginUI submit={login} />
    </>
  );
};

export { Login };
