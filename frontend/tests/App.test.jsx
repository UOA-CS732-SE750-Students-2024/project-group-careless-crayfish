import App from "@frontend-ui/App";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
