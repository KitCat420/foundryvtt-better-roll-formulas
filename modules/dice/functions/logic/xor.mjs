export default function xor(...args) {
    const truthyArgs = args.filter((arg) => !!arg);
    return truthyArgs.length === 1 ? truthyArgs[0] : 0;
}