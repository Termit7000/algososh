export const selectionSort = async (
    arr: string[],
    handleCurrents: (indexes: number[]) => Promise<void>,
    handleModified: (index: number) => Promise<void>) => {

    const { length } = arr;
    for (let i = 0; i < length; i++) {

        let maxInd = i;
        for (let j = maxInd; j < length; j++) {

            await handleCurrents([i, j]);

            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
       await handleModified(i);
    }
    return arr;
};