import * as dice from './dice/_module.mjs'

Hooks.once("init", () => {
    console.log("Better Roll Formulas | Initializing Better Roll Formulas")

    Object.assign(CONFIG.Dice.functions, dice.functions);

    libWrapper.register(
        "better-roll-formulas",
        "Roll.prototype.constructor.parse",
        dice.parse.bind(this),
        libWrapper.WRAPPER
    );
})