import React, { FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { useSelectionSort } from "../../hooks/sort-hook";
import { DESC, selectionSort } from "../../utils";

import styles from './string.module.css';
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

//const DELAY = DELAY_IN_MS;

type TStingProps = {
  DELAY?: number
};

export const StringComponent: React.FC<TStingProps> = ({DELAY = DELAY_IN_MS}) => {

  const [inputValue, setValue] = useState<string>('');
  const [isLoader, setLoader] = useState<boolean>(false);

  const {
    addModified,
    setCurrents,
    getState,
    setData,
    data } = useSelectionSort();

  const handleCurrent = async (indexes: number[]) => {
    await delay(DELAY);
    setCurrents(indexes);
  };

  const handleModified = async (index: number) => {
    await delay(DELAY);
    setCurrents([]);
    addModified(index);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setLoader(true);
    const arr: string[] = inputValue.split('');
    setData(arr);

    await selectionSort(arr, handleCurrent, handleModified, DESC);
    setLoader(false);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>

        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            disabled={isLoader}
            value={inputValue}
            onChange={changeHandler}
            isLimitText={true}
            maxLength={11}
            extraClass={styles.input}
            placeholder="Введите текст" />
          <Button
            isLoader={isLoader}
            disabled={!inputValue}
            extraClass={styles.button}
            type="submit"
            text="Развернуть" />
        </form>

        {data.length > 0 &&

          <div className={styles.result}>
            {data.map((i, index) =>
              <Circle key={index + i} letter={i} state={getState(index)} />
            )}
          </div>
        }
      </div>
    </SolutionLayout>
  );
};
