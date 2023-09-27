import styles from "./styles.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <>
      <header></header>
      {children}
    </>
  );
};

export { AuthLayout };
