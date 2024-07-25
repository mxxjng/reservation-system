import { Navigate } from "react-router-dom";

import { usePermissions } from "@/hooks/usePermissions";

type PermissionHandlerProps = {
  /* permission required to access the page */
  requiredPermission: string[];

  /* page to display if user has permission */
  children: React.ReactNode;

  /* page the user gets redirected to if they don't have permission */
  redirectLink?: string;
};

/* Permission Handler to check if a user has persmissions to access a route */
const PermissionHandler = ({
  requiredPermission,
  children,
  redirectLink = "/dashboard",
}: PermissionHandlerProps) => {
  const { hasRequiredPermissions } = usePermissions([
    { case: "hasRequiredPermissions", permissions: requiredPermission },
  ]);

  if (!hasRequiredPermissions) {
    return <Navigate to={redirectLink} replace />;
  }

  return <>{children}</>;
};
export default PermissionHandler;
