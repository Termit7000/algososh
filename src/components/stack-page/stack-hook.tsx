import { useReducer } from "react"

enum Actions {
    POP = 'POP',
    PUSH = 'PUSH',
    RESET = 'RESET'
}

type TPush = {
    type: Actions.PUSH,
    payload: string
}

type TPop = {
    type: Actions.POP
}

type TReset = {
    type: Actions.RESET;
}

type TActions = TPush | TPop | TReset;

type TState = {
    data: string[],
    headIndex: number
}

const initialState: TState = {
    data: [],
    headIndex: 0
}

const reducer = (state: TState, action: TActions) => {

    switch (action.type) {
        case Actions.PUSH: {
            return {
                data: [...state.data, action.payload],
                headIndex: state.headIndex++
            }
        }

        case Actions.POP: {
            if (state.headIndex < 0) return { ...state };
            const data = [...state.data];
            data.pop();
            return { data, headIndex: state.headIndex-- }
        }

        case Actions.RESET: {
            return { ...initialState };
        }

        default: return state;
    }
}

export const useStack = () => {
    const [state, dispatch] = useReducer(reducer, {...initialState});

    return {
        push: (item: string) => dispatch({ type: Actions.PUSH, payload: item }),
        pop: () => dispatch({ type: Actions.POP }),
        reset: () => dispatch({ type: Actions.RESET }),
        getHead: () => state.headIndex,
        getData: () => [...state.data]
    };
}