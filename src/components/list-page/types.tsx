export type TStore = {
    data: string[],
    direction: 'ADDING' | 'REMOVING' | '',
    inProgress: number[],
    modified: number[],
    headIndex: number,
    tailIndex: number,
    insertion: {
        value: string,
        index: number
    }    
}