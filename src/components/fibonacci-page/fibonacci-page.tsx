import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import styles from './fibonacci-page.module.css';
import { fibonacci } from "./fibonacci-utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";

const DELAY = SHORT_DELAY_IN_MS;
const MAX_VALUE = 19;

export const FibonacciPage: React.FC = () => {
  const [inputValue, setValue] = useState<number>(1);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(true);

  const [data, setData] = useState<number[]>([]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber || 1;
    setValue(value);
    setSubmitEnabled(value<=MAX_VALUE);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setData([]);
    setLoader(true);

    const gen = fibonacci(inputValue + 1);

    for (let value of gen) {
      setData(prev => [...prev, value]);
      await delay(DELAY);
    }

    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">

      <div className={styles.container}>

        <form className={styles.form} onSubmit={submitHandler}>
          <Input
            type="number"
            disabled={isLoader}
            value={inputValue}
            onChange={changeHandler}
            isLimitText={true}
            maxLength={2}
            max={MAX_VALUE}
            min={1}
            extraClass={styles.input}
            placeholder="Введите текст" />

          <Button
            disabled={!submitEnabled}
            isLoader={isLoader}
            extraClass={styles.button}
            type="submit"
            text="Рассчитать" />
        </form>

        <div className={styles.result}>

          {data.length > 0 && data.map((i, index) => {

            return (
              <div key={i + '-' + index} className={styles.item}>
                <Circle letter={String(i)} />
                <p className={styles.text}>{index}</p>
              </div>)
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
