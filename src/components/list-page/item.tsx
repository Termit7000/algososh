import React from "react";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import styles from './item.module.css';

type TProps = {
    isHead: boolean, //отображает head в заголовке
    headValue: string, //если установлен, то маленький кружок вверху
    isTail: boolean, //если установлен, то подпись tail
    value: string, //значение в кружке
    index: number, //подпись под кружком
    isEnd: boolean, //если true, то не отображается стрелка к следующему элементу
    state: ElementStates //статус элемента
}

export const Item: React.FC<TProps> = (props) => {

    const {
        isHead,
        headValue,
        isTail,
        value,
        index,
        isEnd,
        state
    } = props;

    const head = () => {
        if (headValue) {
            return (
                <Circle
                    isSmall={true}
                    letter={headValue}
                    state={ElementStates.Changing}
                />);
        }

        return (isHead && 'head') || '';
    }

    return (

        <>
            <div className={styles.item}>
                <Circle
                    letter={value}
                    tail={String(index)}
                    head={head()}
                    state={state} />

                {isTail &&

                    <p className={`text text_type_input text_color_input mt-15`}>tail</p>
                }
            </div>

            {!isEnd &&
                <div className={styles.arrow}>
                    <ArrowIcon {...( (state===ElementStates.Changing) ? {fill: '#d252e1'} : {})}  />
                </div>
            }
        </>
    );
} 