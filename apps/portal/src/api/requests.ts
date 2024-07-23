import axios, { AxiosResponse } from "axios";
import {
  GetAuthenticatedUserResponse,
  RegisterResponse,
  LoginRequest,
  RegisterRequest,
} from "@repo/validators";

import { apiEndpoints, config } from "@/utils/constants";

const header = {
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
};

/* Fetches the authenticated user */
export async function fetchUser() {
  const response: AxiosResponse<{ data: GetAuthenticatedUserResponse }> = await axios.get(
    `${config.urls.API_URL}${apiEndpoints.auth.getAuthUser.path}`
  );

  return response.data.data;
}

/* Login user */
export async function loginUser({ email, password }: LoginRequest) {
  try {
    const response: AxiosResponse<any> = await axios.post(
      `${config.urls.API_URL}${apiEndpoints.auth.login.path}`,
      { email, password },
      header
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

/* Register user */
export async function registerUser({ email, password, firstname, lastname }: RegisterRequest) {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      `${config.urls.API_URL}${apiEndpoints.auth.register.path}`,
      { email, password, firstname, lastname },
      header
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
