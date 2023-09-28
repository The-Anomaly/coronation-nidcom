import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  OptionType,
  Select,
  Textarea,
  initOptionType,
  optionTypeSchemaReq,
} from "components";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  SendIcon,
  TwitterIcon,
} from "assets";

const subjectOptions: OptionType[] = [
  {
    label: "Products",
    value: "Products",
  },
  {
    label: "Portfolio",
    value: "Portfolio",
  },
  {
    label: "Withdrawal",
    value: "Withdrawal",
  },
  {
    label: "Funding",
    value: "Funding",
  },
  {
    label: "Redeeming an investment",
    value: "Redeeming an investment",
  },
];

interface ContactFormData {
  subject: OptionType;
  message: string;
}

const initContactFormData: ContactFormData = {
  subject: initOptionType,
  message: "",
};

const schema = yup
  .object({
    subject: optionTypeSchemaReq,
    message: yup.string().required("Required"),
  })
  .required();

const ContactUI = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: initContactFormData,
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <section className={styles.section}>
        <div>
          <h2 className={styles.ttl}>Get in touch with us</h2>
          <p className={styles.txt}>
            If you need any help, we are always available to help.
          </p>
          <form className={styles.form}>
            <Select
              label="Subject of concern"
              placeholder="Select what best describe your problem"
              required
              validatorMessage={errors.subject?.value?.message?.toString()}
              value={watch("subject")}
              onChange={(val) => setValue("subject", val)}
              options={subjectOptions}
              parentClassName={styles.inputWrap}
            />
            <Textarea
              label="Description"
              placeholder="Enter a description..."
              required
              validatorMessage={errors.message?.message}
              name="message"
              register={register}
              value={watch("message")}
              parentClassName={styles.inputWrap}
            />
            <Button
              disabled={
                watch("message") === "" || watch("subject.value") === ""
              }
              onClick={handleSubmit(onSubmit)}
              className={styles.form__btn}
              variant="fill-black"
            >
              Send <SendIcon />
            </Button>
          </form>
        </div>
        <div className={styles.contactInfo}>
          <h2 className={styles.ttl}>Contact info</h2>
          <p className={styles.txt}>
            You can also contact us via other platforms
          </p>

          <div className={styles.contact}>
            <p>Email</p>
            <a
              className={styles.contact__email}
              href={"mailto:customercare@coronationregistrars.com"}
            >
              customercare@coronationregistrars.com
            </a>
          </div>

          <div className={styles.contact}>
            <p>Tel</p>
            <a href={"tel:+234 (0)1-2797640-43"}>+234 (0)1-2797640-43</a>
          </div>

          <div className={styles.socials}>
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <LinkedinIcon />
          </div>
        </div>
      </section>
    </>
  );
};

export { ContactUI };
