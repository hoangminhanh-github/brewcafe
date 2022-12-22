import { ActionType, createCustomAction, getType } from "typesafe-actions";
import IProduct, { IProductAfterAddCart } from "models/Product.model";
export type CartState = Array<IProductAfterAddCart>;

export const setCartListRD = createCustomAction(
  "cart/setCart",
  (data: any) => ({
    data,
  })
);
export const deleteProductCart = createCustomAction(
  "cart/deleteCart",
  (data: IProduct) => ({
    data,
  })
);

const actions = { setCartListRD, deleteProductCart };
type Action = ActionType<typeof actions>;

export default function reducer(state: CartState = [], action: Action) {
  switch (action.type) {
    case getType(setCartListRD): {
      let res: any = [...state];
      // nếu không truyển count mặc định là 1
      if (!action.data.count) {
        action.data.count = 1;
      }
      const isExists = state.find((item: any) => item.id == action.data.id);
      if (!isExists) {
        res = [...state, action.data];
      }
      if (isExists && isExists.count !== action.data.count) {
        const newArr = state.filter((item: any) => item.id != action.data.id);
        res = [...newArr, action.data];
      }
      return res;
    }
    case getType(deleteProductCart): {
      const newState = state.filter((item) => item.id != action.data.id);
      return newState;
    }

    default:
      return state;
  }
}
