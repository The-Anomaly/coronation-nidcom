import { AppleStore, GooglePlay, logo } from "assets";
import styles from "./styles.module.scss";
import { Button } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const AuthLayout = ({ children, isHome }) => {
  const navigate = useNavigate();
  return (
    <>
      <section className={`${styles.bg} ${isHome ? styles.bg2 : ""}`}>
        <header className={styles.header}>
          <img
            role="link"
            onClick={() => navigate(Routes.home)}
            className={styles.header__logo}
            src={logo}
            alt="logo"
          />
          <div className={styles.header__btns}>
            <Button onClick={() => navigate(Routes.login)} variant={"outline"}>
              Login
            </Button>
            <Button
              onClick={() => navigate(Routes.signup)}
              variant={"fill-black"}
            >
              Signup
            </Button>
          </div>
        </header>
      </section>
      {children}
      {isHome ? (
        <section className={styles.footerBg}>
          <footer className={styles.footer}>
            <div className={styles.footer__body}>
              <div className={styles.footer__body__sec1}>
                <img src={logo} alt="logo" />
                <div>
                  <span>Home</span>
                  <span>Products</span>
                  <span>About us</span>
                  <span>Contact us</span>
                  <span>FAQs</span>
                </div>
              </div>
              <div className={styles.footer__body__sec2}>
                <p>Get Wealth by Coronation</p>
                <div>
                  <a>
                    <AppleStore />
                  </a>
                  <a>
                    <GooglePlay />{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.copyright}>
              <p>© 2023 Coronation. All rights reserved.</p>
              <div>
                <a>Terms</a>
                <a>Privacy </a>
              </div>
            </div>
          </footer>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export { AuthLayout };
