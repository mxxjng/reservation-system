/* Groups an array by a given function */
export function groupBy<T>(array: T[], fn: (item: T) => any) {
  return array.reduce(
    (obj, item) => {
      const key = fn(item).toString();
      if (!obj[key]) {
        obj[key] = [];
      }
      obj[key]!.push(item);
      return obj;
    },
    {} as Record<string, T[]>
  );
}

/* Slug Generator function */
export function normalizeString(str: string) {
  if (typeof str !== "string") {
    return "no slug found";
  }
  // Convert the string to lowercase
  str = str.toLowerCase();

  // Replace German umlauts
  str = str.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");

  // Replace spaces and non-alphanumeric characters with hyphens
  str = str.replace(/[^a-z0-9]/g, "-");

  // Remove leading, trailing, and consecutive hyphens
  str = str.replace(/^-+|-+$|(?<=-)-+/g, "");

  return str;
}

/* Calculates the total number of pages */
export function calculateTotalPages(totalCount: number, limit: number) {
  return Math.ceil(totalCount / limit);
}
