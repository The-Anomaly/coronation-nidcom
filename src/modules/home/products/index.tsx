import { Button } from "components";
import styles from "./styles.module.scss";
import {
    ArrowCurved,
  Highlight,
  Highlight2,
  product1Img,
  product2Img,
  product3Img,
} from "assets";

const Products = ({getStarted}) => {
  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.section__ttl}>Our products</h2>
        <p className={styles.section__txt}>
          We offer superior customer service, innovative product solutions,
          excellent financial advice to help grow your business and achieve your
          goals. Let’s be your prosperity partner today.
        </p>

        <Product
          title="Asset managemt"
          text={`At Coronation Asset Management we offer investment capabilities across
          traditional and alternative asset classes in line with our customers
          needs and risk appetites for both our institutional and individual
          customers`}
          image={product1Img}
          highlight={<Highlight />}
          onClick={getStarted}
          className={styles.product1}
        />
        <Product
          title="Private banking"
          text={`We support a wide range of public and private companies and governmental institutions by offering our best-in-class strategic/financial advisory capabilities, corporate structuring and restructuring expertise, debt and equity capital market solutions as well as innovative project and structured financing advisory competencies.`}
          image={product2Img}
          highlight={<ArrowCurved />}
          onClick={getStarted}
          className={styles.product2}
        />
        <Product
          title="Securities trading & brokerage"
          text={`Make securities trading decisions backed by the insights of the Coronation research and investment team. Lorem ipsum dolor sit amet consectetur. Dolor eget ac dictumst elementum cras amet eget.`}
          image={product3Img}
          highlight={<Highlight2 />}
          onClick={getStarted}
          className={styles.product3}
        />
      </section>
    </>
  );
};

interface ProductData {
  title: string;
  text: string;
  highlight: JSX.Element;
  image: string;
}

interface ProductProps extends ProductData {
  onClick: () => void;
  className: string;
}

const Product = ({
  onClick,
  className,
  text,
  title,
  image,
  highlight,
}: ProductProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.card__content}>
        <h3 className={styles.card__content__ttl}>
          {title}
          {highlight}
        </h3>
        <p className={styles.card__content__txt}>{text}</p>

        <Button
          className={styles.card__content__btn}
          onClick={onClick}
          variant={"fill-black"}
        >
          Start Investing
        </Button>
      </div>
      <div className={styles.card__imgSec}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export { Products };
