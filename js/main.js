import {
    billInput,
    peopleInput,
    custom,
    resetBtn,
    tipBtns,
    cantBeZeroBill,
    cantBeZeroPeople,
} from "./ids+variables/getId.js";
import { vars } from "./ids+variables/variables.js";

import { inputState } from "./functions/inputState.js";
import { validInput } from "./functions/validInput.js";
import { btnState } from "./functions/btnState.js";
import { calcTip } from "./functions/calcTip.js";
import { reset } from "./functions/reset.js";

document.body.onmouseup = (e) => {
    if (e.target.tagName === "INPUT") {
        if (e.target.selectionStart !== e.target.value.length) {
            e.target.selectionStart = e.target.value.length;
        }
    }
};

billInput.onmousedown = (e) => {
    e.target.style.caretColor = "transparent";
};

billInput.onmouseup = (e) => {
    e.target.removeAttribute("style");
};

billInput.onfocus = (e) => {
    inputState(e, 6, 3);
};

billInput.onblur = () => {
    vars.keyPress = [];
};

billInput.onkeydown = (e) => {
    validInput(e, 6);

    if (e.key === "Enter") {
        if (vars.index !== 1) {
            tipBtns.children[index].focus();
        } else {
            tipBtns.children[1].focus();
        }
    }

    if (vars.bill && vars.people && vars.percent) {
        calcTip();
    }
};

billInput.onkeyup = (e) => {
    vars.bill = e.target.value;

    if (vars.bill < 0.01 && vars.keyPress.length !== 0) {
        cantBeZeroBill.className = "active";
        billInput.className = "active";
        cantBeZeroBill.setAttribute("aria-live", "assertive");
    } else {
        cantBeZeroBill.className = "inactive";
        billInput.className = "inactive";
        cantBeZeroBill.removeAttribute("aria-live");
    }
};

tipBtns.onkeydown = (e) => {
    if (e.shiftKey && e.key === "Enter") {
        billInput.focus();
    }
    if (e.shiftKey === false && e.key === "Enter") {
        peopleInput.focus();
    }
};

tipBtns.onkeyup = (e) => {
    if (e.key === "Tab") {
        btnState(e);
    }
};

tipBtns.onclick = (e) => {
    btnState(e);
};

tipBtns.onfocus = (e) => {
    btnState(e);
};

custom.onmousedown = (e) => {
    e.target.style.caretColor = "transparent";
};

custom.onmouseup = (e) => {
    e.target.removeAttribute("style");
};

custom.onfocus = (e) => {
    inputState(e, 3, 3);
};

custom.onblur = () => {
    vars.keyPress = [];
};

custom.onkeydown = (e) => {
    if (e.key === "Enter") {
        peopleInput.focus();
    }
    validInput(e, 3);

    if (vars.bill && vars.people && vars.percent) {
        calcTip();
    }
};

custom.onkeyup = (e) => {
    vars.percent = e.target.value;

    if (vars.bill && vars.people && vars.percent) {
        calcTip();
    }
};

peopleInput.onmousedown = (e) => {
    e.target.style.caretColor = "transparent";
};

peopleInput.onmouseup = (e) => {
    e.target.removeAttribute("style");
};

peopleInput.onfocus = (e) => {
    inputState(e, 3, 0);
};

peopleInput.onblur = () => {
    vars.keyPress = [];
};

peopleInput.onkeydown = (e) => {
    if (e.key === ".") {
        e.preventDefault();
    } else {
        validInput(e, 3);
    }

    if (e.shiftKey && e.key === "Tab") {
        if (vars.index === 6) {
            e.preventDefault();
        } else {
            tipBtns.children[vars.index + 1].focus();
        }
    }
    if (e.key === "Enter") {
        resetBtn.className = "active";
        resetBtn.focus();
    }

    if (vars.bill && vars.people && vars.percent) {
        calcTip();
    }
};

peopleInput.onkeyup = (e) => {
    vars.people = e.target.value;

    if (e.shiftKey && e.key === "Tab") {
        if (vars.index === 6) {
            custom.focus();
        }
    }
    if (vars.people === "0") {
        cantBeZeroPeople.className = "active";
        peopleInput.className = "active";
        cantBeZeroPeople.setAttribute("aria-live", "assertive");
    } else {
        cantBeZeroPeople.className = "inactive";
        peopleInput.className = "inactive";
        cantBeZeroPeople.removeAttribute("aria-live");
    }
};

resetBtn.onmouseup = () => {
    billInput.focus();
    reset();
};

resetBtn.onkeydown = (e) => {
    if (e.key === "Enter") {
        billInput.focus();
        reset();
    }
};
