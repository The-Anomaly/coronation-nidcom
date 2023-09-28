import { useClickOutside } from "hooks";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { CloseIcon } from "assets";

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
          <CloseIcon className={styles.close} role="button" onClick={close} />
          <p className={styles.ttl}>Top up was successful</p>
          <p className={styles.txt}>Your wallet was credited!</p>
        </div>
      </aside>
    </>
  );
};

export { Toast };
