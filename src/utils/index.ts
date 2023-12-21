import { ElementStates } from "../types/element-states";
import { Direction } from "../types/direction";
import { SortingMethod } from "../types/sorting-method";
import { ILetter } from "../types/string";
import { Stack } from "../types/stack";
// import { ICircle, IListArrItem, Node,INodeList } from "../types/list";
import { IQueue } from "../types/queue";


// StringPage
function swap<T>(arr: T[], i1: number, i2: number): void {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

function updateStates(
  lettersArray: ILetter<string>[],
  idx: number,
  state: ElementStates
): void {
  lettersArray[idx] = { ...lettersArray[idx], state };
}

export function generatePalindromeSteps(
  inputString: string
): ILetter<string>[][] {
  const lettersArray: ILetter<string>[] = inputString.split("").map((char) => ({
    value: char,
    state: ElementStates.Default,
  }));
  const allSteps: ILetter<string>[][] = [[...lettersArray]];
  let startIdx = 0;
  let endIdx = lettersArray.length - 1;

  while (startIdx <= endIdx) {
    const isSingleIndex = startIdx === endIdx;

    updateStates(lettersArray, startIdx, ElementStates.Changing);
    updateStates(
      lettersArray,
      isSingleIndex ? startIdx : endIdx,
      ElementStates.Changing
    );

    allSteps.push([...lettersArray]);
    swap(lettersArray, startIdx, endIdx);

    updateStates(lettersArray, startIdx, ElementStates.Modified);
    updateStates(
      lettersArray,
      isSingleIndex ? startIdx : endIdx,
      ElementStates.Modified
    );

    allSteps.push([...lettersArray]);
    startIdx++;
    endIdx--;
  }

  return allSteps;
}

//FibanacciPage
export function generateFibonacciSequence(n: number): number[][] {
  if (n === 0) {
    return [[1]];
  }

  const result: number[][] = [[1], [1, 1]];
  let [a, b] = [1, 1];

  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
    result.push([...result[result.length - 1], b]);
  }

  return result;
}

//SortingPage
const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomArray = (): ILetter<number>[] =>
  Array.from({ length: getRandomInteger(3, 17) }, () => ({
    value: getRandomInteger(0, 100),
    state: ElementStates.Default,
  }));

export const getSortingSteps = (
  arr: ILetter<number>[],
  method: SortingMethod,
  direction?: Direction | null
) => {
  const steps: ILetter<number>[][] = [];
  const copy = [...arr];
  const { length } = copy;

  const setChangingState = (index: number) => {
    copy[index] = { ...copy[index], state: ElementStates.Changing };
  };

  const setModifiedState = (index: number) => {
    copy[index] = { ...copy[index], state: ElementStates.Modified };
  };

  const setDefaultState = (index: number) => {
    copy[index] = { ...copy[index], state: ElementStates.Default };
  };

  const swapAndUpdate = (index1: number, index2: number) => {
    swap(copy, index1, index2);
    swap(arr, index1, index2);
  };

  for (let i = 0; i < length - 1; i++) {
    setChangingState(i);
    let selectedIndex = i;
    for (let j = i + 1; j < length; j++) {
      setChangingState(j);
      steps.push([...copy]);

      const shouldSwap =
        direction === Direction.Ascending
          ? copy[j].value < copy[selectedIndex].value
          : copy[j].value > copy[selectedIndex].value;
      if (shouldSwap) {
        setDefaultState(selectedIndex);
        selectedIndex = j;
      } else {
        setDefaultState(j);
      }
    }
    if (i !== selectedIndex) {
      swapAndUpdate(i, selectedIndex);
      setDefaultState(selectedIndex);
    }
    setModifiedState(i);

    if (i === length - 2) {
      setModifiedState(length - 1);
    }
    steps.push([...copy]);
  }

  return steps;
};

// StackPage
export function updateStackWithAction(
  stack: Stack<ILetter<string>>,
  str: string,
  loaderPos: "push" | "pop" | null
): ILetter<string>[][] {
  const steps: ILetter<string>[][] = [];
  const letter: ILetter<string> = { value: str, state: ElementStates.Default };

  if (loaderPos === "push") {
    steps.push([
      ...stack.getElements(),
      { ...letter, state: ElementStates.Changing },
    ]);
    steps.push([...stack.getElements(), letter]);
    stack.push(letter);
  } else {
    const poppedLetter = stack.pop();
    if (poppedLetter) {
      steps.push([
        ...stack.getElements(),
        { ...poppedLetter, state: ElementStates.Changing },
      ]);
      steps.push([...stack.getElements()]);
    }
  }

  return steps;
}

// queue
export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private length = 0;

  constructor(private readonly size: number) {
    this.container = Array(size);
  }

  private isFull(): boolean {
    return this.length >= this.size;
  }

  enqueue(item: T): void {
    if (this.isFull()) {
      console.error("Maximum length exceeded");
      return;
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  }

  dequeue(): void {
    if (this.isEmpty()) {
      console.error("No elements in the queue");
      return;
    }
    this.container[this.head % this.size] = undefined;
    this.length--;
    this.head++;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  }

  getHead(): number {
    return this.head;
  }

  getTail(): number {
    return this.tail;
  }

  getSize(): number {
    return this.size;
  }

  getQueue(): Array<T | undefined> {
    return [...this.container];
  }

  getLength(): number {
    return this.length;
  }
}

//listPage
export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
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
export class LinkedListNode<T> implements INodeList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(arr: T[]) {
    this.head = null;
    this.size = 0;
    arr.forEach((item) => this.append(item));
  }

  append(item: T) {
    const node = new Node(item);
    let curr;

    if (this.head === null) {
      this.head = node;
    } else {
      curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  prepend(item: T): void {
    const node = new Node(item, this.head);
    this.head = node;
    this.size++;
  }

  deleteFromHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteFromTail() {
    let curr;
    if (!this.head?.next) {
      this.head = null;
    } else {
      curr = this.head;
      while (curr.next?.next) {
        curr = curr.next;
      }
      curr.next = null;
    }
    this.size--;
  }

  addByIndex(item: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    if (!this.head || index <= 0) {
      this.prepend(item);
    } else if (index >= this.size - 1) {
      this.append(item);
    } else {
      let curr = this.head;
      let currIndex = 0;

      while (currIndex !== index - 1 && curr.next) {
        curr = curr.next;
        currIndex++;
      }

      const node = new Node(item, curr.next);
      curr.next = node;
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    let curr = this.head;
    if (index === 0) {
      if (this.head) this.head = this.head?.next;
    } else {
      let prev = null;
      let currIndex = 0;
      while (currIndex++ < index) {
        prev = curr;
        if (curr) {
          curr = curr.next;
        }
      }
      if (prev?.next) prev.next = curr?.next ? curr.next : null;
    }
    this.size--;
  }

  getSize() {
    return this.size;
  }

  getArr() {
    let curr = this.head;
    let arr: T[] = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}

export const randomInt = (min: number, max: number): string =>
  String(Math.floor(min + Math.random() * (max + 1 - min)));

export const randomArr = (length: number): string[] =>
  Array.from({ length }, () => randomInt(0, 100));

export const randomArray = randomArr(4);

export const list = new LinkedListNode<string>(randomArray);

export const getRandomListArr = (
  list: LinkedListNode<string>
): IListArrItem[] =>
  list.getArr().map((item) => ({
    value: item,
    state: ElementStates.Default,
    circle: undefined,
  }));
