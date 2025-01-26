import { AUTH_HEADER_NAME, LS_TOKEN } from "@/constants";
import { clearAccountData, setAccountData } from "@/redux/slices/authSlice";
import { storeError } from "@/redux/slices/errorSlice";

import axios from "axios";

export let apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export let cloudinary_img_path =
  process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_ACCCESS_PATH;

const IS_BROWSER = typeof window !== "undefined";

if (IS_BROWSER) {
  // set token when page refreshes
  axios.defaults.headers.common[AUTH_HEADER_NAME] =
    localStorage.getItem(LS_TOKEN);
}

export const setAxiosToken = (token: string) => {
  axios.defaults.headers.common[AUTH_HEADER_NAME] = token;
};

export const removeAxiosToken = () => {
  delete axios.defaults.headers.common[AUTH_HEADER_NAME];
};

const handleError = (dispatch: any, error: any) => {
  // Extract error information
  const statusCode = error?.response?.status;
  const redirectStatus = error?.response?.data?.redirect;
  if (redirectStatus) {
    // Redirect using window.location for a full page reload
    window.location.href = "/";
  }

  let sessionExpired = false;
  if (error?.response?.data?.sessionExpired) sessionExpired = true;

  const errorMessage =
    error?.response?.data?.message || "An unexpected error occurred.";
  dispatch(storeError(errorMessage));

  if (errorMessage && sessionExpired) {
    delete axios.defaults.headers.common[AUTH_HEADER_NAME];
    dispatch(clearAccountData());
    dispatch(storeError(`${errorMessage} \n Please login again`));
  }

  // Throw the error for further handling if necessary
  return { success: false, message: errorMessage };
};

export const login =
  (reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .post(`${apiUrl}/login`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const getLogout =
  () =>
  (dispatch: any): Promise<any> =>
    axios
      .get(`${apiUrl}/logout`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const getModules =
  () =>
  (dispatch: any): Promise<any> =>
    axios
      .get(`${apiUrl}/module`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

//add module
export const addModule =
  (reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .post(`${apiUrl}/module/add`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const updateModule =
  (id: any, reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .patch(`${apiUrl}/module/${id}`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const getModuleById =
  (id: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .get(`${apiUrl}/module/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

//roles

export const getRoles =
  () =>
  (dispatch: any): Promise<any> =>
    axios
      .get(`${apiUrl}/role`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

//add Role
export const addRole =
  (reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .post(`${apiUrl}/role/add`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const updateRole =
  (id: any, reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .patch(`${apiUrl}/role/${id}`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const getRoleById =
  (id: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .get(`${apiUrl}/role/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const uploadLogo =
  (reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .post(`${apiUrl}/company/upload-logo`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

//adding company
export const addCompany =
  (reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .post(`${apiUrl}/company/add`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const getCompanies =
  () =>
  (dispatch: any): Promise<any> =>
    axios
      .get(`${apiUrl}/company/`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const getCompnayById =
  (id: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .get(`${apiUrl}/company/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));

export const updateCompnay =
  (id: any, reqPayload: any) =>
  (dispatch: any): Promise<any> =>
    axios
      .patch(`${apiUrl}/company/${id}`, reqPayload)
      .then((res) => {
        return res.data;
      })
      .catch((error) => handleError(dispatch, error));
