import { permissionCases } from "@/utils/constants";
import { hasRequiredPermissions } from "@/utils/utils";

type Permission = {
  case: (typeof permissionCases)[number];
  permissions: string[];
};

type Cases<T extends Permission> = {
  [key in T["case"]]: boolean;
};

/* Custom hook to check if the user has all the required permissions */
export function usePermissions<T extends Permission>(permissions: Array<T>): Cases<T> {
  // mock data (fetch permissions from the server for the user or get permissions from global state)
  const data = { permissions: ["reservation:read"] };

  // array of all the permission keys
  const permissionKeys = permissions.map((permission) => permission.case) as Array<keyof T["case"]>;

  const cases = permissionKeys.reduce(
    (obj, key) => ({
      ...obj,
      [key]: false,
    }),
    {} as Cases<T>
  );

  if (data) {
    for (const permission of permissions) {
      const hasCasePermissions = hasRequiredPermissions(permission.permissions, data.permissions);

      cases[permission.case as keyof Cases<T>] = hasCasePermissions;
    }
  }

  return cases;
}
