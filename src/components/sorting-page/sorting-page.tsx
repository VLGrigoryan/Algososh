import React, { useState, FormEvent, useEffect } from "react";
import { Button, SolutionLayout, RadioInput, Column } from "../ui";
import { getSortingSteps, generateRandomArray } from "../../utils";
import { ILetter } from "../../types/string";
import styles from "./sorting-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { SortingMethod, Direction } from "../../types";

export const SortingPage: React.FC = () => {
  const [arr, setArray] = useState<ILetter<number>[]>(generateRandomArray());
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

  const handleSortingAscending = () => {
    setDirection(Direction.Ascending);
    setLoading(true);
    setSteps(getSortingSteps(arr, selectedMethod, Direction.Ascending));
    setCurrStep(0);
  }

  const handleSortingDescending = () => {
    setDirection(Direction.Descending);
    setLoading(true);
    setSteps(getSortingSteps(arr, selectedMethod, Direction.Descending));
    setCurrStep(0);
  };

  const renderColumns = (lettersArray: ILetter<number>[]) =>
    lettersArray.map((item, index) => (
      <li key={index} className={`mr-4 ml-4`}>
        <Column index={item.value} state={item.state} />
      </li>
    ));

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.centeredContainer}>
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
          onClick={() => { handleSortingAscending() }}
        />
        <Button
          text="По убыванию"
          type="submit"
          sorting={Direction.Descending}
          extraClass={`ml-5 mr-35`}
          isLoader={direction === Direction.Descending}
          disabled={loading}
          onClick={() => { handleSortingDescending() }}
        />
        <Button
          onClick={() => {
            setCurrStep(null);
            setArray(generateRandomArray());
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

