const init = () => {
    // ID's
    const gridTwo = document.querySelector(".grid-2");
    const billInput = document.getElementById("bill");
    const peopleInput = document.getElementById("people");
    const custom = document.getElementById("custom");
    const resetBtn = document.getElementById("reset");
    const tipBtns = document.getElementById("tipBtns");
    const tipTotal = document.getElementById("tipTotal");
    const peopleTotal = document.getElementById("personTotal");
    const cantBeZeroBill = document.getElementById("cantBeZeroBill");
    const cantBeZeroPeople = document.getElementById("cantBeZeroPeople");

    // calcTip values
    let bill;
    let people;
    let percent = 0;

    // calcTip calculation
    let billDivided;
    let tip;
    let totalPerPerson;

    // tipBtns
    let prevBtn = [];
    let activeBtn;
    let index;

    // inputState & isValid
    let isLastCharDec = false;
    let isValid = /\d|\./;
    let isDec = /\./;
    let maxLength;
    let keyPress = [];

    // resizeText
    let fontSizesL = ["48px", "36px", "32px", "28px"];
    let fontSizesM = ["36px", "32px", "28px", "24px"];
    let fontSizesS = ["36px", "30px", "24px", "20px", "18px"];

    // valid keys
    const arrows = {
        ArrowRight: null,
        ArrowLeft: null,
        Tab: null,
        Enter: null,
    };

    // bill input move to last selected button
    let isBtnActive = false;

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
        keyPress = [];
    };

    billInput.onkeydown = (e) => {
        validInput(e, 6);
        if (e.key === "Enter" && isBtnActive === true) {
            if (index != 0) {
                tipBtns.children[index].focus();
            }
            isBtnActive = false;
        }
        if (e.key === "Enter" && isBtnActive === false) {
            tipBtns.children[0].focus();
            isBtnActive = true;
        }
    };

    billInput.onkeyup = (e) => {
        bill = e.target.value;

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

    tipBtns.onkeydown = (e) => {
        if (e.shiftKey && e.key === "Enter") {
            billInput.focus();
            isBtnActive = true;
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

    const btnState = (e) => {
        percent = e.target.value;
        activeBtn = e.target;

        index = Array.from(tipBtns.children).indexOf(e.target);
        console.log(index);

        if (e.target.className === "inactive") {
            e.target.className = "active";
        }
        if (prevBtn.length === 2) {
            prevBtn.splice(0, 1);
        }
        if (index > -1) {
            prevBtn.push(index);
        }
        if (prevBtn.length > 1) {
            if (prevBtn[0] === prevBtn[1]) {
                return;
            } else {
                tipBtns.children[prevBtn[0]].className = "inactive";
            }
        }
        if (bill && people && percent) {
            calcTip();
        }
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
        keyPress = [];
    };

    custom.onkeydown = (e) => {
        if (e.key === "Enter") {
            peopleInput.focus();
        }
        validInput(e, 3);
    };

    custom.onkeyup = (e) => {
        percent = e.target.value;

        if (bill && people && percent) {
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
        keyPress = [];
    };

    peopleInput.onkeydown = (e) => {
        if (e.key === ".") {
            e.preventDefault();
        } else {
            validInput(e, 3);
        }

        if (e.shiftKey && e.key === "Tab") {
            if (index != 5) {
                tipBtns.children[index + 1].focus();
            }
        }
        if (e.key === "Enter") {
            resetBtn.className = "active"
            resetBtn.focus();
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

    const inputState = (e, inputLength, decPlaces) => {
        let inputValue = e.target.value;
        keyPress = [...inputValue];

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
                            if (e.key in arrows) {
                                true;
                            } else {
                                e.preventDefault();
                            }
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
        }

        if (e.key === "Backspace") {
            keyPress.pop();
            if (keyPress.length === maxLength - 4) {
                maxLength = inputLength;
                isLastCharDec = false;
            }
        }
    };

    const reset = () => {
        keyPress = [];

        tipTotal.textContent = "$0.00";
        peopleTotal.textContent = "$0.00";
        billInput.value = "";
        peopleInput.value = "";
        custom.value = "";

        tipTotal.removeAttribute("style");
        peopleTotal.removeAttribute("style");

        bill = 0;
        people = 0;
        percent = 0;

        activeBtn === undefined ? true : (activeBtn.className = "inactive");

        window.scrollTo(0, 0, document.body.scrollHeight);
    };

    const resizeText = () => {
        let width = document.body.offsetWidth;
        if (width < 360) {
            if (totalPerPerson < 100) {
                if (totalPerPerson < 100 && tip > 9.99) {
                    tipTotal.style.fontSize = fontSizesS[1];
                    peopleTotal.style.fontSize = fontSizesS[0];
                } else {
                    tipTotal.style.fontSize = fontSizesS[0];
                    peopleTotal.style.fontSize = fontSizesS[0];
                }
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
        if (width < 550 && width > 360) {
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
        if (width > 550) {
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
    };
};

init();
