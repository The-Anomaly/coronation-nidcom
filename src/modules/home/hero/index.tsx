import { Button } from "components";
import styles from "./styles.module.scss";
import { DashboardImg } from "assets";

const Hero = ({getStarted}) => {
  return (
    <>
      <section className={styles.bg}>
        <section className={styles.section}>
          <h1 className={styles.section__ttl}>
            Start investing today and build the future you want!
          </h1>
          <p className={styles.section__txt}>
            Lorem ipsum dolor sit amet consectetur. Dignissim facilisis bibendum
            interdum elit viverra. Lobortis blandit lobortis integer fermentum
            elit amet morbi. Sagittis praesent scelerisque enim tellus integer
            aliquet lorem sit consectetur. Sed lacus tincidunt auctor felis ac
            leo a.
          </p>
          <Button onClick={getStarted} className={styles.section__btn} variant={"fill-black"}>
            Get started
          </Button>
          <DashboardImg className={styles.section__img} />
        </section>
      </section>
    </>
  );
};

export { Hero };
