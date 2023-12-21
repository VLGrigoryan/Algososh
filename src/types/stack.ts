import { ElementStates } from "./element-states";

export interface IElements {
  value: string;
  state: ElementStates;
  isHead: boolean;
  isTail: boolean;
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => T | undefined;
  clear: () => void;
  getElements: () => T[];
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  push = (item: T): void => {
    this.container.push(item);
  };
  pop = (): T | undefined => this.container.pop();
  clear = (): void => {
    this.container.length = 0;
  };
  getElements = (): T[] => this.container;
  getSize = (): number => this.container.length;

  initializeWithSize(size: number): void {
    this.container = new Array<T>(size);
  }
}
