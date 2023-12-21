import { ElementStates } from "./element-states";

export interface ICircle {
  value: string;
  type: "top" | "bottom";
}

export interface IListArrItem {
  value: string;
  circle: ICircle | undefined;
  state: ElementStates;
}

export interface IStateLoading {
  addToHead: boolean;
  addToTail: boolean;
  deleteFromHead: boolean;
  deleteFromTail: boolean;
  addByIndex: boolean;
  deleteByIndex: boolean;
}

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export interface INodeList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  deleteFromHead: () => void;
  deleteFromTail: () => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  getSize: () => number;
  getArr: () => T[];
}