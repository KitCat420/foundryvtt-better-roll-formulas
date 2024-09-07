import {compareTerm} from "../../util.mjs";

async function _penetrate(op, target, {recursive = false} = {}) {
    let checked = 0;
    const initial = this.results.length;

    while (checked < this.results.length) {
        const r = this.results[checked];
        checked++;
        if (!r.active) continue;

        // Determine whether to re-roll the result
        if (DiceTerm.compareResult(r.result, op, target)) {
            r.exploded = true;
            await this.roll({reroll: true});
        }

        // Limit recursion
        if (!recursive && (checked >= initial)) checked = this.results.length;
        if (checked > 1000) throw new Error("Maximum recursion depth for exploding dice roll exceeded");
    }

    for (let i = initial; i < this.results.length; i++) {
        this.results[i].result--;
        this.results[i].penetrated = true;
    }

    return this.results;
}

export async function penetrate(modifier) {
    const rgx = compareTerm('xp');
    const match = modifier.match(rgx);
    if (!match) return false;
    if(!match.groups.op) match.groups.op = '=';
    if(!match.groups.target) match.groups.target = this.faces;
    const {op, target} = match.groups;

    return _penetrate.call(this, op, target);
}

export async function recursivePenetrate(modifier) {
    const rgx = compareTerm('xrp');
    const match = modifier.match(rgx);
    if (!match) return false;
    if(!match.groups.op) match.groups.op = '=';
    if(!match.groups.target) match.groups.target = this.faces;

    const {op, target} = match.groups;
    return _penetrate.call(this, op, target, {recursive: true});
}
