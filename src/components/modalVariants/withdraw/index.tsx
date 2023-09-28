import { Button, Input, Modal } from "components";
import styles from "./styles.module.scss";
import {
  AlertCircleIcon,
  BankIcon,
  CardIcon,
  CardsIcon,
  CloseIcon,
  CopyIcon,
  SendIcon,
} from "assets";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";

interface WithdrawData {
  amount: string;
}

const initWithdrawData: WithdrawData = {
  amount: "",
};

const schema = yup
  .object({
    amount: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
  })
  .required();

const Withdraw = ({ show, close, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<WithdrawData>({
    resolver: yupResolver(schema),
    defaultValues: initWithdrawData,
  });

  const onSubmit: SubmitHandler<WithdrawData> = (data) => {
    submit(data.amount);

    const transactions: any[] = JSON.parse(
      localStorage.getItem("transactions") ?? ""
    );

    const transaction = {
      type: "withdrawal",
      amount: data.amount,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      reference: new Date().toLocaleTimeString().split(":").join(""),
    };

    transactions.unshift(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions))

    const prevBalance = parseFloat(localStorage.getItem("walletBalance") ?? "0") 
    localStorage.setItem("walletBalance", `${prevBalance - parseFloat(data.amount)}`);
  };

  return (
    <>
      <Modal
        contentClassName={styles.modal}
        show={show}
        close={close}
        position="centered"
      >
        <div className={styles.heading}>
          <p>Withdraw</p> <CloseIcon role="button" onClick={close} />
        </div>
        <p className={styles.subtxt}>Send money to your bank account</p>
        <hr className={styles.hr} />
        <section className={styles.bankInfoWrap}>
          <div className={styles.bankInfo}>
            <p>Account name</p>
            <p>
              Corronation Microfinance Bank <CopyIcon />
            </p>
          </div>

          <div className={styles.bankInfo}>
            <p>Account number</p>
            <p>
              8999373490 <CopyIcon />{" "}
            </p>
          </div>

          <div className={styles.bankInfo}>
            <p>Bank name</p>
            <p>Coronation</p>
          </div>
        </section>

        <form className={styles.form}>
          <Input
            label="Amount to withdraw"
            placeholder="0.00"
            type="number"
            required
            validatorMessage={errors.amount?.message}
            name="amount"
            register={register}
            value={watch("amount")}
          />
        </form>
        <section className={styles.btnSec}>
          <Button
            disabled={watch("amount") === ""}
            onClick={handleSubmit(onSubmit)}
            variant="fill-black"
          >
            Withdraw <CardIcon />
          </Button>
        </section>
      </Modal>
    </>
  );
};

export { Withdraw };
