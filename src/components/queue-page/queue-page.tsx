import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './queue-page.module.css';

const ENQUEUE = 'ENQUEUE';
const DEQUEUE = 'DEQUEUE';
const CLEAN = 'CLEAN';
type TOperationKinds = typeof ENQUEUE | typeof DEQUEUE | typeof CLEAN | '';

const MAX_ITEMS = 7;
const DELAY = SHORT_DELAY_IN_MS;

const data = (new Array(MAX_ITEMS)).fill("");
export const QueuePage: React.FC = () => {

  const [active, setActive] = useState(-1);
  const [queueIndexes, setQueueIndexes] = useState({ head: -1, tail: -1 });

  const [inputValue, setValue] = useState<string>('');
  const [calculating, setCalculating] = useState<{ inProgress: boolean, targetButton: TOperationKinds }>({ inProgress: false, targetButton: '' });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handlerAdd = async () => {

    if (queueIndexes.tail >= MAX_ITEMS - 1 || !inputValue) return;

    setCalculating({ inProgress: true, targetButton: ENQUEUE });

    setActive(queueIndexes.tail + 1);

    setQueueIndexes(prop => {

      if (prop.head < 0) {
        prop.head = 0;
      }

      const next = prop.tail + 1;
      data[next] = inputValue;

      return { ...prop, tail: next };
    });

    await delay(DELAY);

    setActive(-1);
    setValue('');
    setCalculating({ inProgress: false, targetButton: '' });
  }

  const handlerRemove = async () => {
    if (queueIndexes.head > queueIndexes.tail || queueIndexes.head<0) return;

    setCalculating({ inProgress: true, targetButton: DEQUEUE });
    setActive(queueIndexes.head);
    
    await delay(DELAY);
    data[queueIndexes.head] = '';

    setQueueIndexes(prop=> {
      if (prop.head===prop.tail) return {head:-1, tail:-1};
      return {...prop, head: prop.head+1}});

    setActive(-1);
    setCalculating({ inProgress: false, targetButton: '' });
  }

  const handlerReset = async () => {
    setCalculating({ inProgress: true, targetButton: CLEAN });

    data.fill('');
    setQueueIndexes({head:-1, tail: -1});

    await delay(DELAY);

    setCalculating({ inProgress: false, targetButton: '' });
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
            isLoader={calculating.targetButton === ENQUEUE}
            extraClass={`mr-6 ${styles.button} `}
            text="Добавить"
            onClick={handlerAdd} />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === DEQUEUE}
            extraClass={` ${styles.button} `}
            text="Удалить"
            onClick={handlerRemove} />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === CLEAN}
            extraClass={`ml-40 ${styles.button} `}
            text="Очистить"
            onClick={handlerReset}
          />
        </form>

        <div className={styles.result}>

          {data.map((i, index) =>
            <div key={index} className={styles.tail}>
              <Circle
                letter={i}
                tail={String(index)}
                head={(index === queueIndexes.head) ? 'head' : ''}
                state={(index === active) ? ElementStates.Changing : ElementStates.Default} />

              {index === queueIndexes.tail && <p className={`text text_type_input text_color_input mt-15`}>tail</p>}
            </div>)}
        </div>
      </div>
    </SolutionLayout>
  );
};
