import { useClickOutside } from "hooks";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { CloseIcon, TickCircle2 } from "assets";

const Toast = ({ show, close }) => {
  const toastRef = useRef(null);
  useClickOutside(toastRef, close);

  useEffect(() => {
    show &&
      setTimeout(() => {
        close();
      }, 1500);
  }, [show]);

  if (!show) return null;
  return (
    <>
      <aside className={styles.shadow}>
        <div ref={toastRef} className={styles.toast}>
          <TickCircle2 />{" "}
          <div>
            <p className={styles.ttl}>Top up was successful</p>
            <p className={styles.txt}>Your wallet was credited!</p>
          </div>
          <CloseIcon className={styles.close} role="button" onClick={close} />
        </div>
      </aside>
    </>
  );
};

export { Toast };
