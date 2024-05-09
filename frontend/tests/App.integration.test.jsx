import App from "@frontend-ui/App";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
describe("App renders without issue.", () => {
  it("renders the App component", () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
