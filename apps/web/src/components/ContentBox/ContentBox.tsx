type Props = PaperProps & {
  children: React.ReactNode;
};

import { Paper, PaperProps } from "@mantine/core";
import classes from "./Contentbox.module.css";
import { cn } from "~/utils/utils";

const ContentBox = ({ children, ...props }: Props) => {
  return (
    <Paper {...props} withBorder className={cn(classes.contentbox, props.className)}>
      {children}
    </Paper>
  );
};
export default ContentBox;
