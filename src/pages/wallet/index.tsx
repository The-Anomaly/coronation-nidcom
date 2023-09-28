import { FundWallet, SuccessModal, Toast, Withdraw } from "components";
import { WalletUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Wallet = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [fund, setFund] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <>
      <Toast show={toast} close={() => setToast(false)} />
      <Withdraw
        submit={() => {
          setWithdraw(false);
          setSuccess(true);
        }}
        show={withdraw}
        close={() => setWithdraw(false)}
      />
      <FundWallet
        submit={() => {
          setToast(true);
          setFund(false);
        }}
        show={fund}
        close={() => setFund(false)}
      />
      <SuccessModal
        show={success}
        close={() => setSuccess(false)}
        text={
          <>
            You successfully sent <br />
            <span>₦200,000.00</span> to <span>Benjamin Okeke</span>
          </>
        }
        btnText="Go to dashboard"
        btntOnClick={() => navigate(Routes.dashboard)}
      />
      <WalletUI fund={() => setFund(true)} withdraw={() => setWithdraw(true)} />
    </>
  );
};

export { Wallet };
