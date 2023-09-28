import { Toast, FundWallet } from "components";
import { DashboardUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Dashboard = () => {
  const [fund, setFund] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const portfolio = () => navigate(Routes.portfolio);
  const products = () => navigate(Routes.products);

  return (
    <>
      <Toast show={toast} close={() => setToast(false)} />
      <FundWallet
        submit={() => {
          setToast(true);
          setFund(false);
        }}
        show={fund}
        close={() => setFund(false)}
      />
      <DashboardUI investing={products} fund={() => setFund(true)} portfolio={portfolio} />
    </>
  );
};

export { Dashboard };
