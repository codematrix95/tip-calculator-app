const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const custom = document.getElementById("custom");
const resetBtn = document.getElementById("reset");
const tipBtns = document.getElementById("tipBtns");
const tipTotal = document.getElementById("tipTotal");
const peopleTotal = document.getElementById("personTotal");

const cantBeZeroBill = document.getElementById("cantBeZeroBill");
const cantBeZeroPeople = document.getElementById("cantBeZeroPeople");

// calcTip
let bill;
let people;
let percent = 0;

let billDivided;
let tip;
let totalPerPerson;

// tipBtns
let previouslyActiveBtn;
let activeBtn;

// inputState && isValid
let isLastCharDec = false;
let isValid = /\d|\./;
let isDec = /\./;
let maxLength;
let keyPress = [];

// resizeText
let fontSizesL = ["48px", "36px", "32px", "28px"];
let fontSizesM = ["36px", "32px", "28px", "24px"];
let fontSizesS = ["36px", "30px", "24px", "20px", "18px"];

billInput.onmousedown = (e) => {
    e.target.style.caretColor = "transparent";
};

billInput.onmouseup = (e) => {
    e.target.removeAttribute("style");
    cursorEnd(e);
    inputState(e, 6, 3);
    console.log(maxLength);
};

billInput.onblur = () => {
    keyPress = [];
};

billInput.onkeydown = (e) => {
    validInput(e, 6);
    console.log(keyPress.length);
    console.log(maxLength);
};

billInput.onkeyup = (e) => {
    bill = e.target.value;
    console.log(bill);

    if (bill < 0.01 && keyPress.length !== 0) {
        cantBeZeroBill.className = "active";
        billInput.className = "active";
    } else {
        cantBeZeroBill.className = "inactive";
        billInput.className = "inactive";
    }
    if (bill && people && percent) {
        calcTip();
    }
};

tipBtns.onclick = (e) => {
    percent = e.target.value;
    activeBtn = e.target;

    if (typeof previouslyActiveBtn == "undefined") {
        previouslyActiveBtn = e.target;
    }

    if (activeBtn.className == "inactive") {
        activeBtn.className = "active";
        console.log(previouslyActiveBtn);
    }

    if (
        percent > previouslyActiveBtn.value ||
        percent < previouslyActiveBtn.value
    ) {
        previouslyActiveBtn.className = "inactive";
    }

    if (bill && people && percent) {
        calcTip();
    }

    e.target.onblur = () => {
        previouslyActiveBtn = e.target;
        if (bill && people && percent) {
            calcTip();
        }
    };
};

custom.onmousedown = (e) => {
    e.target.style.caretColor = "transparent";
};

custom.onmouseup = (e) => {
    e.target.removeAttribute("style");
    cursorEnd(e);
    inputState(e, 3, 3);
    console.log(maxLength);
};

custom.onblur = () => {
    keyPress = [];
    console.log(keyPress + "custom");
};

custom.onkeydown = (e) => {
    validInput(e, 3);
};

custom.onkeyup = (e) => {
    percent = e.target.value;
    if (bill && people && percent) {
        calcTip();
    }
};

custom.onmousedown = (e) => {
    e.target.style.caretColor = "transparent";
};

peopleInput.onmousedown = (e) => {
    e.target.style.caretColor = "transparent";
};

peopleInput.onmouseup = (e) => {
    e.target.removeAttribute("style");
    cursorEnd(e);
    inputState(e, 3, 0);
};

peopleInput.onblur = () => {
    keyPress = [];
};

peopleInput.onkeydown = (e) => {
    if (e.key === ".") {
        e.preventDefault();
    } else {
        validInput(e, 3);
    }
};

peopleInput.onkeyup = (e) => {
    people = e.target.value;

    if (people === "0") {
        cantBeZeroPeople.className = "active";
        peopleInput.className = "active";
    } else {
        cantBeZeroPeople.className = "inactive";
        peopleInput.className = "inactive";
    }

    if (bill && people && percent) {
        calcTip();
    }
};

resetBtn.onclick = () => {
    reset();
};

const calcTip = () => {
    billDivided = bill / people;
    tip = (billDivided * percent) / 100;
    totalPerPerson = billDivided + tip;

    resizeText();

    if (isNaN(totalPerPerson) || totalPerPerson === Infinity) {
        tip = 0;
        totalPerPerson = 0;
    }

    tipTotal.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(tip);

    peopleTotal.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(totalPerPerson);
};

const cursorEnd = (e) => {
    e.target.selectionStart = e.target.value.length;
};

