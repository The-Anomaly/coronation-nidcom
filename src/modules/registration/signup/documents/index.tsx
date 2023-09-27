import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "components";
import { Chevron, CloudIcon } from "assets";

interface DocumentFormData {
  photo: FileList | any;
  id: FileList | any;
  signature: FileList | any;
}

const initDocumentFormData: DocumentFormData = {
  photo: null,
  id: null,
  signature: null,
};

const schema = yup
  .object({
    photo: yup.mixed().required("Required"),
    id: yup.mixed().required("Required"),
    signature: yup.mixed().required("Required"),
  })
  .required();

interface DocumentFormProps {
  submit: (data: DocumentFormData) => void;
  previous: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ submit, previous }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DocumentFormData>({
    resolver: yupResolver(schema),
    defaultValues: initDocumentFormData,
  });

  const onSubmit: SubmitHandler<DocumentFormData> = (data) => {
    submit(data);
  };

  return (
    <>
      <form className={styles.form}>
        <div className={styles.fileWrap}>
          <p className={styles.fileWrap__label}>Passport photograph</p>
          <label className={styles.fileWrap__inputLabel} htmlFor="photo">
            <CloudIcon />
            <p className={watch("photo") !== null ? styles.uploaded : ""}>
              {watch("photo") !== null
                ? watch("photo")[0].name
                : "Click to upload. pdf, png or jpg (max. 2gig)"}{" "}
            </p>
            <span>{watch("photo") !== null ? "Replace" : "Browse"}</span>
          </label>
          <Input
            label=""
            placeholder=""
            type="file"
            required
            validatorMessage={errors.photo?.message?.toString()}
            name="photo"
            register={register}
            accept=".pdf, .png, .jpg, .jpeg"
            className={styles.fileWrap__input}
            id={"photo"}
            parentClassName={styles.noMargin}
          />
        </div>
        <div className={styles.fileWrap}>
          <p className={styles.fileWrap__label}>Identity Document</p>
          <label className={styles.fileWrap__inputLabel} htmlFor="id">
            <CloudIcon />
            <p className={watch("id") !== null ? styles.uploaded : ""}>
              {watch("id") !== null
                ? watch("id")[0].name
                : "Click to upload. pdf, png or jpg (max. 2gig)"}{" "}
            </p>
            <span>{watch("id") !== null ? "Replace" : "Browse"}</span>
          </label>
          <Input
            label=""
            placeholder=""
            type="file"
            required
            validatorMessage={errors.id?.message?.toString()}
            name="id"
            register={register}
            accept=".pdf, .png, .jpg, .jpeg"
            className={styles.fileWrap__input}
            id={"id"}
            parentClassName={styles.noMargin}
          />
        </div>
        <div className={styles.fileWrap}>
          <p className={styles.fileWrap__label}>Signature</p>
          <label className={styles.fileWrap__inputLabel} htmlFor="signature">
            <CloudIcon />
            <p className={watch("signature") !== null ? styles.uploaded : ""}>
              {watch("signature") !== null
                ? watch("signature")[0].name
                : "Click to upload. pdf, png or jpg (max. 2gig)"}{" "}
            </p>
            <span>{watch("signature") !== null ? "Replace" : "Browse"}</span>
          </label>
          <Input
            label=""
            placeholder=""
            type="file"
            required
            validatorMessage={errors.signature?.message?.toString()}
            name="signature"
            register={register}
            accept=".pdf, .png, .jpg, .jpeg"
            className={styles.fileWrap__input}
            id={"signature"}
            parentClassName={styles.noMargin}
          />
        </div>
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

export { DocumentForm };
