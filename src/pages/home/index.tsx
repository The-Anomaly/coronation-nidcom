import { HomeUI } from "modules";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Home = () => {
  const navigate = useNavigate();

  const getStarted = () => navigate(Routes.signup)
  return (
    <>
      <HomeUI getStarted={getStarted} />
    </>
  );
};

export { Home };
