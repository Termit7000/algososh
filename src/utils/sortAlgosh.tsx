const ASC = 'ASC';
const DESC = 'DESC';

type TSort = typeof ASC | typeof DESC;

export const selectionSort = async <T = string>(
    arr: T[],
    handleCurrents: (indexes: number[]) => Promise<void>,
    handleModified: (index: number) => Promise<void>,
    sortType: TSort = ASC
) => {

    const { length } = arr;
    for (let i = 0; i < length; i++) {

        let maxInd = i;
        for (let j = maxInd; j < length; j++) {

            await handleCurrents([i, j]);

            if ((sortType === ASC && arr[i] > arr[j]) || (sortType === DESC && arr[i] < arr[j])) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        await handleModified(i);
    }
};

export const bubbleSort = async <T = string>(
    arr: T[],
    handleCurrents: (indexes: number[]) => Promise<void>,
    handleModified: (index: number) => Promise<void>,
    sortType: TSort = ASC
) => {

    const { length } = arr;

    for (let i = 0; i < length; i++) {

        for (let j = 0; j < (length - i - 1); j++) {

            await handleCurrents([j, j+1]);

            if ((sortType==="ASC" && arr[j] > arr[j + 1]) || (sortType==="DESC" && arr[j] < arr[j + 1])) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
        await handleModified(length - i -1 );
    }
}