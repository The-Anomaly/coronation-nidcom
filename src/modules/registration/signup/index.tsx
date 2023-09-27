import {
  BankIcon,
  DocumentIcon,
  FingerCircleIcon,
  MedalIcon,
  PeopleIcon,
  ShieldIcon,
  TickCircle,
  UserIcon,
} from "assets";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { AgreementForm } from "./agreement";
import { PasswordForm } from "./password";
import { ProfileForm } from "./profile";
import { IdentityForm } from "./identity";
import { BankForm } from "./bank";
import { NextOfKinForm } from "./nextOfKin";
import { DocumentForm } from "./documents";
import axios from "axios";
import { SignupSuccess } from "./success";

interface state {
  name: string;
  state_code: string;
}

interface country {
  iso3: string;
  iso2: string;
  name: string;
  states: state[];
}

const SignupUI = () => {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState({
    agreement: false,
    login: false,
    profile: false,
    identity: false,
    bank: false,
    nextOfKin: false,
    documents: false,
  });
  const [countries, setCountries] = useState<country[]>([]);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => {
        console.log(res);
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const tabs = [
    {
      text: "Accept Agreement",
      icon: <MedalIcon />,
      isComplete: completed.agreement,
    },
    {
      text: "Create Login",
      icon: <ShieldIcon />,
      isComplete: completed.login,
    },
    {
      text: "Profile",
      icon: <UserIcon />,
      isComplete: completed.profile,
    },
    {
      text: "Identity",
      icon: <FingerCircleIcon />,
      isComplete: completed.identity,
    },
    {
      text: "Bank Details",
      icon: <BankIcon />,
      isComplete: completed.bank,
    },
    {
      text: "Next of Kin",
      icon: <PeopleIcon />,
      isComplete: completed.nextOfKin,
    },
    {
      text: "Upload Documents",
      icon: <DocumentIcon />,
      isComplete: completed.documents,
    },
  ];

  const handleAgreements = (data) => {
    localStorage.setItem("signupAgreement", JSON.stringify(data));
    setCompleted((prev) => ({ ...prev, agreement: true }));
    setActive(1);
  };

  const handlePassword = (data) => {
    localStorage.setItem("signupPassword", JSON.stringify(data));
    setCompleted((prev) => ({ ...prev, login: true }));
    setActive(2);
  };

  const handleProfile = (data) => {
    localStorage.setItem("signupProfile", JSON.stringify(data));
    setCompleted((prev) => ({ ...prev, profile: true }));
    setActive(3);
  };

  const handleIdentity = (data) => {
    localStorage.setItem("signupIdentity", JSON.stringify(data));
    setCompleted((prev) => ({ ...prev, identity: true }));
    setActive(4);
  };

  const handleBank = (data) => {
    localStorage.setItem("signupBankInfo", JSON.stringify(data));
    setCompleted((prev) => ({ ...prev, bank: true }));
    setActive(5);
  };

  const handleNOK = (data) => {
    localStorage.setItem("signupNextOfKin", JSON.stringify(data));
    setCompleted((prev) => ({ ...prev, nextOfKin: true }));
    setActive(6);
  };

  const handleDocuments = (data) => {
    localStorage.setItem("signupDocs", JSON.stringify(data));
    setCompleted((prev) => ({ ...prev, documents: true }));
    setActive(7);
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.ttl}>Create an Account</h1>
        <p className={styles.txt}>
          Start investing today and build the future you want
        </p>
        <nav className={styles.nav}>
          {tabs.map(({ icon, text, isComplete }, index) => (
            <span
              role="button"
              // onClick={() => setActive((prev) => (isComplete ? index : prev))}
              onClick={() => setActive(index)}
              className={
                active === index
                  ? styles.active
                  : isComplete
                  ? styles.isComplete
                  : ""
              }
              key={text}
            >
              {isComplete && active !== index ? <TickCircle /> : icon} {text}
            </span>
          ))}
        </nav>
        <section>
          {active === 0 ? (
            <AgreementForm submit={handleAgreements} />
          ) : active === 1 ? (
            <PasswordForm
              previous={() => setActive(0)}
              submit={handlePassword}
            />
          ) : active === 2 ? (
            <ProfileForm
              countries={countries.map((country) => ({
                label: country.name,
                value: country.name,
                states: country.states.map((state) => ({
                  label: state.name,
                  value: state.name,
                })),
              }))}
              previous={() => setActive(1)}
              submit={handleProfile}
            />
          ) : active === 3 ? (
            <IdentityForm
              countries={countries.map((country) => ({
                label: country.name,
                value: country.name,
              }))}
              previous={() => setActive(2)}
              submit={handleIdentity}
            />
          ) : active === 4 ? (
            <BankForm previous={() => setActive(3)} submit={handleBank} />
          ) : active === 5 ? (
            <NextOfKinForm previous={() => setActive(4)} submit={handleNOK} />
          ) : active === 6 ? (
            <DocumentForm
              previous={() => setActive(5)}
              submit={handleDocuments}
            />
          ) : (
            <SignupSuccess />
          )}
        </section>
      </main>
    </>
  );
};

export { SignupUI };
