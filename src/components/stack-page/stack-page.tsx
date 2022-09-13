import React, { useRef, useState } from "react";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "./Stack";

import styles from './stack-page.module.css';

const PUSH = 'PUSH';
const POP = 'POP';
const CLEAN = 'CLEAN';
type TOperationKinds = typeof PUSH | typeof POP | typeof CLEAN | '';

const stack = new Stack();

const DELAY = SHORT_DELAY_IN_MS;

export const StackPage: React.FC = () => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [activeItem, setActiveItem] = useState<number>(-1);
  const [data, setData] = useState<string[]>(stack.elements);

  const [inputValue, setValue] = useState<string>('');
  const [calculating, setCalculating] = useState<{ inProgress: boolean, targetButton: TOperationKinds }>({ inProgress: false, targetButton: '' });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlerPush();
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const handlerPush = async () => {

    if (!inputValue) return;

    setCalculating({ inProgress: true, targetButton: PUSH });    

    stack.push(inputValue);

    setData(stack.elements);    
    setActiveItem(stack.head-1);

    await delay(DELAY);    
    
    setValue('');
    setActiveItem(-1);

    setCalculating({ inProgress: false, targetButton: '' });

    inputRef.current?.focus();  
  };

  const handlerPop = async () => {

    if (stack.head < 1) return;

    setCalculating({ inProgress: true, targetButton: POP });
    setActiveItem(stack.head - 1);

    await delay(DELAY);
        
    setActiveItem(-1);
    stack.pop();
    setData(stack.elements);

    setCalculating({ inProgress: false, targetButton: '' });
  }

  const handlerReset = async () => {
    setCalculating({ inProgress: true, targetButton: CLEAN });
    
    setValue('');
    stack.clear();
    setData(stack.elements);
    setCalculating({ inProgress: false, targetButton: '' });
    
    inputRef.current?.focus();
  }

  return (
    <SolutionLayout title="Стек">

      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitHandler}>

          <Input
            id="inputStack"
            ref={inputRef}
            autoFocus
            disabled={calculating.inProgress}
            value={inputValue}
            onChange={changeHandler}
            isLimitText={true}
            maxLength={4}
            extraClass={`mr-6 ${styles.input}`}
            placeholder="Введите текст" />

          <Button
            disabled={calculating.inProgress || inputValue===''}
            isLoader={calculating.targetButton === PUSH}
            extraClass={`mr-6 ${styles.button}`}
            text="Добавить"
            onClick={handlerPush} />

          <Button
            disabled={calculating.inProgress || stack.head<=0}
            isLoader={calculating.targetButton === POP}
            extraClass={` ${styles.button}`}
            text="Удалить"
            onClick={handlerPop} />

          <Button
            disabled={calculating.inProgress || stack.head<=0}
            isLoader={calculating.targetButton === CLEAN}
            extraClass={`ml-40 ${styles.button}`}
            text="Очистить"
            onClick={handlerReset} />
        </form>

        <div className={styles.result}>
          {data.map((i, index) => {
            return (
              <Circle
                key={`${index}-${i}`}
                head={(index === stack.head-1) ? 'top' : ''}
                tail={String(index)}
                state={(index === activeItem) ? ElementStates.Changing : ElementStates.Default}
                letter={i} />
            )})}
        </div>
      </div>
    </SolutionLayout>
  );
};
