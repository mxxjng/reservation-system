import { expect, it } from "vitest";

import { hasRequiredRole } from "~/utils/auth";

it("it should pass", () => {
  expect(hasRequiredRole(["ADMIN"], "ADMIN")).toBe(true);
});
