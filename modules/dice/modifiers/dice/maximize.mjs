import {compareTerm} from "../../util.mjs";

export default function maximize(modifier) {
    const rgx = compareTerm('mx');
    const match = modifier.match(rgx);
    if (!match) return false;
    if(!match.groups.op) match.groups.op = '=';
    if(!match.groups.target) match.groups.target = 1;
    let {op, target} = match.groups;
    target = Math.min(this.faces - 1, parseInt(target));

    const max = this.faces;
    const currentResults = [...this.results];
    for(let r of currentResults) {
        if(DiceTerm.compareResult(r.result, op, target)) {
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