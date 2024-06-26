import { vars } from "../ids+variables/variables.js";

export const inputState = (e, intPlaces, decPlaces) => {
    vars.inputValue = [...e.target.value];
    vars.keyPressed = vars.inputValue;
    vars.caretPos = e.target.selectionEnd;

    if (vars.isDec.test(vars.inputValue)) {
        vars.indexOfDec = vars.inputValue.indexOf(".");
        vars.intArr = vars.inputValue.slice(0, vars.indexOfDec);
        let indexOfDecEnd = vars.indexOfDec + decPlaces + 1;

        if (vars.caretPos > vars.indexOfDec) {
            vars.decArr = vars.inputValue.slice(vars.indexOfDec, indexOfDecEnd);
            vars.maxLength = vars.intArr.length + decPlaces + 1;
        }

        if (vars.caretPos <= vars.indexOfDec) {
            if (vars.decArr.length === decPlaces + 1) {
                vars.maxLength = intPlaces + decPlaces + 1;
            } else {
                vars.maxLength = intPlaces + vars.decArr.length;
            }
        }

        if (e.key === "Backspace") {
            vars.keyPressed = vars.inputValue;
        }
    } else {
        vars.maxLength = intPlaces;

        if (vars.inputValue.length <= intPlaces) {
            vars.intArr = vars.inputValue;
        }

        if (e.key === "Backspace") {
            vars.decArr = [];
            e.target.value = vars.intArr.join("");
            vars.keyPressed = [...e.target.value];
        }
    }
};
