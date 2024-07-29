import { Button, ButtonProps } from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { normalizeString } from "@repo/lib";

type Props = ButtonProps & {
  /* Name of the formfield the value should get added to */
  name: string;

  /* Name of the formfield the values gets selected from */
  target: string;
};

/* Generates a slug from a selected field in a form */
const SlugGenerator = ({ name, target, ...props }: Props) => {
  const { setValue, watch } = useFormContext();

  /* Watches stadium name values */
  const value = watch(target);

  /* Watches stadium slug values */
  const slugValue = watch(name);

  /* State to check if slug and name are synced */
  const isSynced = normalizeString(value) === slugValue;

  /* Function to generate slug */
  function handleGenerateSlug() {
    const slug = normalizeString(value);

    setValue(name, slug, { shouldDirty: true });
  }

  /* Render the state of the button */
  function renderButtonTextState(isSynced: boolean, value: string, slugValue: string) {
    if (!value || !slugValue) return "Gen";
    if (!isSynced) return "Regen";

    return "Gen";
  }

  return (
    <Button
      onClick={handleGenerateSlug}
      disabled={!value || isSynced}
      leftSection={<IconCircleDashed size="1rem" />}
      {...props}
    >
      {renderButtonTextState(isSynced, value, slugValue)}
    </Button>
  );
};
export default SlugGenerator;
