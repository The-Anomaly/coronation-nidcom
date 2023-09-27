import * as React from "react";
import styles from "./styles.module.scss";
import { UseFormRegister } from "react-hook-form";

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  dataTestID?: string;
  placeholder: string;
  className?: string;
  parentClassName?: string;
  validatorMessage: string | undefined;
  label?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  iconFunction?: () => void;
  register: UseFormRegister<any>;
  showRequired?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    dataTestID,
    className,
    parentClassName,
    validatorMessage,
    label,
    Icon,
    iconClassName,
    iconFunction,
    register,
    showRequired,
    name = "",
    required,
    minLength,
    onChange,
    min
  } = props;
  return (
    <div
      className={`${styles.inputWrapper} ${parentClassName} ${
        validatorMessage ? styles.error : ""
      }`}
    >
      {label && (
        <label className={styles.label}>
          {label}
          {showRequired ? <span className={styles.req}>*</span> : ""}
        </label>
      )}
      {Icon ? (
        <Icon
          role={iconFunction ? "button" : "none"}
          onClick={iconFunction && iconFunction}
          className={`${iconClassName} ${styles.icon}`}
          id="icon"
        />
      ) : (
        ""
      )}
      <input
        {...props}
        data-testid={dataTestID}
        className={`${styles.input} ${className}`}
        {...register(name, {
          required: required,
          minLength: minLength,
          onChange: onChange,
          min: min
        })}
      />

      {validatorMessage && <small className={styles.message}>{validatorMessage}</small>}
    </div>
  );
};

interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  dataTestID?: string;
  placeholder: string;
  className?: string;
  parentClassName?: string;
  validatorMessage: string | undefined;
  label?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  iconFunction?: () => void;
  register: UseFormRegister<any>;
  showRequired?: boolean;
  max?: number;
  value?: string;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    dataTestID,
    className,
    parentClassName,
    name = "",
    required,
    validatorMessage,
    label,
    Icon,
    iconClassName,
    iconFunction,
    register,
    onChange,
    showRequired,
    max,
    value = ""
  } = props;
  return (
    <div
      className={`${styles.inputWrapper} ${parentClassName} ${
        validatorMessage ? styles.error : ""
      }`}
    >
      {label && (
        <label className={styles.label}>
          {label}
          {showRequired ? <span className={styles.req}>*</span> : ""}
        </label>
      )}
      {Icon ? (
        <Icon
          role={iconFunction ? "button" : "none"}
          onClick={iconFunction && iconFunction}
          className={`${iconClassName} ${styles.icon}`}
          id="icon"
        />
      ) : (
        ""
      )}
      <textarea
        {...props}
        data-testid={dataTestID}
        className={`${styles.textarea} ${className}`}
        {...register(name, {
          required: required,
          onChange: onChange,
          max: max
        })}
      />
      {max ? (
        <p className={styles.length}>
          {value.length}/{max}
        </p>
      ) : (
        ""
      )}
      {validatorMessage && <small className={styles.message}>{validatorMessage}</small>}
    </div>
  );
};

export { Input, Textarea };
