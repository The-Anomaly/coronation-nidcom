import { useState } from "react";
import styles from "./styles.module.scss";
import {
  comingSoonImg,
  moneyImg,
  paymentImg,
  plantImg,
  wheelImg,
} from "assets";
import { Button } from "components";

const ProductsUI = () => {
  const [active, setActive] = useState(0);

  const tabs = [
    {
      text: "Asset management",
    },
    {
      text: "Private banking",
    },
    {
      text: "Securities trading & brokerage",
    },
  ];

  const products = [
    {
      title: "Asset management",
      text: "At Coronation Asset Management we offer investment capabilities across traditional and alternative asset classes in line with our customers needs and risk appetites for both our institutional and individual customers",
      color: "#039855",
      bg: "#d1fadf",
      image: moneyImg,
    },
    {
      title: "Private banking",
      text: "We support a wide range of public and private companies and governmental institutions by offering our best-in-class strategic/financial advisory capabilities, corporate structuring and restructuring expertise, debt and equity capital market solutions as well as innovative project and structured financing advisory competencies. ",
      color: "#FD853A",
      bg: "#FFF6ED",
      image: wheelImg,
    },
    {
      title: "Securities trading & brokerage",
      text: "Make securities trading decisions backed by the insights of the Coronation research and investment team. Lorem ipsum dolor sit amet consectetur. Dolor eget ac dictumst elementum cras amet eget.",
      color: "#4A1FB8",
      bg: "#EBE9FE",
      image: paymentImg,
    },
  ];
  return (
    <>
      <nav className={styles.nav}>
        {tabs.map((tab, index) => (
          <span
            className={active === index ? styles.active : ""}
            role="button"
            onClick={() => setActive(index)}
          >
            {tab.text}
          </span>
        ))}
      </nav>
      <section></section>
      {products.map(({ text, title, image, color, bg }, index) =>
        active === index ? (
          <section
            style={{ borderColor: color, backgroundColor: bg }}
            className={styles.productOverview}
          >
            <div>
              <p className={styles.productOverview__ttl}>{title}</p>
              <p className={styles.productOverview__txt}>{text}</p>
              <button style={{ color }}>Learn more</button>
            </div>
            <img className={styles.productOverview__img} src={image} alt="" />
          </section>
        ) : (
          ""
        )
      )}

      {active === 0 ? (
        <section className={styles.investments} >
         <InvestmentCard />
         <InvestmentCard />
         <InvestmentCard />
         <InvestmentCard />
         <InvestmentCard />
         <InvestmentCard />
         <InvestmentCard />
         <InvestmentCard />
        </section>
      ) : (
        <section className={styles.comingSoon}>
          <img src={comingSoonImg} alt="coming soon" />
          <p className={styles.comingSoon__ttl}>Still working on it</p>
          <p className={styles.comingSoon__txt}>
            We are working hard to bring you the best products and give you
            varieties
          </p>
        </section>
      )}
    </>
  );
};
const InvestmentCard = () => {
  return (
    <div className={styles.investmentCard}>
      <img src={plantImg} alt="growing plant" />
      <div className={styles.investmentCard__content}>
        <div>
          <div>
            <p className={styles.investmentCard__ttl}>CORONATION</p>
            <p className={styles.investmentCard__tag}>Money Market Fund</p>
          </div>
          <div>
            <p className={styles.investmentCard__rate}>10.44 %</p>
            <p className={styles.investmentCard__tag}>Estimated Yield</p>
          </div>
        </div>
        <Button variant="outline-black">Subscribe</Button>
      </div>
    </div>
  );
};

export { ProductsUI };
