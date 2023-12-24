import React, { useState, ChangeEvent } from "react";
import { Button, SolutionLayout, Input, Circle } from "../ui";
import styles from "./queue-page.module.css";
import { Queue } from "./";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { HEAD, TAIL } from "../../constants/element-captions";
const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arr, setArr] = useState(queue.getQueue());
  const [curr, setCurr] = useState(-1);
  const [loaderPosition, setLoaderPosition] = useState<{ push: boolean; pop: boolean }>({ push: false, pop: false });

  const updateState = (action: "push" | "pop", callback: () => void) => {
    setLoaderPosition((prev) => ({ ...prev, [action]: true }));
    callback();
    setArr([...queue.getQueue()]);
    setCurr((action === "push" ? queue.getTail() : queue.getHead()) % queue.getSize());
    setTimeout(() => {
      setCurr(-1);
      setLoaderPosition((prev) => ({ ...prev, [action]: false }));
    }, SHORT_DELAY_IN_MS);
  };

  const enqueue = (value: string) =>
    updateState("push", () => {
      try {
        queue.enqueue(value);
        setInputValue("");
      } catch (error) {
      }
    });

  const dequeue = () =>
    updateState("pop", () => {
      try {
        queue.dequeue();
      } catch (error) {
      }
    });

  const clear = () => {
    setLoaderPosition((prev) => ({ ...prev, clearInt: true }));
    queue.clear();
    setArr([...queue.getQueue()]);
    setLoaderPosition((prev) => ({ ...prev, clearInt: false }));
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.centeredContainer} onSubmit={(evt) => evt.preventDefault()}>
        <Input
          style={{ width: "377px" }}
          maxLength={4}
          isLimitText
          name="string"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        />
        <Button
          text="Добавить"
          disabled={!inputValue || queue.getTail() === 7}
          onClick={() => enqueue(inputValue)}
          isLoader={loaderPosition.push}
          extraClass="mr-6 ml-6"
        />
        <Button
          text="Удалить"
          disabled={(!inputValue && !queue.getLength()) || queue.getHead() === 7}
          onClick={dequeue}
          isLoader={loaderPosition.pop}
        />
        <Button
          text="Очистить"
          onClick={clear}
          extraClass="ml-40"
          disabled={queue.getHead() === 0 && queue.getTail() === 0}
        />
      </form>
      <ul className={styles.sortingList}>
        {arr.map((item, index) => (
          <li key={index} className={`mr-4 ml-4`}>
            <Circle
              index={index}
              letter={item}
              state={index === curr ? ElementStates.Changing : ElementStates.Default}
              head={index === queue.getHead() && queue.isEmpty() === false ? HEAD : ""}
              tail={index === queue.getTail() - 1 && queue.isEmpty() === false ? TAIL : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
