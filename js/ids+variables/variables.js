export const vars = {
    // calcTip variables to calculate tip and total
    bill: undefined,
    people: undefined,
    percent: 0,

    // calcTip calculation
    billDivided: undefined,
    tip: undefined,
    totalPerPerson: undefined,

    // theses variables are used to keep track of the state of the buttons
    prevBtn: [], 
    activeBtn: undefined,
    index: 1, // this is used for tabbing to the correct button see line 40 and line 135 in main.js

    // these variables are used for inputState and validInput functions
    isValid: /\d|\./, // the only values that can be entered inside of the input are digits and 1 decimal
    isDec: /\./, // used to check if there is a decimal
    maxLength: undefined, // restricts the amount that can be entered inside of the input field
    inputValue: [], // stores the value of the input
    keyPressed: [], // this is only used to prevent repeated keys and multiple key presses exceeding the maximum length (refer to validInput.js function)

    caretPos: undefined, // tracks caret position inside of input
    indexOfDec: undefined, // stores the index of the decimal
    decArr: [], // stores the decimal and numbers that come after the decimal
    intArr: [], // stores numbers that come before the decimal

    // used for resizeText function
    fontSizesL: ["48px", "36px", "32px", "28px"],
    fontSizesM: ["36px", "32px", "28px", "24px"],
    fontSizesS: ["36px", "30px", "24px", "20px", "18px"],
};

// used for validInput
export const validKey = {
    Tab: null,
    Enter: null,
    ArrowLeft: null,
    ArrowRight: null,
    Backspace: null,
};
