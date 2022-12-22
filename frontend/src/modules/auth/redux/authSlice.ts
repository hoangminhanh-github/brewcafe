import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface AuthState {
  auth?: string;
  user?: object;
}

export const setUserRD = createCustomAction("auth/setUser", (data: any) => ({
  data,
}));

const actions = { setUserRD };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: AuthState = { auth: "", user: {} },
  action: Action
) {
  switch (action.type) {
    case getType(actions.setUserRD):
      return { user: action.data.data, auth: action.data.token };
    default:
      return state;
  }
}
