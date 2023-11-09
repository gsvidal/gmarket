import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  // AIM
  render(<App />);
});

describe("App", () => {
  it("should render app title", () => {
    // ACT
    // ASSERT
    const appTitleElement = screen.getByRole("heading", {
      level: 1,
      name: "G Market"
    });
    expect(appTitleElement).toBeInTheDocument();
  });
});
