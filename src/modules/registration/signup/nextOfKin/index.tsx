import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  CustomPhoneInput,
  Input,
  OptionType,
  Select,
  initOptionType,
  optionTypeSchemaReq,
} from "components";
import { Chevron } from "assets";
import { employmentOptions, genderOptions } from "./options";

interface NextOfKinFormData {
  relationship: string;
  name: string;
  email: string;
  address: string;
  phone: { code: string; number: string; value: string };
}

const initNextOfKinFormData: NextOfKinFormData = {
  relationship: "",
  name: "",
  email: "",
  address: "",
  phone: { code: "", number: "", value: "" },
};

const schema = yup
  .object({
    relationship: yup.string().required("Required"),
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Enter a valid email"),
    address: yup.string().required("Required"),
    phone: yup.object({
      code: yup.string().required("Required"),
      number: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
  })
  .required();

interface NextOfKinFormProps {
  submit: (data: NextOfKinFormData) => void;
  previous: () => void;
}

const NextOfKinForm: React.FC<NextOfKinFormProps> = ({ submit, previous }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<NextOfKinFormData>({
    resolver: yupResolver(schema),
    defaultValues: initNextOfKinFormData,
  });

  const onSubmit: SubmitHandler<NextOfKinFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <Input
          label="Relationship"
          placeholder="Enter relationship with your next of kin"
          type="text"
          required
          validatorMessage={errors.relationship?.message}
          name="relationship"
          register={register}
          value={watch("relationship")}
        />
        <Input
          label="Name of next of kin"
          placeholder="Enter the name of your next of kin"
          type="text"
          required
          validatorMessage={errors.name?.message}
          name="name"
          register={register}
          value={watch("name")}
        />
        <CustomPhoneInput
          label="Mobile number"
          placeholder="Enter mobile number"
          validatorMessage={errors.phone?.message}
          name="phone"
          onChange={({ code, number, value }) =>
            setValue("phone", { code, number, value })
          }
          value={watch("phone.value")}
        />
        <Input
          label="Email of next of kin"
          placeholder="Enter email of your next of kin"
          type="email"
          required
          validatorMessage={errors.email?.message}
          name="email"
          register={register}
          value={watch("email")}
        />
        <Input
          label="Contact address of next of kin"
          placeholder="Enter address of your next of kin"
          type="text"
          required
          validatorMessage={errors.address?.message}
          name="address"
          register={register}
          value={watch("address")}
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

export { NextOfKinForm };
