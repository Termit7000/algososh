import React, { FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";

import { useSelectionSort } from "../../hooks/sort-hook";
import { selectionSort } from "../../utils";

import styles from './string.module.css';
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

const DELAY = DELAY_IN_MS;

export const StringComponent: React.FC = () => {

  const [inputValue, setValue] = useState<string>('');
  const [isLoader, setLoader] = useState<boolean>(false);

  const {
    addModified,
    setCurrents,
    isInCurrents,
    isInModified,
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

  const getCirculeState = (index: number): ElementStates => {

    if (isInModified(index)) return ElementStates.Modified;
    if (isInCurrents(index)) return ElementStates.Changing

    return ElementStates.Default;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    
    setLoader(true);
    const arr: string[] = inputValue.split('');
    setData(arr);

    await selectionSort(arr, handleCurrent, handleModified);   
    setLoader(false);     
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>

        <form className={styles.form} onSubmit={submitHandler}>
          <Input disabled={isLoader} value={inputValue} onChange={changeHandler} isLimitText={true} maxLength={11} extraClass={styles.input} placeholder="Введите текст" />
          <Button isLoader={isLoader} extraClass={styles.button} type="submit" text="Развернуть" />
        </form>

        {data.length > 0 &&

          <div className={styles.result}>
            {data.map((i, index) =>
              <Circle key={index + i} letter={i} state={getCirculeState(index)} />
            )}
          </div>
        }
      </div>
    </SolutionLayout>
  );
};
