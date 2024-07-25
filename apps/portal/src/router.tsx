import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AppShell from "@/components/Routing/AppShell";
import PermissionHandler from "@/components/Routing/PermissionGuard";
import PrivateRoute from "@/components/Routing/PrivateRoute";
import Home from "@/routes/Home";
import Dashboard from "@/routes/dashboard";
import Fallback from "@/routes/fallback";
import Login from "@/routes/login";
import Reservation from "@/routes/reservation/reservation";
import Reservations from "@/routes/reservation/reservations";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppShell>
                <Dashboard />
              </AppShell>
            </PrivateRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <PrivateRoute>
              <PermissionHandler requiredPermission={["reservation:read"]}>
                <AppShell>
                  <Reservations />
                </AppShell>
              </PermissionHandler>
            </PrivateRoute>
          }
        />
        <Route
          path="/reservations/:reservationId"
          element={
            <PrivateRoute>
              <PermissionHandler requiredPermission={["reservation:read"]}>
                <AppShell>
                  <Reservation />
                </AppShell>
              </PermissionHandler>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
