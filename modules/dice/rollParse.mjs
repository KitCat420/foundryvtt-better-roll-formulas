import {RollGrammar} from "./_module.mjs";

export default function parse(wrapped, formula, data = {}) {
    const trace = new Error().stack;
    if(trace.includes('Roll._evaluateAST') || trace.includes('Roll.instantiateAST')) return wrapped(formula, data);

    try {
        if (formula) {
            const oldFormula = formula;
            const start = Date.now();
            formula = RollGrammar.parse(formula);
            if (oldFormula.replaceAll(" ", "") !== formula.replaceAll(" ", "")) {
                console.debug("Better Roll Formulas | formula transformed", {
                    oldFormula: oldFormula,
                    newFormula: formula,
                    executionTime: (Date.now() - start) + " ms"
                })
            }
        }
    } catch (e) {
        console.warn("Better Roll Formulas | Failed to parse formula:", formula);
        console.error("Better Roll Formulas | ", e)
    }
    return wrapped(formula, data);
}