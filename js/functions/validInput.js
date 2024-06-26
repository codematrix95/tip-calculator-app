import { vars, validKey } from "../ids+variables/variables.js";

export const validInput = (e) => {
    if (e.key === "." && vars.isDec.test(vars.inputValue)) {
        e.preventDefault();
    } else {
        if (vars.isValid.test(e.key) && vars.inputValue[0] !== "0") {
            true;
        } else {
            if (vars.inputValue[0] === "0" && e.key === ".") {
                true;
            } else {
                if (vars.inputValue[0] === "0" && vars.inputValue[1] === ".") {
                    true;
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

    if (vars.keyPressed.length < vars.maxLength) {
        true;
        if (vars.isValid.test(e.key)) {
            vars.keyPressed.push(e.key);
        }
    } else {
        if(e.key === ".") {
            vars.keyPressed.push(e.key)
        }

        if (e.key in validKey || e.key === ".") {
            true;
        } else {
            e.preventDefault();
        }
    }
};
