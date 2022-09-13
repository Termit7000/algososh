import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Item } from "./item";

import styles from './list-page.module.css';
import { NodeList } from "./LinkedListNode";
import { TStore } from "./types";

enum BUTTONS {
  ADD_HEAD,
  ADD_TAIL,
  REMOVE_HEAD,
  REMOVE_TAIL,
  ADD_INDEX,
  REMOVE_INDEX
}

const DELAY = SHORT_DELAY_IN_MS;

const nodeList = new NodeList();

export const ListPage: React.FC = () => {

  const [store, setStore] = useState<TStore>(nodeList.getState());

  const [calculating, setCalculating] = useState<{ inProgress: boolean, targetButton: BUTTONS | '' }>({ inProgress: false, targetButton: '' });
  const [inputValue, setValue] = useState<string>('');
  const [inputIndex, setIndex] = useState<number | ''>('');

  const currentState = async (data: TStore) => {
    setStore(data);
    await delay(DELAY);
  }

  //начальное заполнение
  useEffect(()=>{

    const q = ~~(Math.random() * 5) +1;
    for (let i =0; i<q; i++) {
      nodeList.append(String(~~(Math.random()*100)), (data:TStore)=>{setStore(data)});
    }

  },[]);

  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const changeIndexHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIndex(Number(e.target.value));
  }

  const stateItem = (index: number): ElementStates => {

    const {modified, inProgress} = store;

    if (modified.includes(index)) return ElementStates.Modified;
    if (inProgress.includes(index)) return ElementStates.Changing;

    return ElementStates.Default;
  }

  const hanlerAddTail = async () => {

    if (!inputValue) return;

    setCalculating({inProgress:true, targetButton: BUTTONS.ADD_TAIL}); 

    await nodeList.append(inputValue, currentState);

    setValue('');
    setCalculating({inProgress:false, targetButton: ''});
  }

  const hanlerAddHead = async () => {

    if (!inputValue) return;

    setCalculating({inProgress:true, targetButton: BUTTONS.ADD_HEAD}); 

    await nodeList.prepend(inputValue, currentState);

    setValue('');
    setCalculating({inProgress:false, targetButton: ''});
  }

  const handlerRemoveHead = async () => {

    setCalculating({inProgress:true, targetButton: BUTTONS.REMOVE_HEAD}); 

    await nodeList.deleteHead(currentState);
    
    setCalculating({inProgress:false, targetButton: ''});
  }

  const handlerRemoveTail = async () => {

    setCalculating({inProgress:true, targetButton: BUTTONS.REMOVE_TAIL}); 

    await nodeList.deleteTail(currentState);
    
    setCalculating({inProgress:false, targetButton: ''});
  }

  const handlerInsertAt = async () => {
    if (!inputValue || inputIndex==="") return;

    setCalculating({inProgress:true, targetButton: BUTTONS.ADD_INDEX}); 

    await nodeList.addByIndex(inputValue, inputIndex, currentState);
    
    setValue('');
    setIndex('');
    setCalculating({inProgress:false, targetButton: ''});
  }

  const removeAtHandler = async () => {

    if (inputIndex==='') return;

    setCalculating({inProgress:true, targetButton: BUTTONS.REMOVE_INDEX}); 

    await nodeList.deleteByIndex(inputIndex, currentState);
    
    setIndex('');
    setCalculating({inProgress:false, targetButton: ''});
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
            disabled={calculating.inProgress || inputValue===''}
            isLoader={calculating.targetButton === BUTTONS.ADD_HEAD}
            extraClass={`${styles.button}`}
            text="Добавить в head" 
            onClick={hanlerAddHead}/>

          <Button

            disabled={calculating.inProgress || inputValue===''}
            isLoader={calculating.targetButton === BUTTONS.ADD_TAIL}
            extraClass={`${styles.button}`}
            text="Добавить в tail"
            onClick={hanlerAddTail} />

          <Button
            disabled={calculating.inProgress || store.tailIndex<0}
            isLoader={calculating.targetButton === BUTTONS.REMOVE_HEAD}
            extraClass={`${styles.button}`}
            text="Удалить из head" 
            onClick={handlerRemoveHead}/>

          <Button
            disabled={calculating.inProgress || store.tailIndex<0}
            isLoader={calculating.targetButton === BUTTONS.REMOVE_TAIL}
            extraClass={`${styles.button}`}
            text="Удалить из tail" 
            onClick={handlerRemoveTail}/>

          <Input
            disabled={calculating.inProgress}
            value={inputIndex}
            onChange={changeIndexHandler}
            isLimitText={true}            
            max={(store.tailIndex<=0) ? 0 : store.tailIndex}
            min={0}
            type='number'
            extraClass={`${styles.input}`}
            placeholder="Введите индекс"/>

          <Button
            disabled={calculating.inProgress || (inputIndex==='' || inputIndex>store.tailIndex) || (inputValue==='')}
            isLoader={calculating.targetButton === BUTTONS.ADD_INDEX}
            extraClass={`${styles.button} ${styles.addIndex}`}
            text="Добавить по индексу"
            onClick={handlerInsertAt} />

          <Button
            disabled={calculating.inProgress || (inputIndex==='' || inputIndex>store.tailIndex)}
            isLoader={calculating.targetButton === BUTTONS.REMOVE_INDEX}
            extraClass={`${styles.button} ${styles.removeIndex}`}
            text="Удалить по индексу" 
            onClick={removeAtHandler}/>
        </form>

        <div className={` ${styles.result}`}>

          {store.data.map((i, index) => 
            <Item
              key={`${index} - ${i}`}
              isHead={index===store.headIndex}
              headValue={(store.direction==="ADDING" && index===store.insertion.index) ? store.insertion.value : ''}
              tailValue={(store.direction==='REMOVING' && index===store.insertion.index) ? store.insertion.value : ''}
              isTail={index===store.tailIndex}
              value={i}
              index={index}
              isEnd={index===store.data.length-1}
              state={stateItem(index)} />
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};




