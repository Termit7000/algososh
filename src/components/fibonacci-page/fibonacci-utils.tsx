
export function* fibonacci(n: number) {
    
    let a = 1;
    let b = 1;
    for (let i = 1; i <= n; i++) {

        if (i<3) {
            yield 1;
            continue;
        }

        let c = a + b;
        a = b;
        b = c;
        yield c;
    }
}