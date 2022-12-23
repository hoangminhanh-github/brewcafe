/* eslint-disable react/react-in-jsx-scope */
import { lazy } from "react";

const Home = lazy(() => import("modules/page/home/Home"));
const Login = lazy(() => import("modules/auth/login/Login"));
const DefaultLayout = lazy(
  () => import("components/layouts/default-layout/DefaultLayout")
);
const CategoryLayout = lazy(
  () => import("components/layouts/layout-category/CategoryLayout")
);
const LayoutSalesman = lazy(
  () => import("components/layouts/layout-salesman/LayoutSalesman")
);
const DetailsPage = lazy(
  () => import("modules/product-details/ProductDetails")
);
const Cart = lazy(() => import("modules/cart/Cart"));
const ProductRender = lazy(
  () => import("components/product-render/ProductRender")
);
const Register = lazy(() => import("modules/auth/register/Register"));
const Salesman = lazy(() => import("modules/salesman/Salesman"));
export const ROUTES = {
  details_brewing: "/brewing/:slug",
  details_grinder: "/grinder/:slug",
  manual_brewing: "/brewing",
  manual_grinder: "/grinder",
  manual_cafe: "/cafe",
  cart: "/cart",
  login: "/login",
  register: "/register",
  salesman: "/salesman/product/list/:slug",
  home: "/",
};

export const PUBLIC_ROUTE = [
  { path: ROUTES.login, component: <Login></Login>, layout: DefaultLayout },
  {
    path: ROUTES.register,
    component: <Register></Register>,
    layout: DefaultLayout,
  },

  { path: ROUTES.home, component: <Home></Home>, layout: DefaultLayout },
  { path: ROUTES.cart, component: <Cart></Cart>, layout: DefaultLayout },
  {
    path: ROUTES.details_brewing,
    component: <DetailsPage></DetailsPage>,
    layout: DefaultLayout,
  },
  {
    path: ROUTES.details_grinder,
    component: <DetailsPage></DetailsPage>,
    layout: DefaultLayout,
  },
  {
    path: ROUTES.manual_brewing,
    component: <ProductRender></ProductRender>,
    layout: CategoryLayout,
  },
  {
    path: ROUTES.salesman,
    component: <Salesman></Salesman>,
    layout: LayoutSalesman,
  },
  {
    path: ROUTES.manual_grinder,
    component: <ProductRender></ProductRender>,
    layout: CategoryLayout,
  },
  {
    path: ROUTES.manual_cafe,
    component: <ProductRender></ProductRender>,
    layout: CategoryLayout,
  },
];
