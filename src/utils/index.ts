import { Direction, SortingMethod, ElementStates,Stack } from "../types";
import { ILetter } from "../types/string";


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
  if (copy.length === 0) {
    return steps
  }
  if (length === 1) {
    const [element] = copy;
    steps.push([{ ...element, state: ElementStates.Changing }]);
    steps.push([{ ...element, state: ElementStates.Modified }]);
    return steps;
  }

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



//listPage
export const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
  export interface ICircle {
    value: string;
    type: "top" | "bottom";
  }
  
