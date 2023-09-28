import { ArrowIcon, CardIcon, SendIcon, emptyBoxImg, plantImg } from "assets";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Button } from "components";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  // Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement
);

const subscriptions: SubscriptionData[] = [
  {
    title: "Coronation money market fund",
    type: "Asset management",
    amount: "₦ 400,000.00",
    growth: "+ 8.24%",
    growthRate: "positive",
  },
  {
    title: "Coronation fixed income fund",
    type: "Asset management",
    amount: "₦ 120,000.00",
    growth: "- 3.56%",
    growthRate: "negative",
  },
  {
    title: "Coronation balanced fund",
    type: "Asset management",
    amount: "₦ 540,000.00",
    growth: "+ 8.24%",
    growthRate: "positive",
  },
];

const history: HistoryData[] = [
  {
    title: "Coronation money market fund",
    type: "Asset management",
    amount: "₦ 400,000.00",
    growth: "+ 8.24%",
    growthRate: "positive",
    date: "12 Apr, 2024",
  },
  {
    title: "Coronation fixed income fund",
    type: "Asset management",
    amount: "₦ 120,000.00",
    growth: "- 3.56%",
    growthRate: "negative",
    date: "22 Sept, 2023",
  },
  {
    title: "Coronation balanced fund",
    type: "Asset management",
    amount: "₦ 540,000.00",
    growth: "+ 8.24%",
    growthRate: "positive",
    date: "11 Sept, 2024",
  },
];

const PortfolioUI = ({ handleInvesting, redeem }) => {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      title: "Subscribed",
    },
    { title: "History" },
  ];
  const investment = JSON.parse(
    localStorage.getItem("investmentBalance") ?? "0"
  );
  return (
    <>
      <section className={styles.overviewWrap}>
        <section className={styles.overview}>
          <div className={styles.graphSec}>
            <Chart investment={investment} />
            <div className={styles.legend}>
              <p className={styles.color1}>Mutual funds 25%</p>
              <p className={styles.color2}>Equity 35%</p>
              <p className={styles.color3}>Fixed income fund 30%</p>
              <p className={styles.color4}>Balanced funds 10%</p>
            </div>
          </div>
          <div className={styles.info}>
            <p className={styles.info__tag}>Investment balance</p>
            <p className={styles.info__ttl}>
              ₦ {investment}
              {investment > 0 ? (
                <span>
                  <ArrowIcon /> 16.80 %
                </span>
              ) : (
                ""
              )}
            </p>
            <Button
              onClick={handleInvesting}
              className={styles.info__btn}
              variant="fill-black"
            >
              Start investing <SendIcon />
            </Button>
          </div>
        </section>
      </section>
      <section className={styles.table}>
        <div className={styles.table__nav}>
          {tabs.map((tab, index) => (
            <span
              onClick={() => setActive(index)}
              role="button"
              className={active === index ? styles.table__active : ""}
            >
              {tab.title}
            </span>
          ))}
        </div>
        {investment > 0 ? (
          active === 0 ? (
            <>
              <div className={styles.table__heading}>
                <span>Name</span>
                <span>Type</span>
                <span>Amount</span>
                <span>Growth</span>
                <span></span>
              </div>
              {subscriptions.map((item, index) => (
                <SubscriptionItem
                  redeem={redeem}
                  key={`subscription_${index}`}
                  {...item}
                />
              ))}
            </>
          ) : (
            <>
              <div className={styles.history__heading}>
                <span>Name</span>
                <span>Type</span>
                <span>Amount</span>
                <span>Growth</span>
                <span>Date Redeemed</span>
              </div>
              {history.map((item, index) => (
                <HistoryItem key={`history_${index}`} {...item} />
              ))}
            </>
          )
        ) : (
          <div className={styles.empty}>
            <img src={emptyBoxImg} alt="empty box" />
            <p>You don't have any subscriptions</p>
          </div>
        )}
      </section>
    </>
  );
};

interface HistoryData {
  title: string;
  type: string;
  amount: string;
  growth: string;
  growthRate: "positive" | "negative";
  date: string;
}

const HistoryItem: React.FC<HistoryData> = ({
  title,
  type,
  amount,
  growth,
  growthRate,
  date,
}) => {
  return (
    <div className={styles.history__item}>
      <span className={styles.history__item__descrip}>
        <img src={plantImg} alt="" />
        <p>{title}</p>
      </span>
      <span className={styles.history__item__type}>{type}</span>
      <span className={styles.history__item__amount}>{amount}</span>
      <span className={styles.history__item__growth}>
        <span className={styles[growthRate]}>{growth}</span>
      </span>
      <span className={styles.history__item__date}>{date}</span>
    </div>
  );
};

interface SubscriptionData {
  title: string;
  type: string;
  amount: string;
  growth: string;
  growthRate: "positive" | "negative";
}

interface SubscriptionProps extends SubscriptionData {
  redeem: () => void;
}

const SubscriptionItem: React.FC<SubscriptionProps> = ({
  title,
  type,
  amount,
  growth,
  growthRate,
  redeem,
}) => {
  return (
    <div className={styles.table__item}>
      <span className={styles.table__item__descrip}>
        <img src={plantImg} alt="" />
        <p>{title}</p>
      </span>
      <span className={styles.table__item__type}>{type}</span>
      <span className={styles.table__item__amount}>{amount}</span>
      <span className={styles.table__item__growth}>
        <span className={styles[growthRate]}>{growth}</span>
      </span>
      <span className={styles.table__item__redeem}>
        <button onClick={redeem}>Redeem</button>
      </span>
    </div>
  );
};

const Chart = ({ investment }) => {
  const colors =
    investment > 0 ? ["#7F56D9", "#9E77ED", "#B692F6", "#F4EBFF"] : ["#f0f0f2"];
  const chartData: ChartData<"doughnut"> = {
    datasets: [
      {
        data: investment > 0 ? [25, 35, 30, 10] : [100],
        backgroundColor: colors,
        hoverBackgroundColor: colors,
        borderColor: colors,
        hoverBorderColor: colors,
        hoverOffset: 0,
        borderAlign: "inner",
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "50%",
    animation: {
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const config = {
    type: "doughnut",
    data: chartData,
    options: options,
  };

  return (
    <>
      <div className={styles.chart}>
        <Doughnut {...config} />
      </div>
    </>
  );
};

export { PortfolioUI };
