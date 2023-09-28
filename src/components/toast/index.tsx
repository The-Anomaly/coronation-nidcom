import { useClickOutside } from "hooks";
import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { AlertCircleIcon, CloseIcon, TickCircle2 } from "assets";

export interface ToastData {
  show: boolean;
  title: string;
  text: string;
  type: "error" | "success";
}

export interface ToastProps extends ToastData {
  close: () => void;
}

const Toast: React.FC<ToastProps> = ({ show, close, text, title, type }) => {
  const toastRef = useRef(null);
  useClickOutside(toastRef, close);

  useEffect(() => {
    show &&
      setTimeout(() => {
        close();
      }, 2000);
  }, [show]);

  if (!show) return null;
  return (
    <>
      <aside className={styles.shadow}>
        <div ref={toastRef} className={`${styles.toast} ${styles[type]}`}>
          {type === "success" ? <TickCircle2 /> : <AlertCircleIcon />}
          <div>
            <p className={styles.ttl}>{title}</p>
            <p className={styles.txt}>{text}</p>
          </div>
          <CloseIcon className={styles.close} role="button" onClick={close} />
        </div>
      </aside>
    </>
  );
};

export { Toast };
