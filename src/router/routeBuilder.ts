import {
  Contact,
  Dashboard,
  ForgotPassword,
  Login,
  Portfolio,
  Products,
  Profile,
  Signup,
  Wallet,
} from "pages";
import { PathRouteProps } from "react-router-dom";
import { Routes } from "./routes";
import { AuthLayout, DashboardLayout } from "layout";

// Route Builder Item Props
export interface RouteBuilderItem extends PathRouteProps {
  Layout?: React.FC<any>; // If you wish to add a layout to the page
  Element: React.FC;
  props?: any;
}

/**
 * ROUTE BUILDER
 *
 * ===============================================
 *
 * This is a list of all our application routes.
 *
 * A single item on this list contains the necessary Route props needed by React Router to do it's job.
 *
 * If you wish to add a new route to the application,
 * just fulfill all the necessary props needed by the RouteBuilder item. Ciao!
 *
 */
export const RouteBuilder: RouteBuilderItem[] = [
  {
    path: Routes.home,
    Element: Signup,
    Layout: AuthLayout,
  },
  {
    path: Routes.login,
    Element: Login,
    Layout: AuthLayout,
  },
  {
    path: Routes.forgotPassword,
    Element: ForgotPassword,
    Layout: AuthLayout,
  },
  {
    path: Routes.dashboard,
    Element: Dashboard,
    Layout: DashboardLayout,
    props: {
      page: "dashboard",
      title: "Dashboard",
    },
  },
  {
    path: Routes.products,
    Element: Products,
    Layout: DashboardLayout,
    props: {
      page: "products",
      title: "Products",
    },
  },
  {
    path: Routes.profile,
    Element: Profile,
    Layout: DashboardLayout,
    props: {
      page: "profile",
      title: "Profile management",
    },
  },
  {
    path: Routes.contact,
    Element: Contact,
    Layout: DashboardLayout,
    props: {
      page: "contact",
      title: "Contact us",
    },
  },
  {
    path: Routes.wallet,
    Element: Wallet,
    Layout: DashboardLayout,
    props: {
      page: "wallet",
      title: "Wallet",
    },
  },
  {
    path: Routes.portfolio,
    Element: Portfolio,
    Layout: DashboardLayout,
    props: {
      page: "portfolio",
      title: "Portfolio",
    },
  },
  {
    path: "*",
    Element: Signup,
    Layout: AuthLayout,
  },
];
