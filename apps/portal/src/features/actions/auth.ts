import { LoginRequest, RegisterRequest } from "@repo/validators";
import { toast } from "react-toastify";

import { fetchUser, loginUser, registerUser } from "@/api/requests";
import { authStore } from "@/app/auth-store";
import i18n from "@/app/i18n";
import { getLocalStorageItem, setAuthToken } from "@/utils/utils";

const { loadUser: loadUserFn, authenticate, clear } = authStore.getState().actions;

export const loadUser = async () => {
  const token = getLocalStorageItem("token");

  if (token) {
    console.log("token", token);
    setAuthToken(token);
  }

  try {
    const user = await fetchUser();

    loadUserFn(user);
  } catch (err) {
    clear();
  }
};

export const login = async (
  loginData: LoginRequest,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    const { access_token, user } = await loginUser(loginData);

    authenticate(access_token);
    loadUserFn(user);

    toast.success(i18n.t("login.notifications.success.title"));
  } catch (error) {
    setLoading(false);
    clear();
    toast.error(i18n.t("login.notifications.error.title"));
  }
};

export const register = async (
  formData: RegisterRequest,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);

  try {
    const res = await registerUser(formData);

    if (res) {
      authenticate(res?.access_token);
      loadUserFn(res?.user);

      toast.success(i18n.t("register.notifications.success.title"));
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    clear();
    toast.error(i18n.t("register.notifications.error.title"));
  }
};

export const logout = async () => {
  try {
    clear();
  } catch (err) {
    console.log("logout error");
  }
};
