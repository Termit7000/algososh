import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Item } from "./item";

import styles from './list-page.module.css';

enum BUTTONS {
  ADD_HEAD,
  ADD_TAIL,
  REMOVE_HEAD,
  REMOVE_TAIL,
  ADD_INDEX,
  REMOVE_INDEX
}

export const ListPage: React.FC = () => {

  const [calculating, setCalculating] = useState<{ inProgress: boolean, targetButton: BUTTONS | '' }>({ inProgress: false, targetButton: '' });
  const [inputValue, setValue] = useState<string>('');
  const [inputIndex, setIndex] = useState<number>();

  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const changeIndexHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(e.target.value));
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

          <Input

            disabled={calculating.inProgress}
            value={inputValue}
            onChange={changeValueHandler}
            isLimitText={true}
            maxLength={4}
            extraClass={`${styles.input}`}
            placeholder="Введите значение" />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === BUTTONS.ADD_HEAD}
            extraClass={`${styles.button}`}
            text="Добавить в head" />

          <Button

            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === BUTTONS.ADD_TAIL}
            extraClass={`${styles.button}`}
            text="Добавить в tail" />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === BUTTONS.REMOVE_HEAD}
            extraClass={`${styles.button}`}
            text="Удалить из head" />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === BUTTONS.REMOVE_TAIL}
            extraClass={`${styles.button}`}
            text="Удалить из tail" />

          <Input
            disabled={calculating.inProgress}
            value={inputIndex}
            onChange={changeIndexHandler}
            isLimitText={true}
            type='number'
            max={10}
            extraClass={`${styles.input}`}
            placeholder="Введите индекс" />


          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === BUTTONS.ADD_INDEX}
            extraClass={`${styles.button} ${styles.addIndex}`}
            text="Добавить по индексу" />

          <Button
            disabled={calculating.inProgress}
            isLoader={calculating.targetButton === BUTTONS.REMOVE_INDEX}
            extraClass={`${styles.button} ${styles.removeIndex}`}
            text="Удалить по индексу" />
        </form>


        <div className={` ${styles.result}`}>

          <Item
            isHead={true}
            headValue=''
            isTail={false}
            value={'DFG'}
            index={0}
            isEnd={false}
            state={ElementStates.Default} />


          <Item
            isHead={true}
            headValue={'YOU'}
            isTail={false}
            value={'DFG'}
            index={1}
            isEnd={false}
            state={ElementStates.Changing} />

          <Item
            isHead={true}
            headValue={''}
            isTail={true}
            value={'DFG'}
            index={2}
            isEnd={true}
            state={ElementStates.Modified} />

        </div>
      </div>
    </SolutionLayout>
  );
};




