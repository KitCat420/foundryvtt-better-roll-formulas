export default function and(...args) {
    return args.every((arg) => !!arg) ? args[args.length - 1] : 0;
}