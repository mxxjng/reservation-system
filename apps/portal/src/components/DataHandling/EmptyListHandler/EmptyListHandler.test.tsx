import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyListHandler } from "./EmptyListHandler";

describe("EmpyListHandler", async () => {
  it("Correctly renders empty list", async () => {
    render(<EmptyListHandler length={0} children={<div>Success</div>} />);

    const message = screen.getByText("No Data. Please try again");
    expect(message).toBeDefined();
  });

  it("Correctly renders a list list", async () => {
    render(<EmptyListHandler length={1} children={<div>List</div>} />);

    const message = screen.getByText("List");
    expect(message).toBeDefined();
  });
});
