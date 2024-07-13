import {RollGrammar} from "./_module.mjs";

export default function parse(wrapped, formula, data = {}) {
    try {
        if (formula) {
            const oldFormula = formula
            const start = Date.now();
            formula = RollGrammar.parse(formula);
            const executionTime = Date.now() - start;
            if (oldFormula.replaceAll(" ", "") !== formula.replaceAll(" ", "")) {
                console.debug("Better Roll Formulas | formula transformed", {
                    oldFormula: oldFormula,
                    newFormula: formula,
                    executionTime: executionTime + " ms"
                })
            }
        }
    } catch (e) {
        console.error("Better Roll Formulas | Error parsing formula", e)
    }
    return wrapped(formula, data);
}