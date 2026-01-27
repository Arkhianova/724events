import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Field, { FIELD_TYPES } from "./index";


describe("When a field is created", () => {
  it("a name is set on the field", () => {
    render(<Field label="field-name" />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement).toBeInTheDocument();
    expect(fieldElement.name).toEqual("field-name");
  });
  it("a placeholder is set on the field", () => {
    render(<Field placeholder="field-placeholder" name="test" />);
    const fieldElement = screen.getByTestId("field-testid");
    expect(fieldElement.placeholder).toEqual("field-placeholder");
  });

  it("a label is set with field", () => {
    render(<Field placeholder="field-placeholder" label="field_label" name="test" />);
    const labelElement = screen.getByText(/field_label/);
    expect(labelElement).toBeInTheDocument();
  });

  describe("and its valued changed", () => {
    it("a onChange value is executed", () => {
      const onChange = vi.fn();
      render(<Field onChange={onChange} name="test" />);
      const fieldElement = screen.getByTestId("field-testid");
      fireEvent.change(fieldElement, {
        bubbles: true,
        cancelable: true,
        target: { value: "hello" },
        });     
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(fieldElement.value).toBe("hello");
    });
  });

  describe("and its type is set to FIELD_TYPES.INPUT_TEXT", () => {
    it("a text input is rendered", () => {
      window.console.error = vi.fn().mockImplementation(() => null); // disable propTypes warning
      render(<Field type={FIELD_TYPES.INPUT_TEXT} name="test" />);
      const fieldElement = screen.getByTestId("field-testid");
      expect(fieldElement.type).toEqual("text");
    });
  });

  describe("and its type is set to FIELD_TYPES.TEXTAREA", () => {
    it("a textarea is rendered", () => {
      window.console.error = vi.fn().mockImplementation(() => null); // disable propTypes warning
      render(<Field type={FIELD_TYPES.TEXTAREA} name="test" />);
      const fieldElement = screen.getByTestId("field-testid");
      expect(fieldElement.type).toEqual("textarea");
    });
  });

  describe("and its type is set to a wrong value", () => {
    it("a text input is rendered", () => {
      window.console.error = vi.fn().mockImplementation(() => null); // disable propTypes warning
      render(<Field type="wrong-type" name="test" />);
      const fieldElement = screen.getByTestId("field-testid");
      expect(fieldElement.type).toEqual("text");
    });
  });
});
