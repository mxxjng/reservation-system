import { QueryClient, QueryClientProvider } from "react-query";

import AppRoutes from "./router";

import "./styles/styles.css";

const queryClient = new QueryClient();

// App component to initialize the app and providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
