import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "components";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { Chevron } from "assets";

interface ForgotPasswordData {
  email: string;
}

const initForgotPasswordData: ForgotPasswordData = {
  email: "",
};

const schema = yup
  .object({
    email: yup.string().email("Enter a valid email").required("Required"),
  })
  .required();

interface ForgotPasswordProps {
  submit: (data: ForgotPasswordData) => void;
}

const ForgotPasswordUI: React.FC<ForgotPasswordProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordData>({
    resolver: yupResolver(schema),
    defaultValues: initForgotPasswordData,
  });

  const onSubmit: SubmitHandler<ForgotPasswordData> = (data) => {
    submit(data);
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.ttl}>Forgot password?</h1>
        <p className={styles.txt}>
          Enter the email associated with your account
        </p>
        <form className={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
            validatorMessage={errors.email?.message}
            name="email"
            register={register}
            value={watch("email")}
          />

          <Button
            className={styles.btn}
            onClick={handleSubmit(onSubmit)}
            variant="fill-black"
          >
            Reset password
          </Button>
          <p className={styles.link}>
            <Chevron /> Go back to <Link to={Routes.login}>Log in</Link>
          </p>
        </form>
        <footer className={styles.footerWrap}>
          <section className={styles.footer}>
            <p>2023 All rights reserved. Coronation</p>

            <div>
              <a>Terms & Conditions</a>
              <a>Privacy Policy</a>
            </div>
          </section>
        </footer>
      </main>
    </>
  );
};

export { ForgotPasswordUI };
