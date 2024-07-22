import { useMemo, useState } from "react";

// function to filter data based on the search input - currently supports only string values
export function filterDataSet<T extends Record<string, any>, K extends keyof T>(
  data: T[],
  key: K,
  value: T[K]
) {
  return data.filter((item) => {
    if (!value) return true;

    if (typeof item[key] === "string") {
      return item[key].toLowerCase().includes(value.toLowerCase());
    }

    return false;
  });
}

// custom hook to filter data based on the search input
export function useFilterData<T>(data: T[], key: keyof T) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(
    () => filterDataSet(data as any, key as string, search),
    [data, key, search]
  );

  return { filteredData, search, setSearch };
}
