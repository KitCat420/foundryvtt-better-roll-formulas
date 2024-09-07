import {compareTerm} from "../../util.mjs";

async function _compound(op, target, {recursive = false} = {}) {
    let checked = 0;
    let rolled = 0;
    const initial = this.results.length;

    while (checked < this.results.length) {
        const r = this.results[checked];
        checked++;
        if (!r.active) continue;

        let current = r;
        while(DiceTerm.compareResult(current.result, op, target)) {
            current.exploded = true;

            current = await this.roll({reroll: true});
            current.active = false;
            current.rerolled = true;

            r.result += current.result;
            r.compounded = true;

            rolled++;
            // Limit recursion
            if(!recursive) break;
            if (rolled > 1000) throw new Error("Maximum recursion depth for exploding dice roll exceeded");
        }
    }

    return this.results;
}

export async function compound(modifier) {
    const rgx = compareTerm('xc');
    const match = modifier.match(rgx);
    if (!match) return false;
    if(!match.groups.op) match.groups.op = '=';
    if(!match.groups.target) match.groups.target = this.faces;
    const {op, target} = match.groups;

    return _compound.call(this, op, target);
}

export async function recursiveCompound(modifier) {
    const rgx = compareTerm('xrc');
    const match = modifier.match(rgx);
    if (!match) return false;
    if(!match.groups.op) match.groups.op = '=';
    if(!match.groups.target) match.groups.target = this.faces;

    const {op, target} = match.groups;
    return _compound.call(this, op, target, {recursive: true});
}
