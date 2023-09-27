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
import { Link } from "react-router-dom";

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
      onClick: () => {},
    },
  ];
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
          <span className={styles.sidebar__profile__avatar}>BO</span>{" "}
          <div>
            <p className={styles.sidebar__profile__name}>Benjamin Okeke</p>
            <p className={styles.sidebar__profile__id}>ID:55778899</p>
          </div>
        </section>
      </aside>
      {children}
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