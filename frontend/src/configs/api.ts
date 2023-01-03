import { APIHost } from "utils";

enum APIService {
  auth,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return "";
}

const API_PATHS = {
  getProductSort: `${getBaseUrl(APIService.public)}/product/list/name`,
  getUser: `${getBaseUrl(APIService.public)}/user`,
  getBands: `${getBaseUrl(APIService.public)}/band`,
  getProducts: `${getBaseUrl(APIService.public)}/product`,
  getProductDetail: `${getBaseUrl(APIService.public)}/product/detail`,
  deleteProduct: `${getBaseUrl(APIService.public)}/product/delete`,
  auth: `${getBaseUrl(APIService.auth)}`,
  register: `${getBaseUrl(APIService.auth)}/register`,
};
export default API_PATHS;
