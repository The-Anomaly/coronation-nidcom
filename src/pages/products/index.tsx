import { InvestmentAmount, InvestmentInfo, SuccessModal } from "components";
import { ProductsUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Products = () => {
  const [info, setInfo] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(false);

  return (
    <>
      <InvestmentAmount
        back={() => {
          setAmount(false);
          setInfo(true);
        }}
        complete={() => setSuccess(true)}
        show={amount}
        close={() => setAmount(false)}
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
        submit={() => {setInfo(false); setAmount(true)}}
        show={info}
        close={() => setInfo(false)}
      />
      <ProductsUI subscribe={() => setInfo(true)} />
    </>
  );
};

export { Products };
