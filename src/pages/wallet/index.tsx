import {
  FundWallet,
  SuccessModal,
  Toast,
  ToastData,
  Withdraw,
} from "components";
import { WalletUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Wallet = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [fund, setFund] = useState(false);
  const [withdraw, setWithdraw] = useState({ show: false, amount: "" });
  const [toast, setToast] = useState<ToastData>({
    show: false,
    title: "",
    text: "",
    type: "success",
  });

  return (
    <>
      <Toast
        {...toast}
        close={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <Withdraw
        submit={(amount) => {
          setWithdraw({ show: false, amount });
          setSuccess(true);
        }}
        show={withdraw.show}
        close={() => setWithdraw((prev) => ({ ...prev, show: false }))}
      />
      <FundWallet
        submit={(amount) => {
          setToast({
            show: true,
            title: "Top up was successful",
            text: `Your wallet was credited with N ${amount}!`,
            type: "success",
          });
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
            <span>₦{withdraw.amount}</span> to <span>Benjamin Okeke</span>
          </>
        }
        btnText="Go to dashboard"
        btntOnClick={() => navigate(Routes.dashboard)}
      />
      <WalletUI
        fund={() => setFund(true)}
        withdraw={() => setWithdraw({ show: true, amount: "" })}
      />
    </>
  );
};

export { Wallet };
