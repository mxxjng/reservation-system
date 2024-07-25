import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";

import { useFilterData } from "@/hooks/useFilterData";
import { usePermissions } from "@/hooks/usePermissions";

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

    act(() => {
      result.current.setSearch("Wars");
    });

    expect(result.current.search).toBe("Wars");
    expect(result.current.filteredData).toEqual([{ title: "Star Wars" }]);
  });
});

describe("usePermissions", () => {
  it("should display correct permissions for one case", () => {
    const { result } = renderHook(() =>
      usePermissions([{ case: "hasRequiredPermissions", permissions: ["reservation:read"] }])
    );

    expect(result.current.hasRequiredPermissions).toEqual(true);
  });

  it("should display correct permissions for two cases", () => {
    const { result } = renderHook(() =>
      usePermissions([
        { case: "hasRequiredPermissions", permissions: ["reservation:read"] },
        { case: "reservation:read", permissions: ["reservation:read"] },
      ])
    );

    expect(result.current.hasRequiredPermissions).toEqual(true);
    expect(result.current["reservation:read"]).toEqual(true);
  });

  it("should display correct permissions for two cases", () => {
    const { result } = renderHook(() =>
      usePermissions([
        { case: "hasRequiredPermissions", permissions: [""] },
        { case: "reservation:read", permissions: [""] },
      ])
    );

    expect(result.current.hasRequiredPermissions).toEqual(false);
    expect(result.current["reservation:read"]).toEqual(false);
  });

  it("should display correct permissions for non extistend permissions", () => {
    const { result } = renderHook(() =>
      usePermissions([{ case: "reservation:read", permissions: ["abc", "dfe"] }])
    );

    expect(result.current["reservation:read"]).toEqual(false);
  });

  it("should display correct permissions if user doesnt have all permissions", () => {
    const { result } = renderHook(() =>
      usePermissions([{ case: "hasRequiredPermissions", permissions: ["abc", "dfe", "read"] }])
    );

    expect(result.current.hasRequiredPermissions).toEqual(false);
  });

  it("should display correct permissions if user doesnt have all permissions", () => {
    const { result } = renderHook(() =>
      usePermissions([
        { case: "hasRequiredPermissions", permissions: ["reservation:write", "reservation:read"] },
      ])
    );

    expect(result.current.hasRequiredPermissions).toEqual(false);
  });
});
