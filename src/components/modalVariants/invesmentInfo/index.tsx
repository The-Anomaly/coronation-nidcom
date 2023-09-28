import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { CloseIcon, plantImg } from "assets";
import { Button } from "components";

const InvestmentInfo = ({ show, close }) => {
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
      <section className={styles.sec2}>
        <div>
          <p>Risk level</p>
          <p>Low</p>
        </div>
        <div>
          <p>Minimum deposit</p>
          <p>₦ 10,000.00</p>
        </div>
        <div>
          <p>Tenure</p>
          <p>1 month</p>
        </div>
        <div>
          <p>Fund fact sheet</p>
          <p>
            <a>Download</a>
          </p>
        </div>
      </section>
      <section className={styles.about}>
        <p className={styles.about__ttl}>About this fund</p>
        <p className={styles.about__txt}>
          The Money Market Fund is an open-ended fund that invests in low risk
          short-term instruments such as Treasury Bills, Term Deposits,
          Commercial Papers and other Money Market securities. Our bottom-up
          credit selection and tactical trading in the most liquid instruments
          and fundamental process combined with robust, top-down rigorous risk
          management tools designed to meet our objectives of liquidity and
          consistent excess returns.
        </p>
        <a className={styles.about__link}>Learn more about this fund</a>
      </section>
      <section className={styles.btnSec} >
        <Button variant="fill-black">Continue</Button>
      </section>
    </Modal>
  );
};

export { InvestmentInfo };
