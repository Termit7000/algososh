import React, { FormEvent, useEffect, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";

import { randomArr } from "./sorting-page-utils";
import { Direction } from "../../types/direction";
import { useSelectionSort } from "../../hooks/sort-hook";
import { DELAY_IN_MS } from "../../constants/delays";
import {
  ASC,
  DESC,
  bubbleSort,
  delay,
  selectionSort,
  TSortKind
} from "../../utils";

import styles from './sorting-page.module.css';

enum EType {
  SELECTION = 'SELECTION',
  BUBBLE = 'BUBBLE'
}

const DELAY = DELAY_IN_MS;

export const SortingPage: React.FC = () => {

  const [sortType, setSortType] = useState(EType.SELECTION);
  const [calculating, setCalculating] = useState<{ inProgress: boolean, targetButton: TSortKind | '' }>({ inProgress: false, targetButton: '' });

  const {
    addModified,
    setCurrents,
    getState,
    setData,
    clearState,
    data } = useSelectionSort<number>();

  useEffect(() => {
    setData(randomArr());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const sort = async (direction: TSortKind) => {

    setCalculating({ inProgress: true, targetButton: direction });
    clearState();

    if (sortType === EType.BUBBLE) {
      await bubbleSort(data, handleCurrent, handleModified, direction);
    } else {
      await selectionSort(data, handleCurrent, handleModified, direction);
    }

    setCalculating({ inProgress: false, targetButton: '' });
  }

  return (
    <SolutionLayout title="Сортировка массива">

      <div className={styles.container}>

        <form className={styles.form} onSubmit={submitHandler}>

          <fieldset disabled={calculating.inProgress} className={styles.fieldset}>
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
              disabled={calculating.inProgress}
              isLoader={calculating.targetButton === ASC}
              extraClass={`${styles.button}`}
              text="По возрастанию"
              onClick={() => { sort(ASC) }} />

            <Button
              sorting={Direction.Descending}
              disabled={calculating.inProgress}
              isLoader={calculating.targetButton === DESC}
              extraClass={`ml-3 ${styles.button}`}
              text="По убыванию"
              onClick={() => { sort(DESC) }} />

            <Button
              disabled={calculating.inProgress}
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
