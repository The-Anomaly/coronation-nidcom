import { Modal } from "components/modal";
import styles from "./styles.module.scss";
import { CloseIcon, plantImg } from "assets";
import { Button, FormatMoney } from "components";

const RedeemInvestment = ({ show, close, redeem }) => {
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
      <section className={styles.sec3}>
        <div>
          <p>Investment amount</p>
          <p>
            <FormatMoney amount={20072} />{" "}
          </p>
        </div>
        <p className={styles.note}>
          0.5 for pre-maturity withdrawal applies on income earned
        </p>
      </section>
      <section className={styles.sec2}>
        <div>
          <p>Risk level</p>
          <p>Low</p>
        </div>
        <div>
          <p>Minimum deposit</p>
          <p>
            <FormatMoney amount={10000} />
          </p>
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
      <p className={styles.note}>
        Please not that the above estimate is based on historical performance in
        the past 12 months. Actual returns may be higher or lower based on the
        market performance
      </p>
      <section className={styles.btnSec}>
        <Button onClick={redeem} variant="fill-black">
          Redeem investment
        </Button>
      </section>
    </Modal>
  );
};

export { RedeemInvestment };
