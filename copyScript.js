// ****** Scratch card game ******

// ☑️LUCKY NUMBERS and YOUR NUMBERS get randomly generated & added to the DOM using Math.random (1-20)
// 2 LUCKY NUMBERS, 6 YOUR NUMBERS
// ☑️prize amounts get randomly generated and assigned to a YOUR NUMBER box (prize array has 4 values = i.e. $100, $2, $10, $45) -> use Math.random to pick a random # 0-3 and then use that as a index to pick a prize amount from prize array
// ☑️set up totalPrizeAmount, initialize to 0
// ☑️user clicks LUCKY NUMBER boxes to reveal numbers
// ☑️user clicks YOUR NUMBER boxes to reveal numbers
// ☑️after all boxes are revealed  user clicks the "submit card" button. On "click" of the button, loop through YOUR NUMBERS and...
// ☑️if the  YOUR NUMBERS scratched matches one of the LUCKY NUMBERS, user wins the prize amount associated with that number's box, if multiple are a match, add the prize amounts together (add to totalPrizeAmount for stretch) 
// ☑️the user will be informed of the prize amount won
// ☑️user can click a button for a new game (resets the scratch card)


// ***stretch goals*** 
// => ☑️coin cursor
// => animating scratch 
// => additional games & keeps track of accumulated prize
// => add additional bonus game to card: three boxes where the user scratches and has to find 3 identical symbol
// => when prize amount is displayed to user, have coins fall top->bottom accross the screen


// -------------------------

// NAMESPACE for application code
// all variables & fxns go here
const scratchCardApp = {};

// prize amounts
scratchCardApp.prizeArray = [
    '$2',
    '$6',
    '$10',
    '$25',
    '$45',
    '$65',
    '$85',
    '$100',
    '$125',
    '$200'
]

// initializing variables
scratchCardApp.luckyNumbersArray = [];
scratchCardApp.yourNumbersArray = [];
scratchCardApp.prizeAmountArray = [];
scratchCardApp.gamePrizeAmount = 0;
scratchCardApp.finalGamePrizeAmount;

// generate random numbers between 1-20 (number on scratch boxes)
scratchCardApp.generateRandomNumber = function() {
    return Math.floor(Math.random() * 20) + 1;
}

// generate random numbers between 1-8 (index for prizeArray)
scratchCardApp.generateRandomNumber2 = function () {
    return Math.floor(Math.random() * 8) + 1;
}

// assign random numbers & display in the scratch boxes
scratchCardApp.assignRandomNumber = function() {
    // assign LUCKY NUMBERS
    for (let i = 1; i <= 2; i++) {
        let randomNumber = scratchCardApp.generateRandomNumber();
        // check to see if the generated random number is already in the array, and if so, decrement i by 1 (ensures that the two LUCKY numbers are always different) 
        if (scratchCardApp.luckyNumbersArray.includes(randomNumber)) {
            i--; 
        }else {
            scratchCardApp.luckyNumbersArray.push(randomNumber);
            $(`.box${i}`).append(`
                <p class='ranNum'>${randomNumber}</p>
            `);
        }
    } 
    
    // assign YOUR NUMBERS
    for (let i = 3; i <=8; i++) {
        // generate random number to put in scratch box
        let randomNumber = scratchCardApp.generateRandomNumber();
         // add random numbers to the yourNumbersArray (array will be used to compare YOUR NUMBERS and LUCKY NUMBERS)
        scratchCardApp.yourNumbersArray.push(randomNumber);
        // pick random prize to go in scratch box
        let randomPrizeIndex = scratchCardApp.generateRandomNumber2();
        let randomPrize = scratchCardApp.prizeArray[randomPrizeIndex];
        // add random prize to the prizeAmountArray (array will be used to tally prize for matching numbers)
        scratchCardApp.prizeAmountArray.push(randomPrize);
        // display the random number and prize in the scratch box
        // also display a cover for the scratch box
        $(`.box${i}`).append(`
            <p class='ranNum'>${randomNumber}</p>
            <p class='ranPrize'>${randomPrize}</p>
        `);
    }    
}

