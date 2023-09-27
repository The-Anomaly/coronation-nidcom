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

interface PasswordFormData {
  username: string;
  password1: string;
  password2: string;
}

const initPasswordFormData: PasswordFormData = {
  username: "",
  password1: "",
  password2: "",
};

const schema = yup
  .object({
    username: yup.string().required("Required"),
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
  previous: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ submit, previous }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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
          label="Username"
          placeholder="Enter a unique username"
          type="text"
          required
          validatorMessage={errors.username?.message}
          name="username"
          register={register}
          value={watch("username")}
        />
        <Input
          label="Password"
          placeholder="Enter your password "
          type="password"
          required
          validatorMessage={errors.password1?.message}
          name="password1"
          register={register}
          value={watch("password1")}
        />
        <Input
          label="Re-enter password"
          placeholder="Re-enter password"
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

export { PasswordForm };
