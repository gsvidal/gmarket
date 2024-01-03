import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Modal } from ".";

beforeEach(() => {
  render(<Modal children={<div>Test Child</div>} onClose={() => {}}></Modal>);
});

describe("Modal", () => {
  it("renders the children prop", () => {
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
