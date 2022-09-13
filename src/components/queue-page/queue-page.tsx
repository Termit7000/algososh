import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Queue from "./Queue";

import styles from './queue-page.module.css';

const ENQUEUE = 'ENQUEUE';
const DEQUEUE = 'DEQUEUE';
const CLEAN = 'CLEAN';
type TOperationKinds = typeof ENQUEUE | typeof DEQUEUE | typeof CLEAN | '';

const DELAY = SHORT_DELAY_IN_MS;

const queue = new Queue();

export const QueuePage: React.FC = () => {

  const [active, setActive] = useState(-1);
  const [data, setData] = useState(queue.elements);

  const [inputValue, setValue] = useState<string>('');
  const [calculating, setCalculating] = useState<{ inProgress: boolean, targetButton: TOperationKinds }>({ inProgress: false, targetButton: '' });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handlerAdd = async () => {

    if (queue.isFilled() || !inputValue) return;

    setCalculating({ inProgress: true, targetButton: ENQUEUE });

    queue.enqueue(inputValue);
    setActive(queue.getTail());

    await delay(DELAY);

    setData(queue.elements);
    setActive(-1);
    setValue('');
    setCalculating({ inProgress: false, targetButton: '' });
  }

  const handlerRemove = async () => {
    if (queue.isEmpty()) return;

    setCalculating({ inProgress: true, targetButton: DEQUEUE });
    setActive(queue.getHead());
    queue.dequeue();

    await delay(DELAY);

    setData(queue.elements);
    setValue('');
    setActive(-1);
    setCalculating({ inProgress: false, targetButton: '' });
  }

  const handlerReset = async () => {
    setCalculating({ inProgress: true, targetButton: CLEAN });

    queue.clear();

    await delay(DELAY);

    setData(queue.elements);
    setValue('');
    setActive(-1);
    setCalculating({ inProgress: false, targetButton: '' });
  }

  return (
    <SolutionLayout title="Очередь">

      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

          <Input
            disabled={calculating.inProgress}
            value={inputValue}
            onChange={changeHandler}
            isLimitText={true}
            maxLength={4}
            extraClass={`mr-6 ${styles.input}`}
            placeholder="Введите текст" />

          <Button
            disabled={calculating.inProgress || !inputValue}
            isLoader={calculating.targetButton === ENQUEUE}
            extraClass={`mr-6 ${styles.button} `}
            text="Добавить"
            onClick={handlerAdd} />

          <Button
            disabled={calculating.inProgress || queue.isEmpty()}
            isLoader={calculating.targetButton === DEQUEUE}
            extraClass={` ${styles.button} `}
            text="Удалить"
            onClick={handlerRemove} />

          <Button
            disabled={calculating.inProgress || queue.isEmpty()}
            isLoader={calculating.targetButton === CLEAN}
            extraClass={`ml-40 ${styles.button} `}
            text="Очистить"
            onClick={handlerReset}
          />
        </form>

        <div className={styles.result}>

          {data.map((i, index) =>
            <Circle
              key={`${index} - ${i}`}
              head={(index === queue.getHead()) ? 'head' : ''}
              letter={i}
              index={index}
              tail={(index === queue.getTail()) ? 'tail' : ''}
              state={(index === active) ? ElementStates.Changing : ElementStates.Default} />
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
