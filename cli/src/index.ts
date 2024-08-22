export const add = (a: number, b: number) => {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new Error("Both arguments must be numbers");
    }
    return a + b;
}