import React, { useReducer } from "react";
import { ElementStates } from "../types/element-states";

type TState<T = string> = {
    currentsElements: number[],
    modifiedElements: number[],
    data: T[],
}

const initialState = {
    currentsElements: [],
    modifiedElements: [],
    data: []
}

enum ActionTypes {
    SET_CURRENTS = 'SET_CURRENTS',
    ADD_MODIFIED = 'ADD_MODIFIED',
    SET_DATA = 'SET_DATA',
    RESET = 'RESET',
    CLEAR_STATE = 'CLEAR_STATE'
}

type TSetCurrents = {
    type: ActionTypes.SET_CURRENTS,
    payload: number[]
}

type TAddModified = {
    type: ActionTypes.ADD_MODIFIED,
    payload: number,
}

type TSetData<T = string> = {
    type: ActionTypes.SET_DATA,
    payload: T[]
}

type TReset = {
    type: ActionTypes.RESET
}

type TClearState = {
    type: ActionTypes.CLEAR_STATE
}

type TActions<T> = TSetCurrents | TAddModified | TSetData<T> | TReset | TClearState;

const reducer = <T = string>(state: TState<T>, action: TActions<T>): TState<T> => {

    switch (action.type) {
        case ActionTypes.SET_CURRENTS:
            return { ...state, currentsElements: action.payload };

        case ActionTypes.ADD_MODIFIED:
            return { ...state, modifiedElements: [...state.modifiedElements, action.payload] };

        case ActionTypes.SET_DATA:
            return { ...state, data: action.payload };

        case ActionTypes.RESET:
            return { ...initialState };
        case ActionTypes.CLEAR_STATE:
            return { ...state, modifiedElements: [], currentsElements: [] }

        default: return state;
    }
}

export const useSelectionSort = <T = string>() => {
    const [state, dispatch] = useReducer<React.Reducer<TState<T>, TActions<T>>>(reducer, initialState);

    return {
        setCurrents: (indexes: number[]) => dispatch({ type: ActionTypes.SET_CURRENTS, payload: indexes }),
        addModified: (index: number) => dispatch({ type: ActionTypes.ADD_MODIFIED, payload: index }),
        setData: (arr: T[]) => {
            dispatch({ type: ActionTypes.RESET })
            dispatch({ type: ActionTypes.SET_DATA, payload: arr })
        },        
        getState: (index: number): ElementStates => {
            
            if (state.modifiedElements.includes(index)) return ElementStates.Modified;
            if (state.currentsElements.includes(index)) return ElementStates.Changing

            return ElementStates.Default;
        },
        clearState: () => dispatch({ type: ActionTypes.CLEAR_STATE }),
        data: state.data
    };
}