import { bubbleSort, selectionSort } from "./sortAlgosh";

describe('Сортировка выбором', () => {

    it("Четное количество символов", async () => {
        const arr = ['a', 'b', 'c', 'd'];

        const res = await selectionSort(arr, undefined , undefined, 'DESC');        

        expect(res).toEqual(['d', 'c', 'b', 'a']);
    });

    it("Нечетное количество символов", async () => {
        const arr = ['a', 'b', 'c'];

        const res = await selectionSort(arr, undefined , undefined, 'DESC');        

        expect(res).toEqual(['c', 'b', 'a']);
    });

    it("Несколько символов ASC", async () => {
        const arr = ['c', 'b', 'a'];

        const res = await selectionSort(arr);        

        expect(res).toEqual(['a', 'b', 'c']);
    });

    it("С одним символом", async () => {
        const arr = ['a'];

        const res = await selectionSort(arr);        

        expect(res).toEqual(['a']);
    });

    it("Пустая строка", async () => {
        const arr = [];

        const res = await selectionSort(arr);        

        expect(res).toEqual([]);
    });
});

describe('Сортировка пузырьком', () => {

    it("Массив из нескольких элементов DESC", async () => {
        const arr = ['a', 'b', 'c', 'd'];

        const res = await bubbleSort(arr, undefined , undefined, 'DESC');        

        expect(res).toEqual(['d', 'c', 'b', 'a']);
    });

    it("Массив из нескольких элементов ASC", async () => {
        const arr = ['d', 'c', 'b', 'a'];

        const res = await bubbleSort(arr);        

        expect(res).toEqual(['a', 'b', 'c', 'd']);
    });

    it("Массив из одного элемента", async () => {
        const arr = ['a'];

        const res = await bubbleSort(arr);        

        expect(res).toEqual(['a']);
    });

    it("Пустой массив", async () => {
        const arr = [];

        const res = await bubbleSort(arr);        

        expect(res).toEqual([]);
    });
});
