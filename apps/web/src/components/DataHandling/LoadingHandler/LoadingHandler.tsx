import { Alert, Skeleton } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

type LoadingHandlerProps = {
  /* status of the data being fetched */
  status: LoadingStatus;

  /* children that will be rendered once status is success */
  children: React.ReactNode;

  /* optional error message component to be rendered if status is error */
  errorComponent?: React.ReactNode;

  /* optional loading component to be rendered if status is loading */
  loadingComponent?: React.ReactNode;
};

type LoadingStatus = "loading" | "success" | "error";

type LoadingStatusOptions = {
  [key in LoadingStatus]: React.ReactNode;
};

// LoadingHandler component to handle the status of the data being fetched
const LoadingHandler = ({
  status,
  children,
  errorComponent,
  loadingComponent,
}: LoadingHandlerProps) => {
  const loadingStatusOptions: LoadingStatusOptions = {
    loading: loadingComponent ?? (
      <>
        <Skeleton height={20} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
        <Skeleton height={20} mt={6} radius="xl" />
      </>
    ),
    error: errorComponent ?? <DefaultErrorComponent />,
    success: children,
  };

  return (
    <>
      {loadingStatusOptions[status] ?? (
        <p>Something went wrong loading the data</p>
      )}
    </>
  );
};

// TODO: Add internationalization
function DefaultErrorComponent() {
  return (
    <Alert
      variant="light"
      color="red"
      title="Error"
      icon={<IconInfoCircle size="1rem" stroke={1.5} />}
    >
      Couldnt Load data. Please try again
    </Alert>
  );
}

export default LoadingHandler;
