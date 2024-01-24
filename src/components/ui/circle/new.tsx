import { cleanup, render, screen, within } from "@testing-library/react";
import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";

describe("Circle component renders correctly", () => {
  afterEach(cleanup);

  it("without letter", () => {
    render(<Circle />);
    const circle = screen.getByTestId("circle");
    const letter = within(circle).getByTestId("letter");
    expect(letter).toHaveTextContent("");
    expect(circle).toMatchSnapshot();
  });

  it("with letter", () => {
    render(<Circle letter="a32d" />);
    const circle = screen.getByTestId("circle");
    const letter = within(circle).getByTestId("letter");
    expect(letter).toHaveTextContent("a32d");
    expect(circle).toMatchSnapshot();
  });

  it("with head", () => {
    render(<Circle head="head" />);
    const circle = screen.getByTestId("circle");
    const head = within(circle).getByTestId("head");
    expect(head).toHaveTextContent("head");
    expect(circle).toMatchSnapshot();
  });

  it("with head as react-element", () => {
    render(<Circle head={<Circle isSmall />} />);
    const circle = screen.getAllByTestId("circle")[0];
    const head = within(circle).getAllByTestId("head")[0];
    expect(head).toHaveClass("element");
    expect(circle).toMatchSnapshot();
  });

  it("with tail", () => {
    render(<Circle tail="tail" />);
    const circle = screen.getByTestId("circle");
    const tail = within(circle).getByTestId("tail");
    expect(tail).toHaveTextContent("tail");
    expect(circle).toMatchSnapshot();
  });

  it("with tail as react-element", () => {
    render(<Circle tail={<Circle isSmall />} />);
    const circle = screen.getAllByTestId("circle")[0];
    const tail = within(circle).getAllByTestId("tail")[0];
    expect(tail).toHaveClass("element");
    expect(circle).toMatchSnapshot();
  });

  it("with index", () => {
    render(<Circle index={1} />);
    const circle = screen.getByTestId("circle");
    const index = within(circle).getByTestId("index");
    expect(index).toHaveTextContent("1");
    expect(circle).toMatchSnapshot();
  });

  it("with isSmall", () => {
    render(<Circle isSmall />);
    const circle = screen.getByTestId("circle");
    const core = within(circle).getByTestId("core");
    expect(core).toHaveClass("small");
    expect(circle).toMatchSnapshot();
  });

  it("with default state", () => {
    render(<Circle />);
    const circle = screen.getByTestId("circle");
    const core = within(circle).getByTestId("core");
    expect(core).toHaveClass("default");
    expect(circle).toMatchSnapshot();
  });

  it("with changing state", () => {
    render(<Circle state={ElementStates.Changing} />);
    const circle = screen.getByTestId("circle");
    const core = within(circle).getByTestId("core");
    expect(core).toHaveClass("changing");
    expect(circle).toMatchSnapshot();
  });

  it("with modified state", () => {
    render(<Circle state={ElementStates.Modified} />);
    const circle = screen.getByTestId("circle");
    const core = within(circle).getByTestId("core");
    expect(core).toHaveClass("modified");
    expect(circle).toMatchSnapshot();
  });
});
