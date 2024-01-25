import React from "react";
import { render, screen, within } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle Component", () => {
  it("should render without letter", () => {
    render(<Circle />);
    expect(screen.getByTestId("circle")).toBeInTheDocument();
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle without letter");
  });

  it("should render with letter", () => {
    render(<Circle letter="A" />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle with letter A");
  });

  it("should render with head", () => {
    render(<Circle head="Head" />);
    expect(screen.getByText("Head")).toBeInTheDocument();
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle with head 'Head'");
  });

  it("should render with react element in head", () => {
    const reactElement = <span>React Element</span>;
    render(<Circle head={reactElement} />);
    expect(screen.getByText("React Element")).toBeInTheDocument();
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle with React Element in head");
  });

  it("should render with tail", () => {
    render(<Circle tail="Tail" />);
    expect(screen.getByText("Tail")).toBeInTheDocument();
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle with tail 'Tail'");
  });

  it("should render with react element in tail", () => {
    const reactElement = <span>React Element</span>;
    render(<Circle tail={reactElement} />);
    expect(screen.getByText("React Element")).toBeInTheDocument();
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle with React Element in tail");
  });

  it("should render with index", () => {
    render(<Circle index={42} />);
    const circle = screen.getByTestId("circle");
    const index = within(circle).getByTestId("index");
    expect(index).toHaveTextContent("42");
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle with index 42");
  });

  it("should render with isSmall prop as true", () => {
    render(<Circle isSmall={true} />);
    const circle = screen.getByTestId("circle");
    const smallCircle = within(circle).getByTestId("state");

    expect(screen.getByTestId("state")).toHaveClass("small");
    expect(circle).toMatchSnapshot("Circle with isSmall prop as true");
  });
  
  it("should render in 'default' state", () => {
    render(<Circle state={ElementStates.Default} />);
    const circle = screen.getByTestId("circle");
    expect(screen.getByTestId("state")).toHaveClass("default");
    expect(circle).toMatchSnapshot("Circle in default state");
  });

  it("should render in 'changing' state", () => {
    render(<Circle state={ElementStates.Changing} />);
    expect(screen.getByTestId("state")).toHaveClass("changing");
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle in changing state");
  });

  it("should render in 'modified' state", () => {
    render(<Circle state={ElementStates.Modified} />);
    expect(screen.getByTestId("state")).toHaveClass("modified");
    expect(screen.getByTestId("circle")).toMatchSnapshot("Circle in modified state");
  });
});
