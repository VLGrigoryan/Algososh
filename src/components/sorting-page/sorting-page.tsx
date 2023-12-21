import React, { useState, FormEvent, useEffect } from "react";
import { Button, SolutionLayout, RadioInput, Column } from "../ui";
import { getSortingSteps, generateRandomArray } from "../../utils";
import { ILetter } from "../../types/string";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SortingMethod } from "../../types/sorting-method";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<ILetter<number>[]>(generateRandomArray());
  const [selectedMethod, setSortingMethod] = useState(SortingMethod.Selection);
  const [steps, setSteps] = useState<ILetter<number>[][]>([]);
  const [currStep, setCurrStep] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction | null>(null);

  useEffect(() => {
    if (currStep === null || currStep === steps.length - 1) {
      setLoading(false);
      setDirection(null);
      return;
    }
    setTimeout(() => setCurrStep(currStep + 1), SHORT_DELAY_IN_MS);
  }, [currStep, steps]);

  const handleSorting = (sortingDirection: Direction) => {
    setLoading(true);
    setSteps(getSortingSteps(arr, selectedMethod, sortingDirection));
    setCurrStep(0);
    setDirection(sortingDirection);
  };

  const renderColumns = (lettersArray: ILetter<number>[]) =>
    lettersArray.map((item, index) => (
      <li key={index} className={`mr-4 ml-4`}>
        <Column index={item.value} state={item.state} />
      </li>
    ));

  return (
    <SolutionLayout title="Сортировка массива">
      <form
        className={styles.centeredContainer}
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSorting(Direction.Ascending);
        }}
      >
        <RadioInput
          label="Выбор"
          name="sortingMethod"
          checked={selectedMethod === SortingMethod.Selection}
          onChange={() => setSortingMethod(SortingMethod.Selection)}
          disabled={loading}
        />
        <RadioInput
          label="Пузырёк"
          name="sortingMethod"
          extraClass={"mr-25 ml-20"}
          checked={selectedMethod === SortingMethod.Bubble}
          onChange={() => setSortingMethod(SortingMethod.Bubble)}
          disabled={loading}
        />
        <Button
          text="По возрастанию"
          type="submit"
          sorting={Direction.Ascending}
          isLoader={direction === Direction.Ascending}
          disabled={loading}
        />
        <Button
          text="По убыванию"
          type="submit"
          sorting={Direction.Descending}
          extraClass={`ml-5 mr-35`}
          isLoader={direction === Direction.Descending}
          disabled={loading}
        />
        <Button
          onClick={() => {
            setCurrStep(null);
            setArr(generateRandomArray());
          }}
          text="Новый массив"
          disabled={loading}
        />
      </form>
      <ul className={styles.SortingList}>
        {currStep !== null
          ? renderColumns(steps[currStep])
          : renderColumns(arr)}
      </ul>
    </SolutionLayout>
  );
};

