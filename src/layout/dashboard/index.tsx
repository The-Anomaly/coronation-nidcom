import {
  BasketIcon,
  BasketIconFill,
  BriefCaseIcon,
  BriefCaseIconFill,
  ChartIcon,
  ChartIconFill,
  LogoutIcon,
  MessagesIcon,
  MessagesIconFill,
  SettingsIcon,
  SettingsIconFill,
  WalletIcon,
  WalletIconFill,
  logo,
} from "assets";
import styles from "./styles.module.scss";
import { Routes } from "router";
import { Link, useNavigate } from "react-router-dom";

type pages =
  | "dashboard"
  | "products"
  | "wallet"
  | "portfolio"
  | "profile"
  | "contact";

interface DashboardLayoutProps {
  page: pages;
  title: string;
  children: any;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  page,
  title,
  children,
}) => {
  const navigate = useNavigate();

  const navItems: NavItemProps[] = [
    {
      text: "Dashboard",
      icon: page === "dashboard" ? <ChartIconFill /> : <ChartIcon />,
      url: Routes.dashboard,
      isActive: page === "dashboard",
    },
    {
      text: "Products",
      icon: page === "products" ? <BasketIconFill /> : <BasketIcon />,
      url: Routes.products,
      isActive: page === "products",
    },
    {
      text: "Portfolio",
      icon: page === "portfolio" ? <BriefCaseIconFill /> : <BriefCaseIcon />,
      url: Routes.portfolio,
      isActive: page === "portfolio",
    },
    {
      text: "Wallet",
      icon: page === "wallet" ? <WalletIconFill /> : <WalletIcon />,
      url: Routes.wallet,
      isActive: page === "wallet",
    },
  ];
  const navItems2: NavItemProps[] = [
    {
      text: "Profile management",
      icon: page === "profile" ? <SettingsIconFill /> : <SettingsIcon />,
      url: Routes.profile,
      isActive: page === "profile",
    },
    {
      text: "Contact us",
      icon: page === "contact" ? <MessagesIconFill /> : <MessagesIcon />,
      url: Routes.contact,
      isActive: page === "contact",
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      onClick: () => navigate(Routes.login),
    },
  ];

  const data = JSON.parse(localStorage.getItem("signupAgreement") ?? "");
  const id = JSON.parse(localStorage.getItem("signupIdentity") ?? "");
  return (
    <>
      <header className={styles.header}>
        <p>{title}</p>
      </header>
      <aside className={styles.sidebar}>
        <img
          className={styles.sidebar__logo}
          src={logo}
          alt="coronation logo"
        />

        <section className={styles.sidebar__nav1}>
          {navItems.map((item) => (
            <NavItem key={item.text} {...item} />
          ))}
        </section>

        <section className={styles.sidebar__nav2}>
          {navItems2.map((item) => (
            <NavItem key={item.text} {...item} />
          ))}
        </section>

        <section className={styles.sidebar__profile}>
          <span className={styles.sidebar__profile__avatar}>{data.firstName.charAt(0)}{data.lastName.charAt(0)}</span>{" "}
          <div>
            <p className={styles.sidebar__profile__name}>
              {data.firstName} {data.lastName}
            </p>
            <p className={styles.sidebar__profile__id}>ID:{id.idNo}</p>
          </div>
        </section>
      </aside>
      <section className={styles.body}>{children}</section>
    </>
  );
};

interface NavItemProps {
  text: string;
  url?: string;
  onClick?: () => void;
  icon: JSX.Element;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  text,
  url,
  onClick,
  icon,
  isActive,
}) => {
  return (
    <>
      {url ? (
        <Link
          role="button"
          to={url}
          className={`${styles.navItem} ${
            isActive ? styles.navItem__active : ""
          }`}
        >
          {icon} <p>{text}</p>
        </Link>
      ) : (
        <button
          role="button"
          onClick={onClick}
          className={`${styles.navItem} ${
            isActive ? styles.navItem__active : ""
          }`}
        >
          {icon} <p>{text}</p>
        </button>
      )}
    </>
  );
};

export { DashboardLayout };
