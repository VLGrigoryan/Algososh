import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
import { Button, SolutionLayout, Input, Circle } from "../ui";
import styles from "./stack-page.module.css";
import { updateStackWithAction } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "../../types";
import { ILetter } from "../../types/string";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stackSteps, setStackSteps] = useState<ILetter<string>[][]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderPosition, setLoaderPosition] = useState<"push" | "pop" | null>(null);
  const stack = useMemo(() => new Stack<ILetter<string>>(), []);

  useEffect(() => {
    if (currentStepIndex === null || currentStepIndex === stackSteps.length - 1) {
      setLoading(false);
      setLoaderPosition(null);
      return;
    }
    const timerId = setTimeout(() => setCurrentStepIndex(currentStepIndex + 1), SHORT_DELAY_IN_MS);
    return () => clearTimeout(timerId);
  }, [currentStepIndex, stackSteps]);

  const handleFormSubmit = (action: "push" | "pop") => (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setStackSteps(updateStackWithAction(stack, inputValue, action));
    setCurrentStepIndex(0);
    setInputValue("");
    setLoaderPosition(action);
  };

  const handleFormReset = () => {
    setCurrentStepIndex(null);
    setStackSteps([]);
    stack.clear();
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.centeredContainer} onSubmit={handleFormSubmit("push")} onReset={handleFormReset}>
        <Input
          style={{ width: '377px' }}
          maxLength={4}
          isLimitText
          name="string"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
        <Button
          text="Добавить"
          type="submit"
          isLoader={loaderPosition === "push"}
          disabled={!inputValue || loading}
          extraClass="mr-6 ml-6" />
        <Button
          text="Удалить"
          type="submit"
          onClick={handleFormSubmit("pop")}
          isLoader={loaderPosition === "pop"}
          disabled={loading || stack.getSize() === 0} />
        <Button
          text="Очистить"
          type="reset"
          disabled={stack.getSize() === 0 || loading}
          extraClass="ml-40" />
      </form>
      <ul className={styles.SortingList}>
        {currentStepIndex !== null &&
          stackSteps[currentStepIndex].map((item, index, arr) => (
            <li  key={index} className={`mr-4 ml-4`}>
              <Circle
                 letter={item.value}
                state={item.state}
                index={index}
                head={index === arr.length - 1 ? "top" : null}
              />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