const inputState = (e, inputLength, decPlaces) => {
    let inputValue = e.target.value;
    keyPress = [...inputValue];

    console.log(keyPress);

    if (isDec.test(e.target.value)) {
        isLastCharDec = true;
        maxLength = inputLength + decPlaces;
    } else {
        isLastCharDec = false;
        maxLength = inputLength;
    }
};

const validInput = (e, inputLength) => {
    if (e.key !== "Backspace") {
        console.log(maxLength);
        if (e.key === "." && isLastCharDec === true) {
            false;
        } else {
            if (isValid.test(e.key) && keyPress[0] !== "0") {
                keyPress.push(e.key);
            } else {
                if (keyPress[0] === "0" && e.key === ".") {
                    keyPress.push(e.key);
                } else {
                    if (keyPress[0] === "0" && keyPress[1] === ".") {
                        keyPress.push(e.key);
                    } else {
                        e.preventDefault();
                    }
                }
            }
        }
    }

    if (keyPress.length < maxLength) {
        true;
    } else {
        if (e.key !== "." && isLastCharDec === false) {
            keyPress.pop();
            e.preventDefault();
        }

        if (isLastCharDec === true) {
            keyPress.pop();
            e.preventDefault();
        }
    }

    if (e.key === "." && isLastCharDec === true) {
        e.preventDefault();
    }

    if (e.key === "." && isLastCharDec === false) {
        maxLength = keyPress.length + 3;
        isLastCharDec = true;
        console.log(maxLength);
    }

    if (e.key === "Backspace") {
        keyPress.pop();
        if (keyPress.length === maxLength - 4) {
            console.log("decimal removed");
            maxLength = inputLength;
            isLastCharDec = false;
        }
    }
    console.log(keyPress);
};

const reset = () => {
    keyPress = [];

    tipTotal.textContent = "$0.00";
    peopleTotal.textContent = "$0.00";
    billInput.value = "";
    peopleInput.value = "";
    custom.value = "";

    bill = 0;
    people = 0;
    percent = 0;

    activeBtn === undefined ? true : (activeBtn.className = "inactive");

    window.scrollTo(0, 0, document.body.scrollHeight);
};

const resizeText = () => {
    if (document.body.offsetWidth > 550) {
        if (totalPerPerson < 1000) {
            tipTotal.style.fontSize = fontSizesL[0];
            peopleTotal.style.fontSize = fontSizesL[0];
        }

        if (totalPerPerson > 1000) {
            tipTotal.style.fontSize = fontSizesL[1];
            peopleTotal.style.fontSize = fontSizesL[1];
        }
        if (totalPerPerson > 10000) {
            tipTotal.style.fontSize = fontSizesL[2];
            peopleTotal.style.fontSize = fontSizesL[2];
        }
        if (totalPerPerson > 100000) {
            tipTotal.style.fontSize = fontSizesL[3];
            peopleTotal.style.fontSize = fontSizesL[3];
        }
    }
    if (document.body.offsetWidth < 550) {
        if (totalPerPerson < 1000) {
            tipTotal.style.fontSize = fontSizesM[0];
            peopleTotal.style.fontSize = fontSizesM[0];
        }

        if (totalPerPerson > 1000) {
            tipTotal.style.fontSize = fontSizesM[1];
            peopleTotal.style.fontSize = fontSizesM[1];
        }
        if (totalPerPerson > 10000) {
            tipTotal.style.fontSize = fontSizesM[2];
            peopleTotal.style.fontSize = fontSizesM[2];
        }
        if (totalPerPerson > 100000) {
            tipTotal.style.fontSize = fontSizesM[3];
            peopleTotal.style.fontSize = fontSizesM[3];
        }
    }
    if (document.body.offsetWidth < 360) {
        if (totalPerPerson < 1000) {
            tipTotal.style.fontSize = fontSizesS[0];
            peopleTotal.style.fontSize = fontSizesS[0];
        }

        if (totalPerPerson > 100) {
            tipTotal.style.fontSize = fontSizesS[1];
            peopleTotal.style.fontSize = fontSizesS[1];
        }
        if (totalPerPerson > 1000) {
            tipTotal.style.fontSize = fontSizesS[2];
            peopleTotal.style.fontSize = fontSizesS[2];
        }
        if (totalPerPerson > 10000) {
            tipTotal.style.fontSize = fontSizesS[3];
            peopleTotal.style.fontSize = fontSizesS[3];
        }
        if (totalPerPerson > 100000) {
            tipTotal.style.fontSize = fontSizesS[4];
            peopleTotal.style.fontSize = fontSizesS[4];
        }
    }
};
