import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "@/routes/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>Page doestn exist...</div>} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
