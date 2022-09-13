export type TStore<T=string> = {
    data: (T | '')[],
    direction: 'ADDING' | 'REMOVING' | '',
    inProgress: number[],
    modified: number[],
    headIndex: number,
    tailIndex: number,
    insertion: {
        value: T | '',
        index: number
    }    
}