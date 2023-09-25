import { XPathArray } from "./types";

export const range = (a: number, b?: number) => {
    return b === undefined ? rangeUnary(a) : rangeBinary(a, b);
}

const rangeBinary = (min: number, max: number) => {
    const spread = Math.abs(max - min);
    const isReverse = (max - min) < 0;

    const zeroIndexedRange = rangeUnary(spread);
    
    if(isReverse) {
        return zeroIndexedRange
            .map(index => index + min + 1)
            .reverse();
    } else {
        return zeroIndexedRange
            .map(index => index + min);
    }
}

const rangeUnary = (max: number) => {
    if(isNaN(max)) {
        console.warn("rangeUnary: supplied argument max is not a number");
        return [];
    }

    if(max < 0) {
        console.warn("rangeUnary: supplied argument max must be 0 or greater");
        return [];
    }

    return Array(max).fill(null).map((value, index) => Number(index));
}

export function xpathArrayToArray(array: XPathArray<any>) {
    return Array.isArray(array) ? array : [array];
}