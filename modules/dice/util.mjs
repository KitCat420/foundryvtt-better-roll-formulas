/**
 * Create a regular expression to compare
 * @param term
 * @returns {RegExp}
 */
export function compareTerm(term) {
    return new RegExp(`(?<term>${term})(?:(?<op>[<>]=?|=)(?<target>\\d+))?`, 'i');
}