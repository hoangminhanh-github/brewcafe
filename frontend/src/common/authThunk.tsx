import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAppState } from "redux/reducer";
// import { RESPONSE_STATUS_UNAUTHORIZED } from '../../../utils/httpResponseCode'
import { ACCESS_TOKEN, STATUS_CODE_WARRING } from "utils/index";
import Cookies from "js-cookie";
export function fetchThunk(
  url: string,
  method: "get" | "post" | "delete" | "put" = "get",
  body?: object | FormData,
  auth = true,
  contentType?: string
): ThunkAction<Promise<any>, IAppState, null, Action<string>> {
  return async (dispatch, getState) => {
    const res = await fetch(url, {
      // credentials: "include",
      method,
      body: body instanceof FormData ? body : JSON.stringify(body),
      headers:
        contentType !== "multipart/form-data"
          ? {
              "Content-Type": contentType || "application/json",
              Authorization: Cookies.get(ACCESS_TOKEN) || "",
            }
          : {
              Authorization: Cookies.get(ACCESS_TOKEN) || "",
            },
      cache: "no-store",
    });

    const json = await res.json();

    if (res.status === STATUS_CODE_WARRING) {
      // dispatch logout, remove access token here.
      alert("thunk fail");
    }

    return json;
    // throw new Error('Error');
  };
}
// export const hehe = 1;
