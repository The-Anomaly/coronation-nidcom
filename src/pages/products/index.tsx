import {
  FormatMoney,
  FundWallet,
  InvestmentAmount,
  InvestmentInfo,
  SuccessModal,
  Toast,
  ToastData,
} from "components";
import { ProductsUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Products = () => {
  const [info, setInfo] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(false);
  const [fund, setFund] = useState(false);
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
      <FundWallet
        submit={(amount) => {
          setToast({
            show: true,
            title: "Top up was successful",
            text: <>Your wallet was credited with <FormatMoney amount={amount} />!</>,
            type: "success",
          });
          setFund(false);

          setTimeout(() => {
            setAmount(true);
          }, 1500);
        }}
        show={fund}
        close={() => setFund(false)}
      />
      <InvestmentAmount
        back={() => {
          setAmount(false);
          setInfo(true);
        }}
        complete={() => setSuccess(true)}
        show={amount}
        close={() => setAmount(false)}
        fund={() => {
          setFund(true);
          setAmount(false);
        }}
      />
      <SuccessModal
        show={success}
        close={() => setSuccess(false)}
        text={
          <>
            You successfully purchased <span>Coronation market fund</span>. A
            step closer to building wealth
          </>
        }
        btnText="View portfolio"
        btntOnClick={() => navigate(Routes.portfolio)}
      />
      <InvestmentInfo
        submit={() => {
          setInfo(false);
          setAmount(true);
        }}
        show={info}
        close={() => setInfo(false)}
      />
      <ProductsUI subscribe={() => setInfo(true)} />
    </>
  );
};

export { Products };
