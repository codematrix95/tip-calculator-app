import { vars } from "../ids+variables/variables.js";
import { tipTotal, peopleTotal } from "../ids+variables/getId.js";
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

    let x = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    tipTotal.textContent = x.format(vars.tip);
    peopleTotal.textContent = x.format(vars.totalPerPerson);
};
