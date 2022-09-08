import { useReducer } from "react";

type TState = {
    currentsElements: number[],
    modifiedElements: number[],
    data: string[],
}

const initialState: TState = {
    currentsElements: [],
    modifiedElements: [],
    data: []
}

enum ActionTypes {
    SET_CURRENTS = 'SET_CURRENTS',
    ADD_MODIFIED = 'ADD_MODIFIED',
    SET_DATA = 'SET_DATA',
    RESET = 'RESET',
}

type TSetCurrents = {
    type: ActionTypes.SET_CURRENTS,
    payload: number[]
}

type TAddModified = {
    type: ActionTypes.ADD_MODIFIED,
    payload: number,
}

type TSetData = {
    type: ActionTypes.SET_DATA,
    payload: string[]
}

type TReset = {
    type: ActionTypes.RESET
}

type TActions = TSetCurrents | TAddModified | TSetData | TReset;

const reducer = (state: TState, action: TActions): TState => {

    switch (action.type) {
        case ActionTypes.SET_CURRENTS:
            return { ...state, currentsElements: action.payload };

        case ActionTypes.ADD_MODIFIED:
            return { ...state, modifiedElements: [...state.modifiedElements, action.payload] };

        case ActionTypes.SET_DATA:
            return { ...state, data: action.payload };

        case ActionTypes.RESET:
            return { ...initialState };

        default: return state;
    }
}

export const useEventsSort = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return {
        setCurrents: (indexes: number[]) => dispatch({ type: ActionTypes.SET_CURRENTS, payload: indexes }),
        addModified: (index: number) => dispatch({ type: ActionTypes.ADD_MODIFIED, payload: index }),
        setData: (arr: string[]) => {
            dispatch({ type: ActionTypes.RESET })
            dispatch({ type: ActionTypes.SET_DATA, payload: arr })},
        isInCurrents: (index: number) => state.currentsElements.includes(index),
        isInModified: (index: number) => state.modifiedElements.includes(index),        
        data: state.data
    };
}