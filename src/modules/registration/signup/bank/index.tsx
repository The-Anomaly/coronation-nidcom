import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Input,
  OptionType,
  Select,
  initOptionType,
  optionTypeSchemaReq,
} from "components";
import { Chevron } from "assets";
import { accountCurrencyOptions, accountTypeOptions } from "./options";
import { useEffect } from "react";

interface BankFormData {
  swiftCode: string;
  bankName: string;
  accountNo: string;
  branchNo: string;
  branchName: string;
  accountName: string;
  accountType: OptionType;
  accountCurrency: OptionType;
  routingNumber: string;
  branchAddress: string;
}

const initBankFormData: BankFormData = {
  swiftCode: "",
  bankName: "",
  branchAddress: "",
  branchName: "",
  branchNo: "",
  accountCurrency: initOptionType,
  accountNo: "",
  accountType: initOptionType,
  accountName: "",
  routingNumber: "",
};

const schema = yup
  .object({
    accountCurrency: optionTypeSchemaReq,
    accountType: optionTypeSchemaReq,
    swiftCode: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
    branchName: yup.string().required("Required"),
    bankName: yup.string().required("Required"),
    branchAddress: yup.string().required("Required"),
    branchNo: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
    accountNo: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
    accountName: yup.string().required("Required"),
    routingNumber: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
  })
  .required();

interface BankFormProps {
  submit: (data: BankFormData) => void;
  previous: () => void;
}

const BankForm: React.FC<BankFormProps> = ({ submit, previous }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BankFormData>({
    resolver: yupResolver(schema),
    defaultValues: initBankFormData,
  });

  useEffect(() => {
    const storageData = localStorage.getItem("signupBankInfo");
    if (storageData) {
      const data = JSON.parse(storageData);
      reset(data);
    }
  }, []);

  const onSubmit: SubmitHandler<BankFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <Input
          label="SWIFT code"
          placeholder="Enter SWIFT code"
          type="number"
          required
          validatorMessage={errors.swiftCode?.message}
          name="swiftCode"
          register={register}
          value={watch("swiftCode")}
        />
        <Input
          label="Bank name"
          placeholder="Enter bank name"
          type="text"
          required
          validatorMessage={errors.bankName?.message}
          name="bankName"
          register={register}
          value={watch("bankName")}
        />
        <Input
          label="Account/IBAN number"
          placeholder="Enter account/IBAN number"
          type="number"
          required
          validatorMessage={errors.accountNo?.message}
          name="accountNo"
          register={register}
          value={watch("accountNo")}
        />

        <Input
          label="Branch number"
          placeholder="Enter branch number"
          type="number"
          required
          validatorMessage={errors.branchNo?.message}
          name="branchNo"
          register={register}
          value={watch("branchNo")}
          parentClassName={styles.halfInput}
        />
        <Input
          label="Branch name"
          placeholder="Enter branch name"
          type="text"
          required
          validatorMessage={errors.branchName?.message}
          name="branchName"
          register={register}
          value={watch("branchName")}
          parentClassName={styles.halfInput}
        />
        <Input
          label="Account name"
          placeholder="Enter account name"
          type="text"
          required
          validatorMessage={errors.accountName?.message}
          name="accountName"
          register={register}
          value={watch("accountName")}
          parentClassName={styles.halfInput}
        />

        <Select
          label="Account type"
          placeholder="Select country"
          required
          validatorMessage={errors.accountType?.value?.message?.toString()}
          value={watch("accountType")}
          onChange={(val) => setValue("accountType", val)}
          options={accountTypeOptions}
          parentClassName={styles.halfInput}
        />
        <Select
          label="Account currency"
          placeholder="Select country"
          required
          validatorMessage={errors.accountCurrency?.value?.message?.toString()}
          value={watch("accountCurrency")}
          onChange={(val) => setValue("accountCurrency", val)}
          options={accountCurrencyOptions}
          parentClassName={styles.halfInput}
        />
        <Input
          label="Routing number"
          placeholder="Enter Routing number"
          type="text"
          required
          validatorMessage={errors.routingNumber?.message}
          name="routingNumber"
          register={register}
          value={watch("routingNumber")}
          parentClassName={styles.halfInput}
        />
        <Input
          label="Branch address"
          placeholder="Enter branch address"
          type="text"
          required
          validatorMessage={errors.branchAddress?.message}
          name="branchAddress"
          register={register}
          value={watch("branchAddress")}
        />
      </form>
      <section className={styles.btnWrap}>
        <div>
          <Button
            className={styles.previous}
            onClick={previous}
            variant="outline"
          >
            <Chevron /> Previous
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="fill-black">
            Continue <Chevron />
          </Button>
        </div>
      </section>
    </>
  );
};

export { BankForm };
