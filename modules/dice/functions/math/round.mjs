export default function round(number, precision = 0) {
    const factor = 10 ** precision;
    return Math.round(number * factor) / factor;
}