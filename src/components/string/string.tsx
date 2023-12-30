import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./string.module.css";
import { generatePalindromeSteps } from "../../utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { Button, Input, SolutionLayout, Circle } from "../ui";
import { ILetter } from "../../types/string";

export const StringComponent: React.FC = () => {
  const [str, setStr] = useState<string>("");
  const [steps, setSteps] = useState<ILetter<string>[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
      setIsLoading(false);
    } else {
      const timeout = setTimeout(() => {
        setCurrStep(currStep + 1);
      }, DELAY_IN_MS);

      return () => clearTimeout(timeout);
    }
  }, [currStep, steps]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setSteps(generatePalindromeSteps(str));
    setCurrStep(0);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.centeredContainer} onSubmit={handleSubmit}>
        <Input
          maxLength={11}
          isLimitText
          extraClass={`${styles.inputContainer} mr-6 mb-30`}
          name="string"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStr(e.target.value)}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={!str}
          linkedList={(str !== null && str.trim() !== '') ? 'small' : undefined}
        />
      </form>
      <ul className={`${styles.centeredContainer} mt-30`}>
        {currStep !== null &&
          steps[currStep].map(({ value, state }, index) => (
            <li key={index} className={`mr-4 ml-4`}>
              <Circle letter={value} state={state} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};

