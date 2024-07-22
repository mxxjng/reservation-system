import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";

import { useFilterData } from "@/hooks/useFilterData";

describe("useFilterData", () => {
  it("should return a default search term and original items", () => {
    const items = [{ title: "Star Wars" }];
    const { result } = renderHook(() => useFilterData(items, "title"));

    expect(result.current.search).toBe("");
    expect(result.current.filteredData).toEqual(items);
  });

  it("should return a filtered list", () => {
    const items = [{ title: "Star Wars" }, { title: "Star Trek" }];
    const { result } = renderHook(() => useFilterData(items, "title"));

    // update the search term
    act(() => {
      result.current.setSearch("Wars");
    });

    expect(result.current.search).toBe("Wars");
    expect(result.current.filteredData).toEqual([{ title: "Star Wars" }]);
  });
});
