import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './queue-page.module.css';

const PUSH = 'PUSH';
const POP = 'POP';
const CLEAN = 'CLEAN';
type TOperationKinds = typeof PUSH | typeof POP | typeof CLEAN | '';

export const QueuePage: React.FC = () => {

  const [inputValue, setValue] = useState<string>('');
  const [calculating, setCalculating] = useState<{ inProgress: boolean, targetButton: TOperationKinds }>({ inProgress: false, targetButton: '' });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <SolutionLayout title="Очередь">

      <div className={styles.container}>
        <form className={styles.form}>

          <Input
            disabled={calculating.inProgress}
            value={inputValue}
            onChange={changeHandler}
            isLimitText={true}
            maxLength={4}
            extraClass={`mr-6 ${styles.input}`}
            placeholder="Введите текст" />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === PUSH}
            extraClass={`mr-6 ${styles.button}`}
            text="Добавить"
            onClick={() => { }} />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === POP}
            extraClass={` ${styles.button}`}
            text="Удалить"
            onClick={() => { }} />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === CLEAN}
            extraClass={`ml-40 ${styles.button}`}
            text="Очистить"
          />
        </form>

        <div className={styles.result}>
          
            <Circle  letter={'df'}  />
          
        </div>

      </div>
    </SolutionLayout>
  );
};
