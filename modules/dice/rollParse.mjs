import {RollGrammar} from "./_module.mjs";

const formulaCache = new Map();

export default function parse(wrapped, formula, data = {}) {
    if(formula && formulaCache.has(formula)) return wrapped(formulaCache.get(formula), data);

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
            formulaCache.set(oldFormula, formula);
        }
    } catch (e) {
        console.warn("Better Roll Formulas | Failed to parse formula:", formula);
        console.error("Better Roll Formulas | ", e)
        formulaCache.set(formula, formula);
    }
    return wrapped(formula, data);
}