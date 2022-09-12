import React from "react";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import styles from './item.module.css';

type TProps = {
    
    isHead: boolean, //отображает head в заголовке
    isTail: boolean, //если установлен, то подпись tail
    headValue: string, //если установлен, то маленький кружок вверху
    tailValue: string, //усли установлен, то маленький крудок внизу    
    value: string, //значение в кружке
    index: number, //подпись под кружком
    isEnd: boolean, //если true, то не отображается стрелка к следующему элементу
    state: ElementStates //статус элемента
}

export const Item: React.FC<TProps> = (props) => {

    const {
        isHead,
        headValue,
        tailValue,
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

    const tail = () => {
        if (tailValue) {
            return (
                <Circle
                    isSmall={true}
                    letter={tailValue}
                    state={ElementStates.Changing}
                />);
        }

        return (String(index));
    }

    return (

        <>
            <div className={styles.item}>
                <Circle
                    letter={value}
                    head={head()}
                    tail={tail()}
                    state={state} />

                {isTail && !tailValue &&

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