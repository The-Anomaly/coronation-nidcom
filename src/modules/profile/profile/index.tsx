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
import { CloudIcon, TickCircle } from "assets";
import { employmentOptions, genderOptions } from "./options";
import { useEffect } from "react";

interface ProfileFormData {
  avatar: FileList | any;
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
  avatar: null,
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
    avatar: yup.mixed().required("Required"),
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
  countries: { label: string; value: string; states: OptionType[] }[];
}

const ProfileForm: React.FC<ProfileFormProps> = ({ submit, countries }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
    defaultValues: initProfileFormData,
  });

  useEffect(() => {
    const storageData = localStorage.getItem("signupProfile");
    if (storageData) {
      const data = JSON.parse(storageData);
      reset({ ...data, avatar: null });
    }
  }, []);

  const onSubmit: SubmitHandler<ProfileFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.fileWrap}>
          <p className={styles.fileWrap__label}>BO</p>
          <label className={styles.fileWrap__inputLabel} htmlFor="avatar">
            <CloudIcon />
            <p className={watch("avatar") !== null ? styles.uploaded : ""}>
              <span>Click to upload.</span> or drag and drop
            </p>
            <span>SVG, PNG, JPG or GIF (max. 800x400px)</span>
          </label>
          <Input
            label=""
            placeholder=""
            type="file"
            required
            validatorMessage={errors.avatar?.message?.toString()}
            name="avatar"
            register={register}
            accept=".pdf, .png, .jpg, .jpeg"
            className={styles.fileWrap__input}
            id={"avatar"}
            parentClassName={styles.noMargin}
          />
        </div>
        <Select
          label="Gender"
          placeholder="Select gender"
          required
          validatorMessage={errors.gender?.value?.message?.toString()}
          value={watch("gender")}
          onChange={(val) => setValue("gender", val)}
          options={genderOptions}
          disabled
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
          disabled
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
          disabled
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
            disabled={
              localStorage.getItem("signupProfile") === JSON.stringify(watch())
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

export { ProfileForm };
