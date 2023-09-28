import { Button } from "components";
import styles from "./styles.module.scss";
import {
  ArrowIcon,
  BriefCaseIcon,
  EyeSlashIcon,
  SendIcon,
  WalletAddIcon,
  moneyImg,
  paymentImg,
  wheelImg,
} from "assets";

const DashboardUI = () => {
  return (
    <>
      <section className={styles.heading}>
        <p className={styles.heading__ttl}>Hi Benjamin 👋🏾</p>
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
              <span style={{ fontWeight: "700" }}>₦</span> 400,000,000.
              <span style={{ fontSize: "80%" }}>00</span>
              <span className={styles.arrow}>
                <ArrowIcon /> 16.80 %
              </span>
            </p>
            <div className={styles.btns}>
              <Button variant="fill-white">
                Start investing <SendIcon />
              </Button>
              <Button className={styles.transparent} variant="fill-white">
                View portfolio <BriefCaseIcon />
              </Button>
            </div>
          </div>
          <div className={`${styles.card} ${styles.card2}`}>
            <p className={styles.tag}>Wallet balance</p>
            <p className={styles.amount}>
              <span style={{ fontWeight: "700" }}>₦</span> 20,000,000.
              <span style={{ fontSize: "80%" }}>00</span>
            </p>
            <div className={styles.btns}>
              <Button variant="outline">
                Top up balance <WalletAddIcon />
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
          <TransactionItem
            type="deposit"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <TransactionItem
            type="withdrawal"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <TransactionItem
            type="deposit"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <TransactionItem
            type="withdrawal"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <TransactionItem
            type="deposit"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <TransactionItem
            type="withdrawal"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <TransactionItem
            type="deposit"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <TransactionItem
            type="withdrawal"
            date="12 Apr. 2023"
            time="11:24 AM"
            amount="400, 000.00"
            id="47458593030302111"
          />
          <button className={styles.viewAll}>View all</button>
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
  type: "deposit" | "withdrawal";
  date: string;
  time: string;
  amount: string;
  id: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  date,
  time,
  amount,
  id,
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
        <p className={styles.info2__ttl}>₦ {amount}</p>
        <p className={styles.info2__txt}>{id}</p>
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
}
const ProductItem: React.FC<ProductItemProps> = ({
  image,
  bg,
  title,
  text,
  isComingSoon,
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
        {!isComingSoon && <Button variant="outline">Invest</Button>}
      </div>
    </>
  );
};

export { DashboardUI };
