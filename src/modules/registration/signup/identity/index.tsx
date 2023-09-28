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
import { idOptions } from "./options";
import { useEffect } from "react";

interface IdentityFormData {
  meansOfId: OptionType;
  issuingCountry: OptionType;
  idNo: string;
  issueDate: string;
  expiryDate: string;
}

const initIdentityFormData: IdentityFormData = {
  meansOfId: initOptionType,
  issuingCountry: initOptionType,
  idNo: "",
  issueDate: "",
  expiryDate: "",
};

const schema = yup
  .object({
    meansOfId: optionTypeSchemaReq,
    issuingCountry: optionTypeSchemaReq,
    idNo: yup.string().required("Required"),
    issueDate: yup.string().required("Required"),
    expiryDate: yup.string().required("Required"),
  })
  .required();

interface IdentityFormProps {
  submit: (data: IdentityFormData) => void;
  previous: () => void;

  countries: OptionType[];
}

const IdentityForm: React.FC<IdentityFormProps> = ({
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
    reset,
  } = useForm<IdentityFormData>({
    resolver: yupResolver(schema),
    defaultValues: initIdentityFormData,
  });

  useEffect(() => {
    const storageData = localStorage.getItem("signupIdentity");
    if (storageData) {
      const data = JSON.parse(storageData);
      reset(data);
    }
  }, []);

  const onSubmit: SubmitHandler<IdentityFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <Select
          label="Means of ID"
          placeholder="Select type"
          required
          validatorMessage={errors.meansOfId?.value?.message?.toString()}
          value={watch("meansOfId")}
          onChange={(val) => setValue("meansOfId", val)}
          options={idOptions}
        />
        <Select
          label="Issuing country"
          placeholder="Select country"
          required
          validatorMessage={errors.issuingCountry?.value?.message?.toString()}
          value={watch("issuingCountry")}
          onChange={(val) => setValue("issuingCountry", val)}
          options={countries}
        />
        <Input
          label="ID number"
          placeholder="Enter ID number"
          type="text"
          required
          validatorMessage={errors.idNo?.message}
          name="idNo"
          register={register}
          value={watch("idNo")}
        />
        <Input
          label="Issue date"
          placeholder=""
          type="date"
          required
          validatorMessage={errors.issueDate?.message}
          name="issueDate"
          register={register}
          value={watch("issueDate")}
        />
        <Input
          label="Expiry date"
          placeholder=""
          type="date"
          required
          validatorMessage={errors.expiryDate?.message}
          name="expiryDate"
          register={register}
          value={watch("expiryDate")}
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

export { IdentityForm };
