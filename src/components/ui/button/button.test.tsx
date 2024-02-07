import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";
import { Direction } from "../../../types/direction";

describe("Button component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders with default props", () => {
    render(<Button />);
    const button = screen.getByTestId("button");

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  it("renders with specified text", () => {
    render(<Button text="Click me" />);
    const button = screen.getByTestId("button");

    expect(button).toHaveTextContent("Click me");
    expect(button).toMatchSnapshot();
  });

  it("renders with AscendingIcon for sorting", () => {
    render(<Button sorting={Direction.Ascending} />);
    const button = screen.getByTestId("button");
    const ascendingIcon = screen.getByTestId("ascending-icon");

    expect(button).toContainElement(ascendingIcon);
    expect(button).toMatchSnapshot();
  });

  it("renders with DescendingIcon for sorting", () => {
    render(<Button sorting={Direction.Descending} />);
    const button = screen.getByTestId("button");
    const descendingIcon = screen.getByTestId("descending-icon");

    expect(button).toContainElement(descendingIcon);
    expect(button).toMatchSnapshot();
  });

  it("disables when isLoader is true", () => {
    render(<Button isLoader />);
    const button = screen.getByTestId("button");

    expect(button).toBeDisabled();
    expect(button).toMatchSnapshot();
  });

  it("does not call onClick when disabled", () => {
    const mockCb = jest.fn();
    render(<Button onClick={mockCb} disabled={true} />);
    const button = screen.getByTestId("button");
  
    userEvent.click(button);
  
    expect(mockCb).not.toHaveBeenCalled(); 
    expect(button).toMatchSnapshot();
  });

  it("does not call onClick when disabled", () => {
    const mockCb = jest.fn();
    render(<Button onClick={mockCb} disabled={true} />);
    const button = screen.getByTestId("button");

    userEvent.click(button);

    expect(mockCb).not.toHaveBeenCalled();
    expect(button).toMatchSnapshot();

  });
});