import { ForgotPassword, Login, Signup } from "pages";
import { PathRouteProps } from "react-router-dom";
import { Routes } from "./routes";
import { AuthLayout } from "layout";

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
    path: "*",
    Element: Signup,
    Layout: AuthLayout,
  },
];
