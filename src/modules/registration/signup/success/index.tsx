import { successImg } from "assets";
import styles from "./styles.module.scss";

const SignupSuccess = () => {
  return (
    <>
      <section className={styles.section} >
        <h2 className={styles.section__ttl} >Signed up successfully</h2>
        <img className={styles.section__img} src={successImg} alt="email" />
        <p className={styles.section__txt} >
          A welcome message has been sent to your email, please click the link
          to activate your account.
        </p>

        <p className={styles.section__txt2} >
          Didn't receive any email yet? <span role="button">Resend</span>
        </p>
      </section>
    </>
  );
};

export { SignupSuccess };
