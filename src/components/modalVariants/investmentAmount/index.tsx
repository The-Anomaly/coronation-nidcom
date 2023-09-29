import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { AlertCircleIcon, CloseIcon, plantImg } from "assets";
import { Button, FormatMoney } from "components";
import { useState } from "react";

const InvestmentAmount = ({ show, close, back, complete }) => {
  const [error, setError] = useState("");
  const [insufficient, setInsufficient] = useState(false);
  const [value, setValue] = useState("");

  const balance = JSON.parse(localStorage.getItem("walletBalance") ?? "");

  const limit = 10000;

  const onSubmit = () => {
    if (parseFloat(value) < limit) {
      setInsufficient(false);
      return setError("Minimum investment is ₦ 10,000");
    } else if (parseFloat(value) > parseFloat(balance)) {
      setError("");
      return setInsufficient(true);
    } else {
      setError("");
      setInsufficient(false);
      complete();

      const transactions: any[] = JSON.parse(
        localStorage.getItem("transactions") ?? ""
      );

      const transaction = {
        type: "investment",
        amount: value,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        reference: new Date().toLocaleTimeString().split(":").join(""),
      };

      transactions.unshift(transaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      const prevBalance = parseFloat(
        localStorage.getItem("investmentBalance") ?? "0"
      );
      localStorage.setItem(
        "investmentBalance",
        `${prevBalance + parseFloat(value)}`
      );
    }
  };

  return (
    <Modal
      contentClassName={styles.modal}
      position="centered"
      show={show}
      close={close}
    >
      <section className={styles.sec1}>
        <div className={styles.hd}>
          <img className={styles.icon} src={plantImg} />{" "}
          <CloseIcon role="button" onClick={close} />
        </div>
        <div className={styles.ttl}>
          <p>Coronation money market fund</p>
          <p>10.44 %</p>
        </div>
        <div className={styles.subttl}>
          <p>Issuer: Coronation</p>
          <p>Estimated Yield</p>
        </div>
      </section>
      <form>
        <label className={styles.inputWrap}>
          <p className={styles.inputWrap__label}>Amount to invest</p>
          <span className={styles.currency}>₦</span>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="number"
            placeholder="Enter amount to invest"
            min={limit}
          />
          <div className={styles.inputWrap__info}>
            {error !== "" ? <p className={styles.error}>{error}</p> : ""}
            <p className={styles.hint}>
              Wallet balance: <FormatMoney amount={balance} />
            </p>
          </div>
        </label>
      </form>
      {insufficient && (
        <section className={styles.insufficient}>
          <AlertCircleIcon />
          <div>
            <p>Insufficient balance</p>
            <p>
              You don't have enough balance in your wallet to invest in this
              product
            </p>
          </div>
          <CloseIcon role="button" onClick={() => setInsufficient(false)} />
        </section>
      )}
      <section className={styles.btnSec}>
        <Button onClick={back} variant="outline-black">
          Back
        </Button>
        <Button disabled={value === ""} onClick={onSubmit} variant="fill-black">
          {insufficient ? "Top up" : " Complete purchase"}
        </Button>
      </section>
    </Modal>
  );
};

export { InvestmentAmount };
