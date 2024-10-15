export default function ceil(number, precision = 0) {
    const factor = 10 ** precision;
    return Math.ceil(number * factor) / factor;
}