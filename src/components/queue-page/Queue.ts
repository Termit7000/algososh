export default class Queue<T = string | ''>{

    private data: (T | string)[];
    private head: number;
    private tail: number;
    private MAX_ITEMS = 7;

    constructor() {
        this.data = Array<T | string>(this.MAX_ITEMS).fill('');
        this.head = -1;
        this.tail = -1;
    }

    enqueue(value: T) {

        if (this.isFilled()) return;

        if (this.head < 0) {
            this.head = 0;
        }

        this.tail++;
        this.data[this.tail] = value;
    }

    dequeue() {
        if (this.isEmpty()) return;

        
        this.data[this.head] = '';
        this.head++;
        if (this.head>this.tail) {
            this.tail=-1
            this.head=-1;
        };
    }

    clear() {
        this.data.fill('');
        this.head = -1;
        this.tail = -1;
    }

    isEmpty(): boolean {
        return this.head < 0 || this.head>this.tail || this.tail<0;
    }

    isFilled(): boolean {
        return this.tail>=this.MAX_ITEMS-1;
    }

    get elements() {
        return [...this.data];
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }
}