// determining the prizeAmountWon for this game
scratchCardApp.prizeAmountWon = function () {
    // map over the prizeAmountArray (all the randomly chosen prize amounts for this instance of the game) => remove the $ from the prize amounts, convert the string into a number, and then return in a new array newPrizeArray
    // doing this b/c need to add the prize amounts together (need to be numbers to do this)
    let numberPrizeArray = scratchCardApp.prizeAmountArray.map(function(item) {
        return parseInt(item.slice(1));
    });
    // check to see if any of the YOUR NUMBERS matches with either of the LUCKY NUMBERS 
    // loop through the items in yourNumbersArray (the 6 randomly chosen numbers displayed in YOUR NUMBERS scratch boxes)
    for (let i = 0; i < 6; i++) {
        // if the number at the ith position of yourNumbersArray is equal to the first LUCKY NUMBER or if it is equal to the second LUCKY NUMBER
        if (scratchCardApp.yourNumbersArray[i] === scratchCardApp.luckyNumbersArray[0] || scratchCardApp.yourNumbersArray[i] === scratchCardApp.luckyNumbersArray[1]) {
            // prizeAmount started at 0, add the matching numbers' prize value to the prizeAmount variable (able to do this b/c the yourNumbersArray[i] and numberPrizeArray[i] correspond to the same ith scratch box)
            scratchCardApp.gamePrizeAmount += numberPrizeArray[i];
        }
    }
    // convert prizeAmount back to a string and add "$" to the front
    scratchCardApp.finalGamePrizeAmount = `$${scratchCardApp.gamePrizeAmount.toString()}`;
}

// display prize screen to alert user of the amount won during this game
scratchCardApp.displayPrizeScreen = function() {
    // winner card
    if (scratchCardApp.finalGamePrizeAmount !== '$0') {
        $('main .flexContainer').append(`
        <div class="prizeAlertContainer">
            <div class=prizeAlert>
                <p>Winner!</p>
                <p>${scratchCardApp.finalGamePrizeAmount}</p>
                <div id="starBurst" class="imageContainer">
                    <img src="./assets/starburst.png">
                </div>
                <button class="reset outline">New Card</button>
            </div>
        </div>    
        `); 
    // non-winner card
    } else {
        $('main .flexContainer').append(`
        <div class="prizeAlertContainer">
            <div class=prizeAlert>
                <p>Non-winner</p>
                <div id="starBurst" class="imageContainer">
                    <img src="./assets/starburst.png">
                </div>
                <div class="buttonContainer">
                    <button class="reset outline">New Card</button>
                </div>
            </div>
        </div>    
        `); 
    }
}

scratchCardApp.submitButtonToggle = function() {
    $('.submit').toggleClass('hide');
    // $('.buttonContainer').toggleClass('hide');
}

for (let x=0; x<300; x++) {
    $('.scratchBoxCover').append(`<div class="gridDiv" id="${x}"></div>`)
}

