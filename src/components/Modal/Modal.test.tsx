import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Modal } from ".";

describe("Modal", () => {
  it("renders the children prop", () => {
    render(
      <Modal>
        <div>Test Child</div>
      </Modal>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
