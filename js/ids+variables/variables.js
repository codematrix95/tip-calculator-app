export const vars = {
    // calcTip variables to calculate tip inside of tipCalc function
    bill: undefined,
    people: undefined,
    percent: 0,

    // calcTip calculation
    billDivided: undefined,
    tip: undefined,
    totalPerPerson: undefined,

    // tipBtns
    prevBtn: [],
    activeBtn: undefined,
    index: 1,

    // used for inputState & isValid functions
    isLastCharDec: false,
    isValid: /\d|\./,
    isDec: /\./,
    maxLength: undefined,
    keyPress: [],

    // used for resizeText function
    fontSizesL: ["48px", "36px", "32px", "28px"],
    fontSizesM: ["36px", "32px", "28px", "24px"],
    fontSizesS: ["36px", "30px", "24px", "20px", "18px"],
};

// used for validInput
export const validKey = {
    // ArrowRight: null,
    // ArrowLeft: null,
    Tab: null,
    Enter: null,
};
