import { QueryClient, QueryClientProvider } from "react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./router";

import "./styles/styles.css";

const queryClient = new QueryClient();

// App component to initialize the app and providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
