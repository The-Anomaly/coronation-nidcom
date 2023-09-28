import { ArrowIcon, moneyImg2, withdrawImg } from "assets";
import styles from "./styles.module.scss";

interface TransactionData {
  type: "deposit" | "withdrawal" | "investment";
  amount: number;
  date: string;
  time: string;
  ref: string;
}

const WalletUI = () => {
  return (
    <>
      <section className={styles.heading}>
        <div className={styles.balance}>
          <p>Wallet balance</p>
          <p>₦ 20,000,000.00</p>
        </div>
        <div role="button" className={styles.fund}>
          <img src={moneyImg2} />
          <div>
            <p>Fund wallet</p>
            <p>Click add money to your wallet</p>
          </div>
        </div>
        <div role="button" className={styles.withdraw}>
          <img src={withdrawImg} />
          <div>
            <p>Withdraw to your bank</p>
            <p>Click to withdraw money from your wallet</p>
          </div>
        </div>
      </section>
      <section className={styles.table}>
        <p className={styles.table__ttl}>Transaction history</p>
        <div className={styles.table__heading}>
          <span>Description</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Reference</span>
        </div>
        <div className={styles.table__item}>
          <span className={styles.table__item__descrip}>
            <ArrowIcon />
            <div>
              <p>Deposit</p>
              <p>
                Your wallet was credited with <span>₦ 400, 000.00</span>{" "}
              </p>
            </div>
          </span>
          <span className={styles.table__item__amount}>₦ 400, 000.00</span>
          <span className={styles.table__item__date}>
            <span>12 Apr. 2023</span>
            <span>11:24 AM</span>
          </span>
          <span className={styles.table__item__ref}>47458593030302111</span>
        </div>
        <div className={styles.table__item}>
          <span className={styles.table__item__descrip}>
            <ArrowIcon />
            <div>
              <p>Deposit</p>
              <p>
                Your wallet was credited with <span>₦ 400, 000.00</span>{" "}
              </p>
            </div>
          </span>
          <span className={styles.table__item__amount}>₦ 400, 000.00</span>
          <span className={styles.table__item__date}>
            <span>12 Apr. 2023</span>
            <span>11:24 AM</span>
          </span>
          <span className={styles.table__item__ref}>47458593030302111</span>
        </div>
      </section>
    </>
  );
};

export { WalletUI };
