import {compare, compareTerm} from "../../util.mjs";

export default function set(modifier) {
    const rgx = compareTerm('set\\d+');
    const match = modifier.match(rgx);
    if (!match) return false;
    let {term, op, target} = match.groups;
    target = parseInt(target);
    const newResult = parseInt(term.match(/\d+/)[0]);

    const currentResults = [...this.results];
    for(let r of currentResults) {
        if(compare(r.result, op, target)) {
            r.rerolled = true;
            r.active = false;

            this.results.push({
                result: newResult,
                active: true
            })
        }
    }

    return this.results;
}