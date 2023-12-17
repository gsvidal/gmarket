import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  it("should render input with correct label", () => {
    render(
      <Input
        labelText="Test Label"
        type="text"
        placeholder="Test Placeholder"
        name="testName"
      />
    );

    expect(screen.getByLabelText(/Test Label:/i)).toBeInTheDocument();
  });

  it("should render input with correct placeholder", () => {
    render(
      <Input
        labelText="Test Label"
        type="text"
        placeholder="Test Placeholder"
        name="testName"
      />
    );

    expect(screen.getByPlaceholderText(/Test Placeholder/i)).toBeInTheDocument();
  });

  it("should render input with correct type", () => {
    render(
      <Input
        labelText="Test Label"
        type="password"
        placeholder="Test Placeholder"
        name="testName"
      />
    );

    expect(screen.getByLabelText(/Test Label:/i)).toHaveAttribute("type", "password");
  });

  it("should render input with correct name", () => {
    render(
      <Input
        labelText="Test Label"
        type="text"
        placeholder="Test Placeholder"
        name="testName"
      />
    );

    expect(screen.getByLabelText(/Test Label:/i)).toHaveAttribute("name", "testName");
  });
});