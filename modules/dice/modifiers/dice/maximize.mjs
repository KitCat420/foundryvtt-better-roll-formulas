import {compare, compareTerm} from "../../util.mjs";

export default function maximize(modifier) {
    const rgx = compareTerm('mx');
    const match = modifier.match(rgx);
    if (!match) return false;
    let {op, target} = match.groups;
    target = Math.min(this.faces - 1, parseInt(target));

    const max = this.faces;
    const currentResults = [...this.results];
    for(let r of currentResults) {
        if(compare(r.result, op, target)) {
            r.rerolled = true;
            r.active = false;

            this.results.push({
                result: max,
                active: true
            })
        }
    }

    return this.results;
}