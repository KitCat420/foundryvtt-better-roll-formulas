export default function floor(number, precision = 0) {
    const factor = 10 ** precision;
    return Math.floor(number * factor) / factor;
}