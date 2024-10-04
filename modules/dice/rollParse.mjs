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
        console.warn("Better Roll Formulas | Failed to parse formula:", formula);
        console.error("Better Roll Formulas | ", e)
    }
    return wrapped(formula, data);
}