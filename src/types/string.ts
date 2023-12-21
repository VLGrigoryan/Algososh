import { ElementStates } from "./element-states";

export interface ILetter<T> {
    value: T;
    state: ElementStates;
    isHead?: boolean;
    isTail?: boolean;
  }
  