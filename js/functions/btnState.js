import { tipBtns } from "../ids+variables/getId.js";
import { vars } from "../ids+variables/variables.js";
import { calcTip } from "./calcTip.js";

export const btnState = (e) => {
    vars.percent = e.target.value;
    vars.activeBtn = e.target;

    vars.index = Array.from(tipBtns.children).indexOf(e.target);

    if (e.target.className === "inactive") {
        e.target.className = "active";
    }
    if (vars.prevBtn.length === 2) {
        vars.prevBtn.splice(0, 1);
    }
    if (vars.index > -1) {
        vars.prevBtn.push(vars.index);
    }
    if (vars.prevBtn.length > 1) {
        if (vars.prevBtn[0] === vars.prevBtn[1]) {
            return;
        } else {
            tipBtns.children[vars.prevBtn[0]].className = "inactive";
        }
    }
    if (vars.bill && vars.people && vars.percent) {
        calcTip();
    }
};
