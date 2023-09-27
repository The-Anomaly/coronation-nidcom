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

interface ProfileFormData {
  gender: OptionType;
  dateOfBirth: string;
  mothersMaidenName: string;
  country: OptionType;
  id: string;
  address: string;
  city: string;
  state: OptionType;
  zipCode: string;
  phone: { code: string; number: string; value: string };
  profession: string;
  employmentType: OptionType;
  companyName: string;
}

const initProfileFormData: ProfileFormData = {
  gender: initOptionType,
  dateOfBirth: "",
  country: initOptionType,
  id: "",
  address: "",
  city: "",
  state: initOptionType,
  zipCode: "",
  phone: { code: "", number: "", value: "" },
  profession: "",
  employmentType: initOptionType,
  companyName: "",
  mothersMaidenName: "",
};

const schema = yup
  .object({
    gender: optionTypeSchemaReq,
    country: optionTypeSchemaReq,
    state: optionTypeSchemaReq,
    employmentType: optionTypeSchemaReq,
    dateOfBirth: yup.string().required("Required"),
    id: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    zipCode: yup.string().required("Required"),
    phone: yup.object({
      code: yup.string().required("Required"),
      number: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
    profession: yup.string().required("Required"),
    mothersMaidenName: yup.string().required("Required"),
    companyName: yup.string().required("Required"),
  })
  .required();

interface ProfileFormProps {
  submit: (data: ProfileFormData) => void;
  previous: () => void;
  countries: { label: string; value: string; states: OptionType[] }[];
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  submit,
  previous,
  countries,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
    defaultValues: initProfileFormData,
  });

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <Select
          label="Gender"
          placeholder="Select gender"
          required
          validatorMessage={errors.gender?.value?.message?.toString()}
          value={watch("gender")}
          onChange={(val) => setValue("gender", val)}
          options={genderOptions}
        />
        <Input
          label="Date of birth"
          placeholder="Enter your first name"
          type="date"
          required
          validatorMessage={errors.dateOfBirth?.message}
          name="dateOfBirth"
          register={register}
          value={watch("dateOfBirth")}
          parentClassName={styles.halfInput}
        />
        <Input
          label="Mothers maiden name"
          placeholder="Maiden name"
          type="text"
          required
          validatorMessage={errors.mothersMaidenName?.message}
          name="mothersMaidenName"
          register={register}
          value={watch("mothersMaidenName")}
          parentClassName={styles.halfInput}
        />

        <Select
          label="Country of residence"
          placeholder="Select country"
          required
          validatorMessage={errors.country?.value?.message?.toString()}
          value={watch("country")}
          onChange={(val) => setValue("country", val)}
          options={countries.map(({ label, value }) => ({ label, value }))}
          parentClassName={styles.halfInput}
        />
        <Input
          label="ID"
          placeholder="SSN, NI number, SIN etc."
          type="text"
          required
          validatorMessage={errors.id?.message}
          name="id"
          register={register}
          value={watch("id")}
          parentClassName={styles.halfInput}
        />
        <Input
          label="Address"
          placeholder="Enter address"
          type="text"
          required
          validatorMessage={errors.address?.message}
          name="address"
          register={register}
          value={watch("address")}
          parentClassName={styles.halfInput}
        />
        <Input
          label="City"
          placeholder="Enter city"
          type="text"
          required
          validatorMessage={errors.city?.message}
          name="city"
          register={register}
          value={watch("city")}
          parentClassName={styles.halfInput}
        />
        <Select
          label="State"
          placeholder="Select state"
          required
          validatorMessage={errors.state?.value?.message?.toString()}
          value={watch("state")}
          onChange={(val) => setValue("state", val)}
          options={
            countries.find(
              ({ label, value }) => label === watch("country.label")
            )?.states ?? []
          }
          parentClassName={styles.halfInput}
        />
        <Input
          label="Zip Code"
          placeholder="Enter zip code"
          type="text"
          required
          validatorMessage={errors.zipCode?.message}
          name="zipCode"
          register={register}
          value={watch("zipCode")}
          parentClassName={styles.halfInput}
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
          parentClassName={styles.halfInput}
        />
        <Input
          label="Profession"
          placeholder="Job title"
          type="text"
          required
          validatorMessage={errors.profession?.message}
          name="profession"
          register={register}
          value={watch("profession")}
          parentClassName={styles.halfInput}
        />
        <Select
          label="Type of employment"
          placeholder="Select type"
          required
          validatorMessage={errors.employmentType?.value?.message?.toString()}
          value={watch("employmentType")}
          onChange={(val) => setValue("employmentType", val)}
          options={employmentOptions}
          parentClassName={styles.halfInput}
        />
        <Input
          label="Name of company"
          placeholder="Name of company"
          type="text"
          required
          validatorMessage={errors.companyName?.message}
          name="companyName"
          register={register}
          value={watch("companyName")}
          parentClassName={styles.halfInput}
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

export { ProfileForm };
