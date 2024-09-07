export default async function unique(modifier) {
    const rgx = /s[ad]?/i;
    const match = modifier.match(rgx);
    if (!match) return false;

    const ascending = !modifier.toLowerCase().endsWith('d');

    this.results = this.results.sort((a, b) => a.result <= b.result ? -1 : 1);

    if(!ascending) {
        this.results = this.results.reverse();
    }

    console.log(this.results);

    return this.results;
}