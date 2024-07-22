type LoadingHandlerProps = {
  /* status of the data being fetched */
  status: LoadingStatus;

  /* children that will be rendered once status is success */
  children: React.ReactNode;

  /* optional error message component to be rendered if status is error */
  errorComponent?: React.ReactNode;
};

type LoadingStatus = "idle" | "loading" | "success" | "error";

type LoadingStatusOptions = {
  [key in LoadingStatus]: React.ReactNode;
};

// LoadingHandler component to handle the status of the data being fetched
const LoadingHandler = ({ status, children, errorComponent }: LoadingHandlerProps) => {
  const loadingStatusOptions: LoadingStatusOptions = {
    loading: <div>Loading...</div>,
    error: errorComponent ?? <DefaultErrorComponent />,
    success: children,
    idle: null,
  };

  return <>{loadingStatusOptions[status] ?? <p>Something went wrong loading the data</p>}</>;
};

function DefaultErrorComponent() {
  return <div>Error fetching data</div>;
}

export default LoadingHandler;
