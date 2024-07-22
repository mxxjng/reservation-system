export type EmptyListHandlerProps = {
  /* lenght of the input data */
  length: number;

  /* content that will be rendered once the data has more than 0 entries */
  children: React.ReactNode;

  /* message to be rendered if the data has 0 entries */
  emptyMessage?: React.ReactNode;
};

/* Component that renders the content if the data has more than 0 entries */
export const EmptyListHandler = ({
  length,
  children,
  emptyMessage = <p>No Data. Please try again</p>,
}: EmptyListHandlerProps) => {
  if (length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return <>{children}</>;
};
