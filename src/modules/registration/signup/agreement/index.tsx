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
import { useEffect } from "react";

const titleOptions: OptionType[] = [
  {
    label: "Mr",
    value: "Mr",
  },
  {
    label: "Mrs",
    value: "Mrs",
  },
  {
    label: "Miss",
    value: "Miss",
  },
  {
    label: "Dr",
    value: "Dr",
  },
  {
    label: "Hon",
    value: "Hon",
  },
  {
    label: "Chief",
    value: "Chief",
  },
];

interface AgreementFormData {
  title: OptionType;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  acceptConditions: boolean;
}

const initAgreementFormData: AgreementFormData = {
  title: initOptionType,
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  acceptConditions: false,
};

const schema = yup
  .object({
    email: yup.string().email("Enter a valid email").required("Required"),
    title: optionTypeSchemaReq,
    firstName: yup.string().required("Required"),
    middleName: yup.string(),
    lastName: yup.string().required("Required"),
    acceptConditions: yup
      .boolean()
      .required("The terms and conditions must be accepted.")
      .oneOf([true], "The terms and conditions must be accepted."),
  })
  .required();

interface AgreementFormProps {
  submit: (data: AgreementFormData) => void;
}

const AgreementForm: React.FC<AgreementFormProps> = ({ submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<AgreementFormData>({
    resolver: yupResolver(schema),
    defaultValues: initAgreementFormData,
  });

  useEffect(() => {
    const storageData = localStorage.getItem("signupAgreement");
    if (storageData) {
      const data = JSON.parse(storageData);
      reset(data);
    }
  }, []);

  const onSubmit: SubmitHandler<AgreementFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <Select
          label="Title"
          placeholder="Select title"
          required
          validatorMessage={errors.title?.value?.message?.toString()}
          value={watch("title")}
          onChange={(val) => setValue("title", val)}
          options={titleOptions}
        />
        <Input
          label="First name"
          placeholder="Enter your first name"
          type="text"
          required
          validatorMessage={errors.firstName?.message}
          name="firstName"
          register={register}
          value={watch("firstName")}
        />
        <Input
          label="Middle name (optional)"
          placeholder="Enter your middle name"
          type="text"
          required
          validatorMessage={errors.middleName?.message}
          name="middleName"
          register={register}
          value={watch("middleName")}
        />
        <Input
          label="Last name"
          placeholder="Enter your last name"
          type="text"
          required
          validatorMessage={errors.lastName?.message}
          name="lastName"
          register={register}
          value={watch("lastName")}
        />
        <Input
          label="Email"
          placeholder="yourname@email.com"
          type="email"
          required
          validatorMessage={errors.email?.message}
          name="email"
          register={register}
          value={watch("email")}
        />
        <div className={styles.check}>
          <label>
            <input
              type="checkbox"
              required
              name="acceptConditions"
              checked={watch("acceptConditions")}
              onChange={() =>
                setValue("acceptConditions", !watch("acceptConditions"))
              }
            />
            <p>
              By clicking here, you agree to our <a>Terms & Condition</a> |{" "}
              <a>Privacy Policy</a>
            </p>
          </label>
          <p>{errors.acceptConditions?.message}</p>
        </div>
      </form>
      <section className={styles.btnWrap}>
        <div>
          <Button onClick={handleSubmit(onSubmit)} variant="fill-black">
            Continue <Chevron />
          </Button>
        </div>
      </section>
    </>
  );
};

export { AgreementForm };
