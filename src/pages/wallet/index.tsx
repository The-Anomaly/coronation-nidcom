import { SuccessModal } from "components";
import { WalletUI } from "modules";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const Wallet = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  return (
    <>
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
      <WalletUI />
    </>
  );
};

export { Wallet };
