
export default class Stack<T = string>{

    private size: number;
    private container: T[];

    constructor() {
        this.size = 0;
        this.container = [];
    }


    push(element: T) {
        this.container.push(element);
        this.size++;
    }

    pop() {
        if (this.container.length<=0) return;        
        this.container.pop();
        this.size--;
    }

    clear() {
        this.container = [];
        this.size =0;
    }

    get elements() {
        return [...this.container];
    }

    get head() {
        return this.size;
    }
}
