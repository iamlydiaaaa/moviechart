export var range = function (a, b) {
    return b === undefined ? rangeUnary(a) : rangeBinary(a, b);
};
var rangeBinary = function (min, max) {
    var spread = Math.abs(max - min);
    var isReverse = (max - min) < 0;
    var zeroIndexedRange = rangeUnary(spread);
    if (isReverse) {
        return zeroIndexedRange
            .map(function (index) { return index + min + 1; })
            .reverse();
    }
    else {
        return zeroIndexedRange
            .map(function (index) { return index + min; });
    }
};
var rangeUnary = function (max) {
    if (isNaN(max)) {
        console.warn("rangeUnary: supplied argument max is not a number");
        return [];
    }
    if (max < 0) {
        console.warn("rangeUnary: supplied argument max must be 0 or greater");
        return [];
    }
    return Array(max).fill(null).map(function (value, index) { return Number(index); });
};
export function xpathArrayToArray(array) {
    return Array.isArray(array) ? array : [array];
}
//# sourceMappingURL=utils.js.map