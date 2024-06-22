import { vars } from "../ids+variables/variables.js";
import {
    tipTotal,
    peopleTotal,
    billInput,
    peopleInput,
    custom,
} from "../ids+variables/getId.js";

export const reset = () => {
    vars.keyPress = [];

    tipTotal.textContent = "$0.00";
    peopleTotal.textContent = "$0.00";
    billInput.value = "";
    peopleInput.value = "";
    custom.value = "";

    tipTotal.removeAttribute("style");
    peopleTotal.removeAttribute("style");

    vars.bill = 0;
    vars.people = 0;
    vars.percent = 0;

    vars.activeBtn === undefined
        ? true
        : (vars.activeBtn.className = "inactive");

    window.scrollTo(0, 0, document.body.scrollHeight);
};
