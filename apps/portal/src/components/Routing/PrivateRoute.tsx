import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { authStore } from "@/app/auth-store";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = authStore();

  /* Navigate to login if not authenticated */
  if (!auth.isAuthenticated && !auth.loading) {
    return <Navigate to="/login" replace />;
  }

  if (auth.isAuthenticated && !auth.loading) {
    return <>{children}</>;
  }

  /* Show loading screen per default */
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <p>loading...</p>
      </div>
    </div>
  );
};
export default PrivateRoute;
