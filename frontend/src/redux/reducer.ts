import { combineReducers } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "modules/auth/redux/authSlice";
import sidebarFilterReducer, {
  SideBarFilterState,
} from "components/layouts/components/sidebar/redux/sideBarFilterSlice";
import cartReducer, { CartState } from "modules/cart/redux/cartSlice";

export interface IAppState {
  auth: AuthState;
  sidebarFilter: SideBarFilterState;
  cart: CartState;
}

const reducer = combineReducers({
  auth: authReducer,
  sidebarFilter: sidebarFilterReducer,
  cart: cartReducer,
});
export { reducer };
