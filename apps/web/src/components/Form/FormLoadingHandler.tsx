import { Box, LoadingOverlay } from "@mantine/core";
import React from "react";

type Props = {
  /* Loading state of the form */
  isLoading: boolean;

  /* children to be displayed */
  children: React.ReactNode;
};

/* Handler to display an overlay while the form is loading */
const FormLoadingHandler = ({ isLoading, children }: Props) => {
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "md", blur: 2, backgroundOpacity: 0.2 }}
        loaderProps={{ children: "" }}
      />
      {children}
    </Box>
  );
};

export default FormLoadingHandler;
