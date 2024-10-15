export default function or(...args) {
    const truthyArgs = args.filter((arg) => !!arg);
    return truthyArgs.length > 0 ? truthyArgs[0] : 0;
}