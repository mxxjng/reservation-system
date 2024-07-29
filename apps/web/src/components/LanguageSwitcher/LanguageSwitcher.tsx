import { Group, Select, SelectProps } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";

const iconProps = {
  stroke: 1.5,
  color: "currentColor",
  opacity: 0.6,
  size: 18,
};

const icons: Record<string, React.ReactNode> = {
  de: (
    <div style={{ height: 10, width: 15 }} className="flag-de">
      {" "}
    </div>
  ),
  en: (
    <div style={{ height: 10, width: 15 }} className="flag-gb">
      {" "}
    </div>
  ),
};

const renderSelectOption: SelectProps["renderOption"] = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
    {checked && <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />}
  </Group>
);

const LanguageSwitcher = () => {
  const router = useRouter();

  const switchLanguage = (locale: string) => {
    const path = router.asPath;

    return router.push(path, path, { locale });
  };

  return (
    <Group gap="xs">
      {icons[router.locale as string]}
      <Select
        maw={120}
        variant="subtle"
        onChange={(val) => switchLanguage(val as string)}
        defaultValue={router.locale}
        data={["en", "de"]}
        renderOption={renderSelectOption}
      />
    </Group>
  );
};

export default LanguageSwitcher;
