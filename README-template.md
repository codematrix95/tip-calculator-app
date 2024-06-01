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

-   Solution URL: [Add solution URL here](https://your-solution-url.com)
-   Live Site URL: [Add live site URL here](https://your-live-site-url.com)

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

```js
const proudOfThisFunc = () => {
    console.log("🎉");
};
```

```html
<h1>Some HTML code I'm proud of</h1>
```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

-   [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
-   [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

-   Website - [Add your name here](https://www.your-site.com)
-   Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
-   Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
