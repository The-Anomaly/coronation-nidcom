import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import styles from "./styles.module.scss";

interface InputProps {
  name?: string;
  dataTestID?: string;
  placeholder: string;
  className?: string;
  parentClassName?: string;
  validatorMessage: string | undefined;
  label?: string;
  onChange: ({
    code,
    number,
    value,
  }: {
    code: string;
    number: string;
    value: string;
  }) => void;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showRequired?: boolean;
  disabled?: boolean;
  required?: boolean;
}

const CustomPhoneInput: React.FC<InputProps> = ({
  dataTestID,
  placeholder,
  className,
  parentClassName,
  validatorMessage,
  label,
  onChange,
  value,
  onKeyDown,
  showRequired,
  disabled,
  name,
  required,
}) => {
  return (
    <>
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

        <PhoneInput
          country="ng"
          placeholder={placeholder}
          inputClass={`${styles.input} ${className}`}
          inputProps={{
            name,
            required: required,
          }}
          onChange={(value, country: any, e, formattedValue) => {
            const num = formattedValue.split(" ");
            num.splice(0, 1);

            onChange({
              code: `+${country?.dialCode}`,
              number: num.join(""),
              value: formattedValue,
            });
          }}
          value={value}
          disabled={disabled}
          onKeyDown={onKeyDown}
        />

        {validatorMessage && (
          <small className={styles.message}>{validatorMessage}</small>
        )}
      </div>
    </>
  );
};
export { CustomPhoneInput };
