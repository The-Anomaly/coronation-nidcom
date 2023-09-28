import {
  UserIcon,
  ShieldIcon,
  FingerCircleIcon,
  BankIcon,
  PeopleIcon,
  TickCircle,
} from "assets";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { BankForm } from "./bank";
import { IdentityForm } from "./identity";
import { NextOfKinForm } from "./nextOfKin";
import { PasswordForm } from "./password";
import { ProfileForm } from "./profile";
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

const ProfileUI = () => {
  const [active, setActive] = useState(0);
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
      text: "Profile",
      icon: <UserIcon />,
    },
    {
      text: "Change Password",
      icon: <ShieldIcon />,
    },
    {
      text: "Identity",
      icon: <FingerCircleIcon />,
    },
    {
      text: "Bank Details",
      icon: <BankIcon />,
    },
    {
      text: "Next of Kin",
      icon: <PeopleIcon />,
    },
  ];

  const handlePassword = (data) => {
    localStorage.setItem("resetPassword", JSON.stringify(data));
  };

  const handleProfile = (data) => {
    localStorage.setItem("signupProfile", JSON.stringify(data));
  };

  const handleIdentity = (data) => {
    localStorage.setItem("signupIdentity", JSON.stringify(data));
  };

  const handleBank = (data) => {
    localStorage.setItem("signupBankInfo", JSON.stringify(data));
  };

  const handleNOK = (data) => {
    localStorage.setItem("signupNextOfKin", JSON.stringify(data));
  };

  return (
    <>
      <nav className={styles.nav}>
        {tabs.map(({ icon, text }, index) => (
          <span
            role="button"
            onClick={() => setActive(index)}
            className={active === index ? styles.active : ""}
            key={text}
          >
            {icon} {text}
          </span>
        ))}
      </nav>
      <section>
        {active === 0 ? (
          <ProfileForm
            countries={countries.map((country) => ({
              label: country.name,
              value: country.name,
              states: country.states.map((state) => ({
                label: state.name,
                value: state.name,
              })),
            }))}
            submit={handleProfile}
          />
        ) : active === 1 ? (
          <PasswordForm submit={handlePassword} />
        ) : active === 2 ? (
          <IdentityForm
            countries={countries.map((country) => ({
              label: country.name,
              value: country.name,
            }))}
            submit={handleIdentity}
          />
        ) : active === 3 ? (
          <BankForm submit={handleBank} />
        ) : active === 4 ? (
          <NextOfKinForm submit={handleNOK} />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export { ProfileUI };
