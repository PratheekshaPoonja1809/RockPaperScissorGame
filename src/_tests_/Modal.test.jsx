import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Modal from "../utils/Modal";

describe("Modal Component", () => {
  test("renders with provided text and children", () => {
    render(
      <Modal text="Match Completed">
        <p>Start Over?</p>
      </Modal>
    );
    expect(screen.getByText("Match Completed")).toBeInTheDocument();
    expect(screen.getByText("Start Over?")).toBeInTheDocument();
  });

  test("renders with default text if none provided", () => {
    render(<Modal>Test Content</Modal>);
    expect(screen.getByRole("heading")).toHaveTextContent("");
  });

  test("calls onClose when close icon is clicked", () => {
    const mockClose = vi.fn();
    render(
      <Modal text="Close Test" onClose={mockClose}>
        Modal Body
      </Modal>
    );

    const closeIcon = screen.getByTestId("close-icon");
    fireEvent.click(closeIcon);

    expect(mockClose).toHaveBeenCalledWith(false);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("applies custom width when passed", () => {
    render(
      <Modal text="Width Test" width="400px">
        Sized modal
      </Modal>
    );
    const modal = screen.getByText("Width Test").closest("section");
    expect(modal).toHaveStyle("width: 400px");
  });
});
