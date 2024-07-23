import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import { authStore } from "@/app/auth-store";
import { loadUser } from "@/features/actions/auth";
import AppRoutes from "@/router";

import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

const queryClient = new QueryClient();

// App component to initialize the app and providers
function App() {
  const authState = authStore();

  console.log(authState);

  /* Fetch user on app mount */
  React.useEffect(() => {
    async function fetchUser() {
      await loadUser();
    }
    fetchUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ToastContainer position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
