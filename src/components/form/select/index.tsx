import * as React from "react";
import styles from "./styles.module.scss";
import { useClickOutside } from "hooks";
import { Chevron } from "assets";
import * as yup from "yup";

export interface OptionType {
  label: string;
  value: any;
}

export const initOptionType: OptionType = {
  label: "",
  value: "",
};

export const optionTypeSchemaReq = yup
  .object({
    label: yup.string().required("Required"),
    value: yup.string().required("Required"),
  })
  .required();

export const optionTypeSchema = yup
  .object({
    label: yup.string(),
    value: yup.string(),
  })
  .required();

interface SelectProps {
  dataTestID?: string;
  placeholder: string;
  className?: string;
  parentClassName?: string;
  validatorMessage: string | undefined;
  label?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  iconFunction?: () => void;
  showRequired?: boolean;
  options: OptionType[];
  value: OptionType;
  onChange: (val: OptionType) => void;
  required?: boolean;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = (props) => {
  const {
    dataTestID,
    parentClassName,
    validatorMessage,
    label,
    showRequired,
    options,
    value,
    placeholder,
    onChange,
    className,
    required,
    disabled,
  } = props;

  const [show, setList] = React.useState(false);
  const [state, setState] = React.useState("");

  React.useEffect(() => {
    setState(value.label);
  }, [value]);

  const dropdownRef = React.useRef(null);
  useClickOutside(dropdownRef, () => setList(false));

  const filteredOptions = options.filter((item) =>
    item.label.trim().toLowerCase().includes(state.trim().toLowerCase())
  );
  // .filter((value) => !watch("tags").some((item) => item === value));

  return (
    <div
      ref={dropdownRef}
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
      <div
        onClick={() => setList((prev) => (!disabled ? !prev : false))}
        className={`${className} ${styles.input} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <input
          onChange={(e) => setState(e.target.value)}
          value={state}
          className={value.value === "" ? styles.placeholder : ""}
          placeholder={placeholder}
          disabled={disabled}
        />

        <Chevron role={disabled ? "" : "button"} />
      </div>
      {show ? (
        <div className={styles.optionsList}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onChange(item);
                  setList(false);
                  setState(item.label);
                }}
              >
                {item.label}
              </button>
            ))
          ) : (
            <div className={styles.optionsList__noOptions}>No options</div>
          )}
        </div>
      ) : (
        ""
      )}

      {validatorMessage && (
        <small className={styles.message}>{validatorMessage}</small>
      )}
    </div>
  );
};

export { Select };
