import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styles from "./styles.module.scss";

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: "fill-black" | "outline" | "fill-white" | "outline-black"
}

const Button = (props: ButtonProps) => {
  const { onClick, variant, children, className } = props;
  return (
    <>
      <button
        {...props}
        className={`${className} ${styles.btn} ${styles[`btn__${variant}`]}`}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick(e);
        }}
      >
        {children}
      </button>
    </>
  );
};

export { Button };
