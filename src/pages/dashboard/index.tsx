import { Toast, FundWallet, ToastData } from "components";
import { DashboardUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Dashboard = () => {
  const [fund, setFund] = useState(false);
  const [toast, setToast] = useState<ToastData>({
    show: false,
    title: "",
    text: "",
    type: "success",
  });
  const navigate = useNavigate();

  const portfolio = () => navigate(Routes.portfolio);
  const products = () => navigate(Routes.products);

  return (
    <>
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <FundWallet
        submit={(amount) => {
          setToast((prev) => ({
            show: true,
            title: "Top up was successful",
            text: `Your wallet was credited with N ${amount}!`,
            type: "success",
          }));
          setFund(false);
        }}
        show={fund}
        close={() => setFund(false)}
      />
      <DashboardUI
        investing={products}
        fund={() => setFund(true)}
        portfolio={portfolio}
      />
    </>
  );
};

export { Dashboard };
