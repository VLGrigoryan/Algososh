import React, { useState, ChangeEvent } from "react";
import {
  Button,
  SolutionLayout,
  Input,
  Circle,
  ArrowIcon
} from "../ui";
import { ElementStates } from "../../types/element-states";
import styles from './list-page.module.css';
import { getRandomListArr, list, IStateLoading, delay, ICircle } from "../../utils";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [listArr, setListArr] = useState(getRandomListArr(list));
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState<IStateLoading>({
    addToHead: false,
    addToTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });

  const updateListArrState = (index: number, newState: ElementStates, circle?: ICircle) => {
    setListArr(prevArr => {
      const updatedArr = [...prevArr];
      updatedArr[index] = { ...updatedArr[index], state: newState, circle };
      return updatedArr;
    });
  };

  const modifyList = async (action: () => void, index: number, state: ElementStates, circle?: ICircle) => {
    setLoading((prevloading) => ({ ...prevloading, action: true }));
    setDisabled(true);
    action();
    await delay(500);
    updateListArrState(index, state, circle);
    setLoading((prevloading) => ({ ...prevloading, action: false }));
    setDisabled(false);
  };

  const handleAddFromHead = () => modifyList(() => list.prepend(inputValue), 0, ElementStates.Modified, { value: inputValue, type: 'top' });
  const handleAddFromTail = () => modifyList(() => list.append(inputValue), listArr.length - 1, ElementStates.Modified, { value: inputValue, type: 'top' });
  const handleDeleteFromHead = () => modifyList(() => list.deleteFromHead(), 0, ElementStates.Changing, { value: listArr[0].value, type: 'bottom' });
  const handleDeleteFromTail = () => modifyList(() => list.deleteFromTail(), listArr.length - 1, ElementStates.Changing, { value: listArr[listArr.length - 1].value, type: 'bottom' });

  const handleAddByIndex = async () => {
    setLoading({ ...loading, addByIndex: true });
    setDisabled(true);

    const index = parseInt(inputIndex);
    if (index === list.getSize()) {
      setInputIndex('');
      handleAddFromTail();
      return;
    }
    list.addByIndex(inputValue, index);
    for (let i = 0; i <= index; i++) {
      updateListArrState(i, ElementStates.Changing, { value: inputValue, type: 'top' });
      await delay(500);
      if (i > 0) {
        updateListArrState(i - 1, ElementStates.Default);
      }
    }
    await delay(500);
    updateListArrState(index, ElementStates.Default);
    setListArr(prevArr => [
      ...prevArr.slice(0, index),
      { value: inputValue, state: ElementStates.Modified, circle: undefined },
      ...prevArr.slice(index),
    ]);
    await delay(500);
    setListArr(prevArr => prevArr.map(item => ({ ...item, state: ElementStates.Default })));
    setInputValue('');
    setInputIndex('');
    setLoading({ ...loading, addByIndex: false });
    setDisabled(false);
  };

  const handleDeleteByIndex = async () => {
    setLoading({ ...loading, deleteByIndex: true });
    setDisabled(true);
    const index = parseInt(inputIndex);
    list.deleteByIndex(index);
    for (let i = 0; i <= index; i++) {
      updateListArrState(i, ElementStates.Changing);
      await delay(500);
    }
    updateListArrState(index, ElementStates.Changing, { value: listArr[index].value, type: 'bottom' });
    await delay(500);
    setListArr(prevArr => prevArr.slice(0, index).concat(prevArr.slice(index + 1)));
    updateListArrState(index - 1, ElementStates.Modified);
    await delay(500);
    setListArr(prevArr => prevArr.map(item => ({ ...item, state: ElementStates.Default })));
    await delay(500);
    setListArr(prevArr => prevArr.map(item => ({ ...item, state: ElementStates.Default })));
    setInputIndex('');
    setLoading({ ...loading, deleteByIndex: false });
    setDisabled(false);
  };

  return (
    <SolutionLayout title='Связный список'>
      <form className={`mb-20 ${styles.centeredContainer} `}>
        <Input
          placeholder='Введите значение'
          isLimitText
          maxLength={4}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          extraClass={`${styles.small} mr-3 mb-3`}
        />
        <Button
          linkedList="small"
          text='Добавить в head'
           onClick={handleAddFromHead}
          isLoader={loading.addToHead}
          disabled={!inputValue || disabled || listArr.length >= 8}
        />
        <Button
          linkedList="small"
          text='Добавить в tail'
           onClick={handleAddFromTail}
          isLoader={loading.addToTail}
          disabled={!inputValue || disabled || listArr.length >= 8}
        />
        <Button
          linkedList="small"
          text='Удалить из head'
           onClick={handleDeleteFromHead}
          isLoader={loading.deleteFromHead}
          disabled={listArr.length <= 1 || disabled}
        />
        <Button
          linkedList="small"
          text='Удалить из tail'
           onClick={handleDeleteFromTail}
          isLoader={loading.deleteFromTail}
          disabled={listArr.length <= 1 || disabled}
        />
        <Input
          placeholder='Введите индекс'
          value={inputIndex}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputIndex(e.target.value)}
          extraClass={styles.small}
          disabled={disabled}
          max={8}
          maxLength={1}
          type={'number'}
        />
        <Button
          linkedList="big"
          text='Добавить по индексу'
           onClick={handleAddByIndex}
          isLoader={loading.addByIndex}
          disabled={
            !inputIndex ||
            !inputValue ||
            disabled ||
            listArr.length >= 8 ||
            Number(inputIndex) > listArr.length - 1
          }
        />
        <Button
          text='Удалить по индексу'
           linkedList="big"
          onClick={handleDeleteByIndex}
          isLoader={loading.deleteByIndex}
          disabled={
            disabled ||
            listArr.length === 0 ||
            Number(inputIndex) > listArr.length - 1 ||
            Number(inputIndex) < 1
          }
        />
      </form>
      <div className={`${styles.sortingList} mt-25`}>
        {listArr.map((item, index, arr) => (
          <div className={styles.wrappedCircle} key={index}>
            <Circle
              key={index}
              index={index}
              letter={item.value}
              state={item.state}
              head={index === 0 ? 'head' : ''}
              tail={index === list.getSize() - 1 ? 'tail' : ''}
            />
            {index < arr.length - 1 && <ArrowIcon fill={'#0032FF'} />}
            {item.circle && (
              <div className={`${styles.smallCircle} ${item.circle.type === 'top' ? styles.circleTop : styles.circleBottom}`}>
                <Circle letter={item.circle.value} isSmall={true} state={ElementStates.Changing} />
              </div>
            )}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
