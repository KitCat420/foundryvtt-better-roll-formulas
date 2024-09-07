import {compareTerm} from "../../util.mjs";

export default function maximize(modifier) {
    const rgx = compareTerm('mn');
    const match = modifier.match(rgx);
    if (!match) return false;
    if(!match.groups.op) match.groups.op = '=';
    if(!match.groups.target) match.groups.target = this.faces;
    let {op, target} = match.groups;
    target = Math.max(2, parseInt(target));

    const currentResults = [...this.results];
    for(let r of currentResults) {
        if(DiceTerm.compareResult(r.result, op, target)) {
            r.rerolled = true;
            r.active = false;

            this.results.push({
                result: 1,
                active: true
            })
        }
    }

    return this.results;
}