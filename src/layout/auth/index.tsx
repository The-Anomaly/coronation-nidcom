import { logo } from "assets";
import styles from "./styles.module.scss";
import { Button } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.bg}>
        <header className={styles.header}>
          <img className={styles.header__logo} src={logo} alt="logo" />

          <div className={styles.header__btns}>
            <Button onClick={() => navigate(Routes.login)} variant={"outline"}>
              Login
            </Button>
            <Button
              onClick={() => navigate(Routes.home)}
              variant={"fill-black"}
            >
              Signup
            </Button>
          </div>
        </header>
      </section>
      {children}
    </>
  );
};

export { AuthLayout };
