import { expect, test, it } from "vitest";
import { render, screen } from "@testing-library/react";

test("string input", async () => {
  render(<h1>Hello World</h1>);
  expect(
    screen.getByRole("heading", { level: 1, name: "Hello World" })
  ).toBeDefined();
});
