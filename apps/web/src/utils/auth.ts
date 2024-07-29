export type AvailableRoles = "USER" | "ADMIN" | "CATCH_EDITOR" | "TEAM_EDITOR";

/* Function to check if user has required role */
export function hasRequiredRole(allowedRoles: AvailableRoles[], userRole: AvailableRoles) {
  if (!allowedRoles.includes(userRole)) {
    return false;
  }

  return true;
}
