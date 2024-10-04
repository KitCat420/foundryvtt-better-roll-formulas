import * as dice from './dice/_module.mjs'

Hooks.once("init", () => {
    console.log("Better Roll Formulas | Initializing Better Roll Formulas")

    const diceFunctions = dice.functions;
    console.debug(`Better Roll Formulas | Registering Dice Functions`);
    for(let [key, value] of Object.entries(diceFunctions)) {
        CONFIG.Dice.functions[key.replace(/_/, "")] = value;
    }

    Object.assign(CONFIG.Dice.termTypes.PoolTerm.prototype.constructor.MODIFIERS, dice.modifiers.pool);
    Object.assign(CONFIG.Dice.terms.d.prototype.constructor.MODIFIERS, dice.modifiers.dice);
    console.debug(`Better Roll Formulas | Registering Dice Modifiers`);

    libWrapper.register(
        "better-roll-formulas",
        "Roll.prototype.constructor.parse",
        dice.parse.bind(this),
        libWrapper.WRAPPER
    );
})