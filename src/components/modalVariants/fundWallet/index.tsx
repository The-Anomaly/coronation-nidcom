import { Button, Input, Modal } from "components";
import styles from "./styles.module.scss";
import {
  AlertCircleIcon,
  BankIcon,
  CardsIcon,
  CloseIcon,
  CopyIcon,
  SendIcon,
} from "assets";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";

interface FundWalletData {
  amount: string;
  cardNo: string;
  cvv: string;
  expiry: string;
}

const initFundWalletData: FundWalletData = {
  amount: "",
  cardNo: "",
  cvv: "",
  expiry: "",
};

const schema = yup
  .object({
    cardNo: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
    amount: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
    cvv: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Only digits are allowed"),
    expiry: yup.string().required("Required"),
  })
  .required();

const FundWallet = ({ show, close, submit }) => {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      text: "Fund with card",
      icon: <CardsIcon />,
    },
    {
      text: "Top up with bank transfer",
      icon: <BankIcon />,
    },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FundWalletData>({
    resolver: yupResolver(schema),
    defaultValues: initFundWalletData,
  });

  const onSubmit: SubmitHandler<FundWalletData> = (data) => {
    submit(data);

    const transactions: any[] = JSON.parse(
      localStorage.getItem("transactions") ?? ""
    );

    const transaction = {
      type: "deposit",
      amount: data.amount,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      reference: new Date().toLocaleTimeString().split(":").join(""),
    };

    transactions.unshift(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    const prevBalance = parseFloat(
      localStorage.getItem("walletBalance") ?? "0"
    );
    localStorage.setItem(
      "walletBalance",
      `${prevBalance + parseFloat(data.amount)}`
    );
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
          <p>Fund wallet</p> <CloseIcon role="button" onClick={close} />
        </div>
        <p className={styles.subtxt}>
          Select your preferred way to top up your wallet balance.
        </p>

        <nav className={styles.nav}>
          {tabs.map(({ icon, text }, index) => (
            <span
              role="button"
              onClick={() => setActive(index)}
              className={active === index ? styles.active : ""}
              key={text}
            >
              {icon} {text}
            </span>
          ))}
        </nav>

        {active === 0 ? (
          <>
            <form className={styles.form}>
              <Input
                label="Amount"
                placeholder="0.00"
                type="number"
                required
                validatorMessage={errors.amount?.message}
                name="amount"
                register={register}
                value={watch("amount")}
              />
              <Input
                label="Card number"
                placeholder="0000 0000 0000 0000"
                type="number"
                required
                validatorMessage={errors.cardNo?.message}
                name="cardNo"
                register={register}
                value={watch("cardNo")}
              />
              <Input
                label="Expiry date"
                placeholder=""
                type="date"
                required
                validatorMessage={errors.expiry?.message}
                name="expiry"
                register={register}
                value={watch("expiry")}
                parentClassName={styles.halfInput}
              />
              <Input
                label="CVV"
                placeholder="Enter CVV"
                type="number"
                required
                validatorMessage={errors.cvv?.message}
                name="cvv"
                register={register}
                value={watch("cvv")}
                hint={"Number behind your card"}
                parentClassName={styles.halfInput}
              />
            </form>
            <section className={styles.btnSec}>
              <Button onClick={handleSubmit(onSubmit)} variant="fill-black">
                Fund <SendIcon />
              </Button>
            </section>
          </>
        ) : (
          <section>
            <section className={styles.insufficient}>
              <AlertCircleIcon />
              <div>
                <p>Charges you may incur</p>
                <p>
                  You will be charged a small processing fee for the instant
                  transfer. Minimum fee charged NGN50, Maximum fee charged
                  (NGN100).
                </p>
              </div>
            </section>

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
        )}
      </Modal>
    </>
  );
};

export { FundWallet };
