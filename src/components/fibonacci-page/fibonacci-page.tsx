import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./fibonacci-page.module.css";
import { generateFibonacciSequence } from "../../utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Button, Input, SolutionLayout, Circle } from "../ui";

export const FibonacciPage: React.FC = () => {
  const [str, setStr] = useState("");
  const [steps, setSteps] = useState<number[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const justifyContent =
    currStep && steps[currStep].length > 10 ? "flex-start" : "center";

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
      setIsLoading(false);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrStep(currStep + 1);
    }, SHORT_DELAY_IN_MS);

    return () => clearTimeout(timeout);
  }, [currStep, steps]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    setSteps(generateFibonacciSequence(+str));
    setCurrStep(0);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.centeredContainer} onSubmit={handleSubmit}
      >
        <Input
          max={19}
          min={0}
          isLimitText
          type="number"
          extraClass={`${styles.inputContainer} mr-6 mb-30`}
          name="fibo"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStr(e.target.value)}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={isLoading}
          disabled={!str || +str > 19 || +str < 0}
          linkedList={'small'}

        />
      </form>
      <ul className={styles.centeredContainer} style={{ justifyContent, marginTop: '60px' }} >
        {currStep !== null &&
          steps[currStep].map((item, index) => (
            <li key={index} className={`mr-4 ml-4 mb-8 mt-8 pb-8`}>
              <Circle letter={item.toString()} index={index} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
