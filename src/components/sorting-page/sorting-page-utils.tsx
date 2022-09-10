const MAX_ITEMS = 9;
const MIN_ITEMS = 7;

function* getRandom(n:number, k:number) {
    for (let i=0; i<n; i++) {
        yield ~~(Math.random()*k);
    }
}

export const randomArr = ()=>{
    const length = ~~(Math.random()*(MAX_ITEMS-MIN_ITEMS) + MIN_ITEMS);
    return [...getRandom(length, 100)];
}