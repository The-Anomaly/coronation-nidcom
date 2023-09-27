import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "components";
import { Link } from "react-router-dom";
import { Routes } from "router";

interface LoginData {
  email: string;
  password: string;
}

const initLoginData: LoginData = {
  email: "",
  password: "",
};

const schema = yup
  .object({
    email: yup.string().email("Enter a valid email").required("Required"),
    password: yup.string().required("Required"),
  })
  .required();

interface LoginProps {
  submit: (data: LoginData) => void;
}

const LoginUI: React.FC<LoginProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    defaultValues: initLoginData,
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    submit(data);
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.ttl}>Login to your Account</h1>
        <p className={styles.txt}>Welcome back👋🏾, Please enter your details</p>
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
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
            validatorMessage={errors.password?.message}
            name="password"
            register={register}
            value={watch("password")}
          />
          <Link className={styles.forgot} to={Routes.forgotPassword}>
            Forgot Password
          </Link>
          <Button
            className={styles.btn}
            onClick={handleSubmit(onSubmit)}
            variant="fill-black"
          >
            Log In
          </Button>
          <p className={styles.link}>
            Don’t have an Account? <Link to={Routes.home}>Sign up</Link>.
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

export { LoginUI };
