import { vars, validKey } from "../ids+variables/variables.js";

export const validInput = (e, inputLength) => {
    if (e.key !== "Backspace") {
        if (e.key === "." && vars.isLastCharDec === true) {
            false;
        } else {
            if (vars.isValid.test(e.key) && vars.keyPress[0] !== "0") {
                vars.keyPress.push(e.key);
            } else {
                if (vars.keyPress[0] === "0" && e.key === ".") {
                    vars.keyPress.push(e.key);
                } else {
                    if (vars.keyPress[0] === "0" && vars.keyPress[1] === ".") {
                        vars.keyPress.push(e.key);
                    } else {
                        if (e.key in validKey) {
                            true;
                        } else {
                            e.preventDefault();
                        }
                    }
                }
            }
        }
    }

    if (vars.keyPress.length < vars.maxLength) {
        true;
    } else {
        if (e.key !== "." && vars.isLastCharDec === false) {
            vars.keyPress.pop();
            e.preventDefault();
        }
        if (vars.isLastCharDec === true) {
            vars.keyPress.pop();
            e.preventDefault();
        }
    }

    if (e.key === "." && vars.isLastCharDec === true) {
        e.preventDefault();
    }

    if (e.key === "." && vars.isLastCharDec === false) {
        vars.maxLength = vars.keyPress.length + 3;
        vars.isLastCharDec = true;
    }

    if (e.key === "Backspace") {
        vars.keyPress.pop();
        if (vars.keyPress.length === vars.maxLength - 4) {
            vars.maxLength = inputLength;
            vars.isLastCharDec = false;
        }
    }
};
