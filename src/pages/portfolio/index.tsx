import { RedeemInvestment, SuccessModal } from "components";
import { PortfolioUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Portfolio = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [redeem, setRedeem] = useState(false);

  const handleInvesting = () => navigate(Routes.products);

  return (
    <>
      <RedeemInvestment
        redeem={() => {
          setRedeem(false);
          setSuccess(true);
        }}
        show={redeem}
        close={() => {
          setRedeem(false);
        }}
      />
      <SuccessModal
        show={success}
        close={() => setSuccess(false)}
        text={
          <>
            You successfully redeemed <span>Coronation market fund</span>. Your
            wallet will be created in 24hours
          </>
        }
        btnText="Go to wallet"
        btntOnClick={() => navigate(Routes.wallet)}
      />
      <PortfolioUI
        redeem={() => setRedeem(true)}
        handleInvesting={handleInvesting}
      />
    </>
  );
};

export { Portfolio };
