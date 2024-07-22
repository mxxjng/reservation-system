import { describe, it, expect } from "vitest";
import LoadingHandler from "./LoadingHandler";
import { render, screen } from "@testing-library/react";

describe("LoadingHandlerComponent", async () => {
  it("Correctly renders loadingstate", async () => {
    render(<LoadingHandler status="loading" children={<div>Success</div>} />);

    const loading = screen.getByText("Loading...");
    expect(loading).toBeDefined();
  });

  it("Correctly renders default error state", async () => {
    render(<LoadingHandler status="error" children={<div>Success</div>} />);

    const error = screen.getByText("Error fetching data");
    expect(error).toBeDefined();
  });

  it("Correctly renders custom error state", async () => {
    render(
      <LoadingHandler
        status="error"
        errorComponent={<div>Error fetching books</div>}
        children={<div>Success</div>}
      />
    );

    const error = screen.getByText("Error fetching books");
    expect(error).toBeDefined();
  });

  it("Correctly renders success state", async () => {
    render(
      <LoadingHandler
        status="success"
        errorComponent={<div>Error fetching books</div>}
        children={<div>Success</div>}
      />
    );

    const success = screen.getByText("Success");
    expect(success).toBeDefined();
  });
});
