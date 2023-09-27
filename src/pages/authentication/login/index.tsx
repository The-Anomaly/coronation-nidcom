import { LoginUI } from "modules";
import styles from "./styles.module.scss";

const Login = () => {
  return (
    <>
      <LoginUI submit={console.log} />
    </>
  );
};

export { Login };
