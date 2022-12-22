import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface SideBarFilterState {
  filterByBand?: Array<string>;
  filterByPrice?: Array<string | number>;
}

export const setFilterByBandRD = createCustomAction(
  "sidebar-filter/setFilterBand",
  (data: Array<string>) => ({ data })
);
export const setFilterByPriceRD = createCustomAction(
  "sidebar-filter/setFilterPrice",
  (data: Array<string | number>) => ({ data })
);

const actions = { setFilterByBandRD, setFilterByPriceRD };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: SideBarFilterState = { filterByBand: [], filterByPrice: [] },
  action: Action
) {
  switch (action.type) {
    case getType(setFilterByBandRD):
      return { ...state, filterByBand: action.data };
    case getType(setFilterByPriceRD):
      return { ...state, filterByPrice: action.data };
    default:
      return state;
  }
}
