/**
 * Compare two numbers based on a string operator
 * @param {number} a
 * @param {string} op
 * @param {number} b
 * @returns {boolean}
 */
export function compare(a, op, b) {
    switch(op) {
        case "<": return a < b;
        case "<=": return a <= b;
        case ">": return a > b;
        case ">=": return a >= b;
        case "=": return a == b;
        default: return false;
    }
}

/**
 * Create a regular expression to compare
 * @param term
 * @returns {RegExp}
 */
export function compareTerm(term) {
    return new RegExp(`(?<term>${term})(?<op>[<>]=?|=)(?<target>\\d+)`, 'i');
}