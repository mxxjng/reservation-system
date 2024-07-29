import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AvailableRoles, hasRequiredRole } from "~/utils/auth";

/* Custom Hook to check if user has a allowed role otherwise redirect to home */
export function useRoleGuard(allowedRoles: AvailableRoles[], userRole: AvailableRoles | undefined) {
  const { push } = useRouter();

  useEffect(() => {
    if (userRole && !hasRequiredRole(allowedRoles, userRole as AvailableRoles)) {
      push("/");
    }
  }, [userRole, allowedRoles]);
}
