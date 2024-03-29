import { Button, FormatMoney } from "components";
import styles from "./styles.module.scss";
import {
  ArrowIcon,
  BriefCaseIcon,
  EyeSlashIcon,
  SendIcon,
  WalletAddIcon,
  emptyBoxImg,
  moneyImg,
  paymentImg,
  wheelImg,
} from "assets";

const DashboardUI = ({ fund, portfolio, investing, viewWallet }) => {
  const data = JSON.parse(localStorage.getItem("signupAgreement") ?? "{}");

  const wallet = JSON.parse(localStorage.getItem("walletBalance") ?? "0");
  const investment = JSON.parse(
    localStorage.getItem("investmentBalance") ?? "0"
  );
  const transactions = JSON.parse(localStorage.getItem("transactions") ?? "[]");

  return (
    <>
      <section className={styles.heading}>
        <p className={styles.heading__ttl}>Hi {data.firstName} 👋🏾</p>
        <p className={styles.heading__txt}>
          Welcome to Coronation, Lets help you build wealth!
        </p>
      </section>
      <section className={styles.body}>
        <section className={styles.cards}>
          <div className={`${styles.card} ${styles.card1}`}>
            <p className={styles.tag}>
              Investment balance <EyeSlashIcon />{" "}
            </p>
            <p className={styles.amount}>
              <FormatMoney amount={investment} />

              {investment > 0 ? (
                <span className={styles.arrow}>
                  <ArrowIcon /> 16.80 %
                </span>
              ) : (
                ""
              )}
            </p>
            <div className={styles.btns}>
              <Button onClick={investing} variant="fill-white">
                Start investing <SendIcon />
              </Button>
              <Button
                onClick={portfolio}
                className={styles.transparent}
                variant="fill-white"
              >
                View portfolio <BriefCaseIcon />
              </Button>
            </div>
          </div>
          <div className={`${styles.card} ${styles.card2}`}>
            <p className={styles.tag}>Wallet balance</p>
            <p className={styles.amount}>
              <FormatMoney amount={wallet} />
            </p>
            <div className={styles.btns}>
              <Button onClick={fund} variant="outline">
                Fund wallet <WalletAddIcon />
              </Button>
            </div>
          </div>
        </section>
        <section className={styles.transactions}>
          <section className={`${styles.heading} ${styles.subHeading}`}>
            <p className={styles.heading__ttl}>Recent Transactions</p>
            <p className={styles.heading__txt}>
              A view of all the transactions you have made
            </p>
          </section>
          {transactions.length > 0 ? (
            <>
              {transactions.slice(0, 8).map((item) => (
                <TransactionItem {...item} />
              ))}

              {transactions.length > 8 && (
                <button onClick={viewWallet} className={styles.viewAll}>
                  View all
                </button>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <img src={emptyBoxImg} alt="empty box" />
              <p>You have not made any transaction yet</p>
            </div>
          )}
        </section>
        <section>
          <section className={`${styles.heading} ${styles.subHeading}`}>
            <p className={styles.heading__ttl}>Our Products</p>
            <p className={styles.heading__txt}>
              Select a product of your choice and start investing
            </p>
          </section>
          <div className={styles.products}>
            <ProductItem
              image={moneyImg}
              bg="#D1FADF"
              title="Asset management"
              text={`At Coronation Asset Management we offer investment capabilities
            across traditional and alternative asset classes in line with our
            customers needs and risk appetites for both our institutional and
            individual customers`}
              onClick={investing}
            />
            <ProductItem
              image={wheelImg}
              bg={"#FDDCAB"}
              title={"Private banking"}
              text={`We support a wide range of public and private companies and governmental institutions by offering our best-in-class strategic/financial advisory capabilities, corporate structuring and restructuring expertise, debt and equity capital market solutions as well as innovative project and structured financing advisory competencies. `}
              isComingSoon
            />
            <ProductItem
              image={paymentImg}
              bg={"#EBE9FE"}
              title={"Securities trading & brokerage"}
              text={`Make securities trading decisions backed by the insights of the Coronation research and investment team. 
Lorem ipsum dolor sit amet consectetur. Dolor eget ac dictumst elementum cras amet eget.`}
              isComingSoon
            />
          </div>
        </section>
      </section>
    </>
  );
};

interface TransactionItemProps {
  type: "deposit" | "withdrawal" | "investment";
  date: string;
  time: string;
  amount: string;
  reference: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  date,
  time,
  amount,
  reference,
}) => {
  return (
    <div className={styles.transaction}>
      <ArrowIcon
        className={`${
          type === "deposit" ? styles.deposit : styles.withdrawal
        } ${styles.transaction__icon}`}
      />
      <div className={styles.info1}>
        <p className={styles.info1__ttl}>{type}</p>
        <p className={styles.info1__txt}>
          <span>{date}</span> <span>{time}</span>
        </p>
      </div>
      <div className={styles.info2}>
        <p className={styles.info2__ttl}>
          <FormatMoney amount={amount} />
        </p>
        <p className={styles.info2__txt}>{reference}</p>
      </div>
    </div>
  );
};

interface ProductItemProps {
  image: string;
  bg: string;
  title: string;
  text: string;
  isComingSoon?: boolean;
  onClick?: () => {};
}
const ProductItem: React.FC<ProductItemProps> = ({
  image,
  bg,
  title,
  text,
  isComingSoon,
  onClick,
}) => {
  return (
    <>
      <div className={styles.product}>
        <div className={styles.product__imgSec} style={{ background: bg }}>
          <img src={image} />
        </div>
        <div className={styles.product__content}>
          <p className={styles.product__content__ttl}>
            <span>{title}</span>{" "}
            {isComingSoon ? (
              <span className={styles.soon}>Coming soon</span>
            ) : (
              ""
            )}
          </p>
          <p className={styles.product__content__txt}>{text}</p>
        </div>
        {!isComingSoon && (
          <Button onClick={onClick} variant="outline">
            Invest
          </Button>
        )}
      </div>
    </>
  );
};

export { DashboardUI };
