import { vars } from "../variables.js";
import { tipTotal, peopleTotal } from "../getId.js";
import { resizeText } from "./resizeText.js";

export const calcTip = () => {
    vars.billDivided = vars.bill / vars.people;
    vars.tip = (vars.billDivided * vars.percent) / 100;
    vars.totalPerPerson = vars.billDivided + vars.tip;

    resizeText();

    if (isNaN(vars.totalPerPerson) || vars.totalPerPerson === Infinity) {
        vars.tip = 0;
        vars.totalPerPerson = 0;
    }

    tipTotal.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(vars.tip);

    peopleTotal.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(vars.totalPerPerson);
};