// function that contains all the events to listen for
scratchCardApp.events = function() {
    //event listeners here

    // click on HAMBURGER MENU
    $('.fa-question').on('click', function() {
        $('.hamMenu').toggleClass('openMenu');
    })

    // click on SCRATCH BOX
    $('.numBox').on('click','.scratchBoxCover', function() {
        $(this).addClass('scratched');
    })

    $('.scratchBoxCover').each(function(i) {
        i = i + 1
        console.log(i);
            $(`.coverBox${i} .gridDiv`).on('mouseover', function () {
                const index = $(this).index()
                // console.log(event);
                console.log(this);
                const colCount = $('.scratchBoxCover').css('grid-template-columns').split(' ').length
                console.log(colCount);
                const rowPosition = Math.floor(index / colCount);
                const colPosition = index % colCount;
                console.log(rowPosition, colPosition);

                // Get the index numbers of all the siblings
                $(this).addClass('notVisible scratched')

                // function to get the index of a sibling based on their row and column coordinates (calculated from the div the mouseover event occurred on)
                const getIndex = (row, col) => {
                    return col + (colCount * row)
                }

                if (rowPosition === 0) {
                    // the div is in row 0 (first row), does not need a TOP sibling
                    if (colPosition === 0) {
                        // the div is in col 0 (first column), does not need a LEFT sibling
                        // siblings => R, B, RB
                        // (rowPosition, colPosition) => (0, 0)

                        // find the index of the R/B siblings
                        const siblingRight = getIndex(0, 0 + 1)
                        console.log(siblingRight);
                        const siblingBottom = getIndex(0 + 1, 0)
                        console.log(siblingBottom);
                        const siblingRightBottom = getIndex(0 + 1, 0 + 1)
                        console.log(siblingRightBottom);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingRight}]`).addClass('siblingRight')
                        $(`.coverBox${i} div[id=${siblingBottom}]`).addClass('siblingBottom')
                        $(`.coverBox${i} div[id=${siblingRightBottom}]`).addClass('siblingRightBottom')

                    } else if (colPosition === 15) {
                        // the div is in col 15 (last column), does not need a RIGHT sibling
                        // siblings => L, B, LB
                        // (rowPosition, colPosition) => (0, 15)

                        // find the index of the L/B siblings
                        const siblingLeft = getIndex(0, 15 - 1)
                        console.log(siblingLeft);
                        const siblingBottom = getIndex(0 + 1, 15)
                        console.log(siblingBottom);
                        const siblingLeftBottom = getIndex(0 + 1, 15 - 1)
                        console.log(siblingLeftBottom);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingLeft}]`).addClass('siblingLeft')
                        $(`.coverBox${i} div[id=${siblingBottom}]`).addClass('siblingBottom')
                        $(`.coverBox${i} div[id=${siblingLeftBottom}]`).addClass('siblingLeftBottom')

                    } else {
                        // the div is not in col 0 or 15 (its in a middle column), needs both a LEFT and RIGHT sibling
                        // siblings => L, R, B, LB, RB
                        // (rowPosition, colPosition) => (0, y)

                        // find the index of the L/R/B siblings
                        const siblingLeft = getIndex(0, colPosition - 1)
                        console.log(siblingLeft);
                        const siblingRight = getIndex(0, colPosition + 1)
                        console.log(siblingRight);
                        const siblingBottom = getIndex(0 + 1, colPosition)
                        console.log(siblingBottom);
                        const siblingLeftBottom = getIndex(0 + 1, colPosition - 1)
                        console.log(siblingLeftBottom);
                        const siblingRightBottom = getIndex(0 + 1, colPosition + 1)
                        console.log(siblingRightBottom);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingLeft}]`).addClass('siblingLeft')
                        $(`.coverBox${i} div[id=${siblingRight}]`).addClass('siblingRight')
                        $(`.coverBox${i} div[id=${siblingBottom}]`).addClass('siblingBottom')
                        $(`.coverBox${i} div[id=${siblingLeftBottom}]`).addClass('siblingLeftBottom')
                        $(`.coverBox${i} div[id=${siblingRightBottom}]`).addClass('siblingRightBottom')
                    }
                } else if (rowPosition === 15) {
                    // the div is in row 15 (last row), does not need a BOTTOM sibling
                    if (colPosition === 0) {
                        // the div is in col 0 (first column), does not need a LEFT sibling
                        // siblings => R, T, RT
                        // (rowPosition, colPosition) => (15, 0)

                        // find the index of the R/T siblings
                        const siblingRight = getIndex(15, 0 + 1)
                        console.log(siblingRight);
                        const siblingTop = getIndex(15 - 1, 0)
                        console.log(siblingTop);
                        const siblingRightTop = getIndex(15 - 1, 0 + 1)
                        console.log(siblingRightTop);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingRight}]`).addClass('siblingRight')
                        $(`.coverBox${i} div[id=${siblingTop}]`).addClass('siblingTop')
                        $(`.coverBox${i} div[id=${siblingRightTop}]`).addClass('siblingRightTop')

                    } else if (colPosition === 15) {
                        // the div is in col 15 (last column), does not need a RIGHT sibling
                        // siblings => L, T, LT
                        // (rowPosition, colPosition) => (15, 15)

                        // find the index of the L/T siblings
                        const siblingLeft = getIndex(15, 15 - 1)
                        console.log(siblingLeft);
                        const siblingTop = getIndex(15 - 1, 15)
                        console.log(siblingTop);
                        const siblingLeftTop = getIndex(15 - 1, 15 - 1)
                        console.log(siblingLeftTop);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingLeft}]`).addClass('siblingLeft')
                        $(`.coverBox${i} div[id=${siblingTop}]`).addClass('siblingTop')
                        $(`.coverBox${i} div[id=${siblingLeftTop}]`).addClass('siblingLeftTop')

                    } else {
                        // the div is not in col 0 or 15 (its in a middle column), needs both a LEFT, RIGHT and TOP sibling
                        // siblings => L, R, T, LT, RT
                        // (rowPosition, colPosition) => (15, y)

                        // find the index of the L/T siblings
                        const siblingLeft = getIndex(15, colPosition - 1)
                        console.log(siblingLeft);
                        const siblingRight = getIndex(15, colPosition + 1)
                        console.log(siblingRight);
                        const siblingTop = getIndex(15 - 1, colPosition)
                        console.log(siblingTop);
                        const siblingLeftTop = getIndex(15 - 1, colPosition - 1)
                        console.log(siblingLeftTop);
                        const siblingRightTop = getIndex(15 - 1, colPosition + 1)
                        console.log(siblingRightTop);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingLeft}]`).addClass('siblingLeft')
                        $(`.coverBox${i} div[id=${siblingRight}]`).addClass('siblingRight')
                        $(`.coverBox${i} div[id=${siblingTop}]`).addClass('siblingTop')
                        $(`.coverBox${i} div[id=${siblingLeftTop}]`).addClass('siblingLeftTop')
                        $(`.coverBox${i} div[id=${siblingRightTop}]`).addClass('siblingRightTop')

                    }
                } else {
                    // the div is not in row 0 or 15 (its in a middle row), needs both a TOP and BOTTOM sibling
                    if (colPosition === 0) {
                        // the div is in col 0 (first column), does not need a LEFT sibling
                        // siblings => R, T, B, RT, RB
                        // (rowPosition, colPosition) => (x, 0)

                        // find the index of the L/T siblings
                        const siblingRight = getIndex(rowPosition, colPosition + 1)
                        console.log(siblingRight);
                        const siblingTop = getIndex(rowPosition - 1, colPosition)
                        console.log(siblingTop);
                        const siblingBottom = getIndex(rowPosition + 1, colPosition)
                        console.log(siblingBottom);
                        const siblingRightTop = getIndex(rowPosition - 1, colPosition + 1)
                        console.log(siblingRightTop);
                        const siblingRightBottom = getIndex(rowPosition + 1, colPosition + 1)
                        console.log(siblingRightBottom);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingRight}]`).addClass('siblingRight')
                        $(`.coverBox${i} div[id=${siblingTop}]`).addClass('siblingTop')
                        $(`.coverBox${i} div[id=${siblingBottom}]`).addClass('siblingBottom')
                        $(`.coverBox${i} div[id=${siblingRightTop}]`).addClass('siblingRightTop')
                        $(`.coverBox${i} div[id=${siblingRightBottom}]`).addClass('siblingRightBottom')

                    } else if (colPosition === 15) {
                        // the div is in col 15 (last column), does not need a RIGHT sibling
                        // siblings => L, T, B, LT, LB
                        // (rowPosition, colPosition) => (x, 15)

                        // find the index of the L/T siblings
                        const siblingLeft = getIndex(rowPosition, colPosition - 1)
                        console.log(siblingLeft);
                        const siblingTop = getIndex(rowPosition - 1, colPosition)
                        console.log(siblingTop);
                        const siblingBottom = getIndex(rowPosition + 1, colPosition)
                        console.log(siblingBottom);
                        const siblingLeftTop = getIndex(rowPosition - 1, colPosition - 1)
                        console.log(siblingLeftTop);
                        const siblingLeftBottom = getIndex(rowPosition + 1, colPosition - 1)
                        console.log(siblingLeftBottom);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingLeft}]`).addClass('siblingLeft')
                        $(`.coverBox${i} div[id=${siblingTop}]`).addClass('siblingTop')
                        $(`.coverBox${i} div[id=${siblingBottom}]`).addClass('siblingBottom')
                        $(`.coverBox${i} div[id=${siblingLeftTop}]`).addClass('siblingLeftTop')
                        $(`.coverBox${i} div[id=${siblingLeftBottom}]`).addClass('siblingLeftBottom')

                    } else {
                        // the div is not in col 0 or 15 (its in a middle column), needs both a LEFT and RIGHT sibling
                        // siblings => L, R, T, B, RT, RB, LT, LB
                        // (rowPosition, colPosition) => (x, y)

                        // find the index of the L/T siblings
                        const siblingLeft = getIndex(rowPosition, colPosition - 1)
                        console.log(siblingLeft);
                        const siblingRight = getIndex(rowPosition, colPosition + 1)
                        console.log(siblingRight);
                        const siblingTop = getIndex(rowPosition - 1, colPosition)
                        console.log(siblingTop);
                        const siblingBottom = getIndex(rowPosition + 1, colPosition)
                        console.log(siblingBottom);

                        const siblingLeftTop = getIndex(rowPosition - 1, colPosition - 1)
                        console.log(siblingLeftTop);
                        const siblingLeftBottom = getIndex(rowPosition + 1, colPosition - 1)
                        console.log(siblingLeftBottom);
                        const siblingRightTop = getIndex(rowPosition - 1, colPosition + 1)
                        console.log(siblingRightTop);
                        const siblingRightBottom = getIndex(rowPosition + 1, colPosition + 1)
                        console.log(siblingRightBottom);

                        // using the sibling indices, grab the elements from the DOM and give then rounded borders
                        $(`.coverBox${i} div[id=${siblingLeft}]`).removeClass(function() {
                            let regex = /sibling/
                            let arrayOfClasses = $(this).attr('class')
                            console.log(arrayOfClasses);
                            // let stringToRemove = regex.match(arrayOfClasses)
                            
                        }).addClass('siblingLeft')
                        $(`.coverBox${i} div[id=${siblingRight}]`).addClass('siblingRight')
                        $(`.coverBox${i} div[id=${siblingTop}]`).addClass('siblingTop')
                        $(`.coverBox${i} div[id=${siblingBottom}]`).addClass('siblingBottom')

                        $(`.coverBox${i} div[id=${siblingLeftTop}]`).addClass('siblingLeftTop')
                        $(`.coverBox${i} div[id=${siblingLeftBottom}]`).addClass('siblingLeftBottom')
                        $(`.coverBox${i} div[id=${siblingRightTop}]`).addClass('siblingRightTop')
                        $(`.coverBox${i} div[id=${siblingRightBottom}]`).addClass('siblingRightBottom')
                    }
                }

            })       

        
    })

    
    // click on SUBMIT CARD BUTTON
    // checks to see how many numbers matched, and informs user of the total amount won
    $('.submit').on('click', function() {
        scratchCardApp.prizeAmountWon();
        scratchCardApp.displayPrizeScreen();
        scratchCardApp.submitButtonToggle();
    })

    // click on RESET BUTTON
    // resets the card
    $('main .flexContainer').on('click', '.reset', function() {
        // remove the prize alert
        $('.prizeAlertContainer').remove(); 
        // reset variables
        scratchCardApp.luckyNumbersArray = [];
        scratchCardApp.yourNumbersArray = [];
        scratchCardApp.prizeAmountArray = [];
        scratchCardApp.gamePrizeAmount = 0;
        scratchCardApp.finalGamePrizeAmount;
        // put cover back on scratch boxes
        $('.scratchBoxCover').removeClass('scratched');
        // call the fxn to assign the random numbers to the scratch boxes
        scratchCardApp.assignRandomNumber();
        // make the submit button visible again
        scratchCardApp.submitButtonToggle();
    })
}

// INIT FXN
// contains fxns ready to be initialized at runtime
scratchCardApp.init = function() {
    scratchCardApp.events();
    scratchCardApp.assignRandomNumber();
}

// DOCUMENT READY
$(document).ready(function () {
    scratchCardApp.init();
});

// -----------------------------------
