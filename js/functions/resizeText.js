import { vars } from "../ids+variables/variables.js";
import { tipTotal, peopleTotal } from "../ids+variables/getId.js";

export const resizeText = () => {
    let width = document.body.offsetWidth;
    if (width < 360) {
        if (vars.totalPerPerson < 100) {
            if (vars.totalPerPerson < 100 && vars.tip > 9.99) {
                tipTotal.style.fontSize = vars.fontSizesS[1];
                peopleTotal.style.fontSize = vars.fontSizesS[0];
            } else {
                tipTotal.style.fontSize = vars.fontSizesS[0];
                peopleTotal.style.fontSize = vars.fontSizesS[0];
            }
        }

        if (vars.totalPerPerson > 100) {
            tipTotal.style.fontSize = vars.fontSizesS[1];
            peopleTotal.style.fontSize = vars.fontSizesS[1];
        }
        if (totalPerPerson > 1000) {
            tipTotal.style.fontSize = vars.fontSizesS[2];
            peopleTotal.style.fontSize = vars.fontSizesS[2];
        }
        if (totalPerPerson > 10000) {
            tipTotal.style.fontSize = vars.fontSizesS[3];
            peopleTotal.style.fontSize = vars.fontSizesS[3];
        }
        if (totalPerPerson > 100000) {
            tipTotal.style.fontSize = vars.fontSizesS[4];
            peopleTotal.style.fontSize = vars.fontSizesS[4];
        }
    }
    if (width < 550 && width > 360) {
        if (vars.totalPerPerson < 1000) {
            tipTotal.style.fontSize = vars.fontSizesM[0];
            peopleTotal.style.fontSize = vars.fontSizesM[0];
        }

        if (vars.totalPerPerson > 1000) {
            tipTotal.style.fontSize = vars.fontSizesM[1];
            peopleTotal.style.fontSize = vars.fontSizesM[1];
        }
        if (vars.totalPerPerson > 10000) {
            tipTotal.style.fontSize = vars.fontSizesM[2];
            peopleTotal.style.fontSize = vars.fontSizesM[2];
        }
        if (vars.totalPerPerson > 100000) {
            tipTotal.style.fontSize = vars.fontSizesM[3];
            peopleTotal.style.fontSize = vars.fontSizesM[3];
        }
    }
    if (width > 550) {
        if (vars.totalPerPerson < 1000) {
            tipTotal.style.fontSize = vars.fontSizesL[0];
            peopleTotal.style.fontSize = vars.fontSizesL[0];
        }

        if (vars.totalPerPerson > 1000) {
            tipTotal.style.fontSize = vars.fontSizesL[1];
            peopleTotal.style.fontSize = vars.fontSizesL[1];
        }
        if (vars.totalPerPerson > 10000) {
            tipTotal.style.fontSize = vars.fontSizesL[2];
            peopleTotal.style.fontSize = vars.fontSizesL[2];
        }
        if (vars.totalPerPerson > 100000) {
            tipTotal.style.fontSize = vars.fontSizesL[3];
            peopleTotal.style.fontSize = vars.fontSizesL[3];
        }
    }
};
