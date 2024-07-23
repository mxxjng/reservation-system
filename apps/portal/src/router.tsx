import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AppShell from "@/components/Routing/AppShell";
import PrivateRoute from "@/components/Routing/PrivateRoute";
import Dashboard from "@/routes/dashboard";
import Home from "@/routes/Home";
import Login from "@/routes/login";

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
        <Route path="*" element={<div>Page doesn't exist...</div>} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
