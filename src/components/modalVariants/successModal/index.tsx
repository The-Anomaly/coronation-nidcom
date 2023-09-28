import { Button, Modal } from "components";
import styles from "./styles.module.scss";
import { CloseIcon, successImg2 } from "assets";

interface SuccessModalProps {
  show: boolean;
  close: () => void;
  text: any;
  btnText: string;
  btntOnClick: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  show,
  close,
  text,
  btnText,
  btntOnClick,
}) => {
  return (
    <Modal
      contentClassName={styles.modal}
      show={show}
      close={close}
      position="centered"
    >
      <CloseIcon onClick={close} className={styles.closeBtn} role="button" />
      <img className={styles.img} src={successImg2} alt="success" />
      <p className={styles.ttl} >That was awesome</p>
      <p className={styles.txt} >{text}</p>
      <Button className={styles.btn}  onClick={btntOnClick} variant="fill-black">
        {btnText}
      </Button>
    </Modal>
  );
};

export { SuccessModal };
