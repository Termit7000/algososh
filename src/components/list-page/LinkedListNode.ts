import { TStore } from "./types";

class Node<T=string>{
    
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

type TStateHandler<T> = (state: TStore<T>) => Promise<void> | void;

export class NodeList<T=string> {

    private head: Node<T> | null = null;

    private store: TStore<T> = {
        data: [],
        direction: '',
        headIndex: -1,
        insertion: { value: '', index: -1 },
        inProgress: [],
        modified: [],
        tailIndex: -1
    };

    /**
     * Добавляет элемент в конец списка
     * @param element 
     * @param stateHandler 
     */
    async append(element: T, stateHandler: TStateHandler<T>) {

        let current: Node<T>;
        const node = new Node<T>(element);

        this.store.direction = 'ADDING';

        this.initValue(element);
        this.resetState();

        if (this.head === null) {
            this.head = node;

            this.store.headIndex = 0;
        } else {

            current = this.head;

            //ПЕРВЫЙ ЭЛЕМЕНТ IN PROGRESS
            this.moveValue();
            await stateHandler(this.getState());

            while (current.next) {
                current = current.next;

                //СДВИНУТЬ КУРСОР С VALUE НА СЛЕДУЮЩИЙ ЭЛЕМЕНТ
                this.moveValue();
                await stateHandler(this.getState());
            }

            current.next = node;
        }

        //СОЗДАТЬ НОВОЕ ПУСТОЕ МЕСТО
        this.store.data.push('');

        this.store.tailIndex++;

        //СДВИНУТЬ КУРСОР НА ПУСТОЕ МЕСТО
        this.moveValue();
        await stateHandler(this.getState());

        //ЗАПОЛНИТЬ НОВОЕ МЕСТО ЗНАЧЕНИЕМ
        this.store.data[this.store.tailIndex] = element;
        await stateHandler(this.getState());

        //УСТАНОВИТЬ МОДИФИЦИРОВАННОСТЬ ЗАПОЛНЕННОГО ЭЛЕМЕНТА
        this.store.modified.push(this.store.tailIndex);

        //СБРОСИТЬ ОТОБРАЖЕНИЕ VALUE
        this.resetValue();

        await stateHandler(this.getState());

        //СБРОСИТЬ СОСТОЯНИЕ 
        this.resetState();
        await stateHandler(this.getState());
    }

    /**
     * Добавляет элемент в начало списка
     * @param value 
     * @param stateHandler 
     * @returns 
     */
    async prepend(value: T, stateHandler: TStateHandler<T>) {

        if (!this.head) {
            await this.append(value, stateHandler);
            return;
        }

        this.store.direction = 'ADDING';

        //ОБРАБОТКА ПЕРВОГО ЭЛЕМЕНТА
        this.resetState();
        this.initValue(value);
        this.moveValue();
        await stateHandler(this.getState());

        //ВСТАВКА НОВОГО ЭЛЕМЕНТА
        this.store.data.unshift(value);
        this.store.modified.push(0);
        this.resetValue();
        this.store.tailIndex++;

        await stateHandler(this.getState());

        this.resetState();
        await stateHandler(this.getState());

        this.head = new Node(value, this.head);
    }

    async deleteHead(stateHandler: TStateHandler<T>) {

        if (!this.head) return;

        this.store.direction = 'REMOVING';

        this.resetState();
        this.initValue(this.head.value);

        this.moveValue();
        this.store.data[0] = '';

        await stateHandler(this.getState());

        this.store.data.shift();
        this.store.tailIndex--;
        this.resetValue();
        this.resetState();

        this.head = this.head.next;

        await stateHandler(this.getState());
    }

    async deleteTail(stateHandler: TStateHandler<T>) {
        if (!this.head) return;

        this.store.direction = 'REMOVING';
        this.resetState();

        let node = this.head;
        let prev = this.head;

        while (node.next) {
            prev = node;
            node = node.next;
        }

        this.store.insertion.value = node.value;
        this.store.insertion.index = this.store.tailIndex;

        this.store.data[this.store.tailIndex] = "";

        await stateHandler(this.getState());

        prev.next = null;
        this.store.data.pop();
        this.store.tailIndex--;

        await stateHandler(this.getState());
    }

    async addByIndex(element: T, index: number, stateHandler: TStateHandler<T>) {

        if (index < 0 || index > this.store.tailIndex) return;

        if (index === 0) {
            await this.prepend(element, stateHandler);
            return;
        }

        const node = new Node(element);

        let curr = this.head;
        let prev = curr;
        let currIndex = 0;

        this.store.direction = "ADDING";
        this.resetState();
        this.initValue(element);
        this.moveValue();        

        await stateHandler(this.getState());

        while (currIndex < index && curr?.next) {
            prev = curr;
            curr = curr?.next;
            currIndex++;

            this.moveValue();
            await stateHandler(this.getState());
        }

        this.store.tailIndex++;
        prev!.next = node;
        node.next = curr;

        this.store.data.splice(index,0,element);
        this.resetState();
        this.resetValue();
        this.store.modified.push(index);
        await stateHandler(this.getState());

        this.resetState();
        await stateHandler(this.getState());           
    }

    async deleteByIndex(index: number, stateHandler: TStateHandler<T>) {
        if (index < 0 || index > this.store.tailIndex) return;

        if (index===0) {
            await this.deleteHead(stateHandler);
            return;
        }

        this.store.direction = "REMOVING";
        this.resetState();

        this.store.inProgress = [0];
        await stateHandler(this.getState());
        
        let curr = this.head;
        let prev = curr;
        let currIndex = 0;

        while (currIndex < index && curr?.next) {
            prev = curr;
            curr = curr?.next;
            currIndex++;

            this.store.inProgress.push(currIndex);
            await stateHandler(this.getState());
        }


        this.store.data[currIndex] = '';
        this.store.insertion = {value: curr?.value!, index: currIndex};
        await stateHandler(this.getState());


        this.store.tailIndex--;
        prev!.next = curr!.next;

        this.store.data.splice(currIndex,1);
        this.resetValue();
        this.resetState();
        await stateHandler(this.getState());
    }

    private initValue(value: T) {
        this.store.insertion = { value, index: -1 };
    }

    private resetValue() {
        this.store.insertion = { value: '', index: -1 };
    }

    /**
     * Передвигает VALUE на новую позицию
     */
    private moveValue() {
        this.store.insertion.index++;
        this.store.inProgress.push(this.store.insertion.index);
    }

    private resetState() {
        this.store.modified = [];
        this.store.inProgress = [];
    }

    getState(): TStore<T> {
        return { ...this.store };
    }

    print() {
        let curr = this.head;
        let res = '';
        while (curr) {
            res += `${curr.value} `;
            curr = curr.next;
        }
        console.log(res);
    }
}