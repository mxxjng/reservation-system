import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import { ThemeProvider, useTheme } from "@/context/theme-provider";
import { loadUser } from "@/features/actions/auth";
import AppRoutes from "@/router";

import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

const queryClient = new QueryClient();

function App() {
  /* Fetch user on app mount */
  React.useEffect(() => {
    async function fetchUser() {
      await loadUser();
    }
    fetchUser();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ToastWrapper />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function ToastWrapper() {
  const { theme } = useTheme();
  return <ToastContainer theme={theme} position="bottom-right" />;
}

export default App;
