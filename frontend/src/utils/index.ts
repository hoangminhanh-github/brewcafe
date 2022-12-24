export const splitNumber = (x: number | string) => {
  const after = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return after;
};
export const STATUS_CODE_SUCCESS = 200;
export const STATUS_CODE_WARRING = 401;
// toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
export const WARNING_TOKEN_MESSAGE = "WARRING :Token is not for this session";
export const arrPermission = ["Admin", "User", "Vendor"];
export const APIHost = "http://localhost:3001";
export const ACCESS_TOKEN = "token";
export const MAX_SAFE_NUMBER = Number.MAX_SAFE_INTEGER;
