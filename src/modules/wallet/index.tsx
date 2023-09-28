import { ArrowIcon, emptyBoxImg, moneyImg2, withdrawImg } from "assets";
import styles from "./styles.module.scss";

interface TransactionData {
  type: "deposit" | "withdrawal" | "investment";
  amount: number;
  date: string;
  time: string;
  reference: string;
}

const WalletUI = ({ fund, withdraw }) => {
  const transactions: any = JSON.parse(
    localStorage.getItem("transactions") ?? ""
  );

  const wallet = JSON.parse(localStorage.getItem("walletBalance") ?? "");
  return (
    <>
      <section className={styles.heading}>
        <div className={styles.balance}>
          <p>Wallet balance</p>
          <p>₦ {wallet}</p>
        </div>
        <div onClick={fund} role="button" className={styles.fund}>
          <img src={moneyImg2} />
          <div>
            <p>Fund wallet</p>
            <p>Click add money to your wallet</p>
          </div>
        </div>
        <div onClick={withdraw} role="button" className={styles.withdraw}>
          <img src={withdrawImg} />
          <div>
            <p>Withdraw to your bank</p>
            <p>Click to withdraw money from your wallet</p>
          </div>
        </div>
      </section>
      <section className={styles.table}>
        <p className={styles.table__ttl}>Transaction history</p>
        {transactions.length > 0 && (
          <div className={styles.table__heading}>
            <span>Description</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Reference</span>
          </div>
        )}
        {transactions.length > 0 ? (
          transactions.map((item, index) => (
            <div className={styles.table__item}>
              <span className={styles.table__item__descrip}>
                <ArrowIcon
                  className={item.type === "deposit" ? styles.deposit : ""}
                />
                <div>
                  <p>{item.type}</p>
                  <p>
                    Your wallet was{" "}
                    {item.type === "deposit" ? "credited with" : "debited of"}{" "}
                    <span>₦ {item.amount}</span>{" "}
                  </p>
                </div>
              </span>
              <span className={styles.table__item__amount}>
                ₦ {item.amount}
              </span>
              <span className={styles.table__item__date}>
                <span>{item.date}</span>
                <span>{item.time}</span>
              </span>
              <span className={styles.table__item__ref}>{item.reference}</span>
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <img src={emptyBoxImg} alt="empty box" />
            <p>You have not made any transaction yet</p>
          </div>
        )}
      </section>
    </>
  );
};

export { WalletUI };
