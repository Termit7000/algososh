import React, { FormEvent, useState } from "react";

import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { randomArr } from "./sorting-page-utils";

import { useSelectionSort } from "../../hooks/sort-hook";

import { DELAY_IN_MS } from "../../constants/delays";
import { bubbleSort, delay, selectionSort } from "../../utils";
import { ElementStates } from "../../types/element-states";

import styles from './sorting-page.module.css';

enum EType {
  SELECTION = 'SELECTION',
  BUBBLE = 'BUBBLE'
}

const DELAY = DELAY_IN_MS;

export const SortingPage: React.FC = () => {

  const [sortType, setSortType] = useState(EType.SELECTION);
  const [isCalculating, setCalculating] = useState<boolean>(false);

  const {
    addModified,
    setCurrents,
    isInCurrents,
    isInModified,
    setData,
    clearState,
    data } = useSelectionSort<number>();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(EType).includes(String(e.target.value))) {
      setSortType(e.target.value as EType);
    };
  }

  const newArrayHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setData(randomArr());
  }

  const handleCurrent = async (indexes: number[]) => {
    await delay(DELAY);
    setCurrents(indexes);
  };

  const handleModified = async (index: number) => {
    await delay(DELAY);
    setCurrents([]);
    addModified(index);
  }

  const getState = (index: number): ElementStates => {

    if (isInModified(index)) return ElementStates.Modified;
    if (isInCurrents(index)) return ElementStates.Changing

    return ElementStates.Default;
  };

  const sort = async (direction: 'ASC' | 'DESC') => {

    setCalculating(true);
    clearState();
    if (sortType === EType.BUBBLE) {
      await bubbleSort(data, handleCurrent, handleModified, direction);
    } else {
      await selectionSort(data, handleCurrent, handleModified, direction);
    }

    setCalculating(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">

      <div className={styles.container}>

        <form className={styles.form} onSubmit={submitHandler}>

          <fieldset disabled={isCalculating} className={styles.fieldset}>
            <div onChange={changeHandler} className={styles.radio}>
              <RadioInput
                defaultChecked={sortType === EType.SELECTION}
                value={EType.SELECTION}
                name="sortType"
                label="Выбор" />
              <RadioInput
                defaultChecked={sortType === EType.BUBBLE}
                value={EType.BUBBLE}
                name="sortType"
                label="Пузырёк" />
            </div>

            <Button
              sorting={Direction.Ascending}
              isLoader={isCalculating}
              extraClass={`${styles.button}`}
              text="По возрастанию"
              onClick={() => { sort('ASC') }} />

            <Button
              sorting={Direction.Descending}
              isLoader={isCalculating}
              extraClass={`ml-3 ${styles.button}`}
              text="По убыванию"
              onClick={() => { sort('DESC') }} />

            <Button
              isLoader={isCalculating}
              extraClass={`ml-20 ${styles.button}`}
              text="Новый массив"
              onClick={newArrayHandler} />
          </fieldset>
        </form>

        <div className={`mt-12 ${styles.result}`}>

          {data.map((i, index) => (
            <Column
              extraClass={styles.column}
              key={`${i}-${index}`}
              index={i}
              state={getState(index)} />
          ))}

        </div>
      </div>
    </SolutionLayout>
  );
};
