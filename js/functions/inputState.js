import { vars } from "../ids+variables/variables.js";

export const inputState = (e, inputLength, decPlaces) => {
    let inputValue = e.target.value;
    vars.keyPress = [...inputValue];

    if (vars.isDec.test(inputValue)) {
        vars.isLastCharDec = true;
        vars.maxLength = inputLength + decPlaces;
    } else {
        vars.isLastCharDec = false;
        vars.maxLength = inputLength;
    }
};
