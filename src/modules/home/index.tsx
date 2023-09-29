import { Hero } from "./hero";
import { Products } from "./products";
import styles from "./styles.module.scss";

const HomeUI = ({ getStarted }) => {
  return (
    <>
      <main>
        <Hero getStarted={getStarted} />
        <Products getStarted={getStarted} />
      </main>
    </>
  );
};

export { HomeUI };
