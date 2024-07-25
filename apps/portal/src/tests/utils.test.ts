import { hasRequiredPermissions } from "@/utils/utils";
import { describe, expect, it } from "vitest";

describe("hasRequiredPermissions", () => {
  it("Has all permissions", () => {
    expect(hasRequiredPermissions(["reservation:read"], ["reservation:read"])).toEqual(true);
  });

  it("Has not all permissions", () => {
    expect(
      hasRequiredPermissions(["reservation:read", "reservation:write"], ["reservation:read"])
    ).toEqual(false);
  });
});
