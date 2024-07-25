import axios from "axios";

/* Set the token in the header */
export const setAuthToken = (token: string | null) => {
  if (token) {
    console.log("setting token");
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

/* Get the token from the local storage */
export function getLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  return item;
}

/* Check if the user has all the required permissions */
export function hasRequiredPermissions(requiredPermissions: string[], permissions: string[]) {
  return requiredPermissions.every((requiredPermission) =>
    permissions.includes(requiredPermission)
  );
}
