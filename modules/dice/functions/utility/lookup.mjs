export default function lookup(index, ...args) {
    return args[index] || args[0] || null;
}