export default async function unique(modifier) {
    const rgx = /u/i;
    const match = modifier.match(rgx);
    if (!match) return false;

    const seenNumbers = [];

    for (let r of this.results) {
        if (seenNumbers.includes(r.result)) {
            r.rerolled = true;
            r.active = false;
            await this.roll();
        } else {
            seenNumbers.push(r.result);
        }

        if (seenNumbers.length === this.faces) {
            // We've seen all numbers, time to bail
            break;
        }
    }

    return this.results;
}