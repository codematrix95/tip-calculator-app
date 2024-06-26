# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

This is a calculator that calculates the total bill based on how much you choose to tip.
It divides the bill and tip evenly between the number of people paying.

### The challenge

Users should be able to:

-   View the optimal layout for the app depending on their device's screen size
-   See hover states for all interactive elements on the page
-   Calculate the correct tip and total cost of the bill per person

### Screenshot

![alt text](my-solution.png?raw=true)

### Links

-   Solution URL: (https://github.com/codematrix95/tip-calculator-app)
-   Live Site URL: (https://codematrix95.github.io/tip-calculator-app/)

## My process

My first objective was just getting the website to work intially.

Once I confirmed that it was functioning properly and the calculations were correct I began to style my website to match the given images as closely as possible while remaining efficient with time.

Once the styling was done I began testing for bugs. After the bugs were repaired I started
refactoring my code so it would be easier to read and more efficient.

### Built with

-   HTML5 markup
-   SCSS Variables and Mixins
-   Flexbox
-   CSS Grid
-   Mobile-first workflow
-   Javascript

### What I learned

I was very thankful to be aware of SCSS for this project due to a lot of the complexity and
repetive code that was able to be eliminated. I was super stoked when I realized for my
Bill and People inputs I could use a Mixin so the code could be written once and applied
to both elements.

```scss
@mixin bill-people-inputs {
    label {
        font-size: 16px;
        margin-bottom: 6px;
        grid-row: 1;
    }
    span {
        font-size: 16px;
        margin-bottom: 6px;
        text-align: end;
        grid-row: 1;

        &.active {
            color: $burntorange;
        }
        &.inactive {
            color: $white;
        }
    }
    input {
        background-color: $verylightgrayishcyan;
        color: $verydarkcyan;
        grid-column: 1 / 3;
        grid-row: 2;
        font-size: 24px;
        padding: 6px 12px;
        border-radius: 4px;
        border: none;
        text-align: end;
        min-width: 0px;
        min-height: 0px;
        &.active {
            cursor: pointer;
            background-color: $verylightpink;
            outline: auto;
            outline-style: solid;
            outline-color: $burntorange;
            caret-color: $burntorange;
        }
        &.inactive {
            outline: none;
            caret-color: $strongcyan;
            @media (hover: hover) {
                &:hover {
                    outline: auto;
                    outline-style: solid;
                    outline-color: $strongcyan;
                    cursor: pointer;
                }
            }
        }
        &::placeholder {
            color: $lightgrayishcyan;
        }
    }
    img {
        grid-row: 2;
        grid-column: 1;
        height: 45%;
        padding-left: 8px;
        @include desktop {
            padding-left: 12px;
        }
    }
}
```

This was probably the most challenging part of the code because it was very difficult to limit the users
input in a dynamic way but as I kept breaking my code I realized I could use arrays to keep track of my state
and dynamically change those arrays based on the value of the input with 2 reusuable functions

```js
const inputState = (e, intPlaces, decPlaces) => {
    vars.inputValue = [...e.target.value];
    vars.keyPressed = vars.inputValue
    vars.caretPos = e.target.selectionEnd;

    if (vars.isDec.test(vars.inputValue)) {
        vars.indexOfDec = vars.inputValue.indexOf(".");
        vars.intArr = vars.inputValue.slice(0, vars.indexOfDec);
        let indexOfDecEnd = vars.indexOfDec + decPlaces + 1;
        
        if (vars.caretPos > vars.indexOfDec) {
            vars.decArr = vars.inputValue.slice(vars.indexOfDec, indexOfDecEnd);
            vars.maxLength = vars.intArr.length + decPlaces + 1;
        }

        if (vars.caretPos <= vars.indexOfDec) {
            if (vars.decArr.length === decPlaces + 1) {
                vars.maxLength = intPlaces + decPlaces + 1;
            } else {
                vars.maxLength = intPlaces + vars.decArr.length;
            }
        }

        if(e.key === "Backspace") {
            vars.keyPressed = vars.inputValue
        }
    } else {
        vars.maxLength = intPlaces;

        if (vars.inputValue.length <= intPlaces) {
            vars.intArr = vars.inputValue;
        }
    
        if (e.key === "Backspace") {
            vars.decArr = [];
            e.target.value = vars.intArr.join("");
            vars.keyPressed = [...e.target.value]
        }        
    }   
};

const validInput = (e) => {
    if (e.key === "." && vars.isDec.test(vars.inputValue)) {
        e.preventDefault();
    } else {
        if (vars.isValid.test(e.key) && vars.inputValue[0] !== "0") {
            true;
        } else {
            if (vars.inputValue[0] === "0" && e.key === ".") {
                true;
            } else {
                if (vars.inputValue[0] === "0" && vars.inputValue[1] === ".") {
                    true;
                } else {
                    if (e.key in validKey) {
                        true;
                    } else {
                        e.preventDefault();
                    }
                }
            }
        }
    }

    if (vars.keyPressed.length < vars.maxLength) {
        true;
        if (vars.isValid.test(e.key)) {
            vars.keyPressed.push(e.key);
        }
    } else {
        if(e.key === ".") {
            vars.keyPressed.push(e.key)
        }

        if (e.key in validKey || e.key === ".") {
            true;
        } else {
            e.preventDefault();
        }
    }
};
```

I'd like to credit my mentor Abraham Cuenca (https://github.com/abrahamcuenca) for teaching me about forms and inputs it made the project a
lot more efficient with his input and guidance
```html
<div class="grid-calc">
    <div class="bill">
        <label for="bill">Bill</label>
        <span id="cantBeZeroBill" class="inactive"
            >Can't be zero</span
        >
        <input
            type="text"
            id="bill"
            class="inactive"
            name="bill"
            placeholder="0"
            autocomplete="off"
            inputmode="decimal"
        />
        <img src="images/icon-dollar.svg" alt="" />
    </div>
    <div class="tip">
        <div>Select Tip %</div>
        <form id="tipBtns" class="btns" autocomplete="off">
            <button type="button" value="5" class="inactive">
                5%
            </button>
            <button type="button" value="10" class="inactive">
                10%
            </button>
            <button type="button" value="15" class="inactive">
                15%
            </button>
            <button type="button" value="25" class="inactive">
                25%
            </button>
            <button type="button" value="50" class="inactive">
                50%
            </button>
            <input
                type="text"
                value=""
                placeholder="Custom"
                id="custom"
                class="inactive"
                size="6"
                inputmode="decimal"
            />
        </form>
    </div>

    <div class="people">
        <label for="people">Number of people</label>
        <span id="cantBeZeroPeople" class="inactive"
            >Can't be zero</span
        >
        <input
            type="text"
            id="people"
            class="inactive"
            name="people"
            placeholder="0"
            autocomplete="off"
            inputmode="decimal"
        />
        <img src="images/icon-person.svg" alt="" />
    </div>
</div>
```

### Continued development

I hope to continue to grow my knowledge on HTML semantics, SEO, and accessibility. I also want to start using frameworks 
with my new projects such as React and Bootstrap to increase efficiency and write cleaner more organized code.

### Useful resources

- (https://github.com/abrahamcuenca) - I'd like to thank Abraham Cuence for all the hard work and guidance during this project without his guidance I'd still be dumpster diving youtube and forums. His input, willingness to answer my questions, and patience has been more than I could ever repay him.

## Author

-  (https://github.com/codematrix95)


## Acknowledgments

Perseverance is key. Even if you code just a little bit even an hour it's something. 
Coding is hard but if you just keep chipping away at it ask people that are more experienced than you that have the heart of a teacher
you'll get through it. 
Make sure you take notes I personally highly recommend Obsidian which was referred to me by 

Abraham Cuenca 

because it's imposible to remember everything and that's where Obsidian comes in. 

It truly is your second brain. For anyone wanting to Code I personally think 
it's a must have not a matter of whether or not you should get it.