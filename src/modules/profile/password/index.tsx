import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "components";
import { TickCircle } from "assets";
import { useEffect } from "react";

interface PasswordFormData {
  password: string;
  password1: string;
  password2: string;
}

const initPasswordFormData: PasswordFormData = {
  password: "",
  password1: "",
  password2: "",
};

const schema = yup
  .object({
    password: yup
      .string()
      .required("Required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[a-z]/, "Password should contain an lowercase character")
      .matches(/[0-9]/, "Password should contain at least one number"),
    password1: yup
      .string()
      .required("Required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[a-z]/, "Password should contain an lowercase character")
      .matches(/[0-9]/, "Password should contain at least one number"),
    password2: yup
      .string()
      .oneOf([yup.ref("password1")], "Passwords must match")
      .required("Required"),
  })
  .required();

interface PasswordFormProps {
  submit: (data: PasswordFormData) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(schema),
    defaultValues: initPasswordFormData,
  });

  const onSubmit: SubmitHandler<PasswordFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <Input
          label="Current password"
          placeholder="Enter your current password "
          type="password"
          required
          validatorMessage={errors.password?.message}
          name="password"
          register={register}
          value={watch("password")}
        />
        <Input
          label="New password"
          placeholder="Enter your new password "
          type="password"
          required
          validatorMessage={errors.password1?.message}
          name="password1"
          register={register}
          value={watch("password1")}
        />
        <Input
          label="Re-enter new password"
          placeholder="Re-enter your new password"
          type="password"
          required
          validatorMessage={errors.password2?.message}
          name="password2"
          register={register}
          value={watch("password2")}
        />
      </form>
      <section className={styles.btnWrap}>
        <div>
          <Button
            disabled={
              watch("password") === "" ||
              watch("password1") === "" ||
              watch("password2") === ""
            }
            onClick={handleSubmit(onSubmit)}
            variant="fill-black"
          >
            Save <TickCircle />
          </Button>
        </div>
      </section>
    </>
  );
};

export { PasswordForm };
