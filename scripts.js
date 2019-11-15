// ****** Scratch card game ******

// ☑️LUCKY NUMBERS and YOUR NUMBERS get randomly generated & added to the DOM using Math.random (1-20)
// 2 LUCKY NUMBERS, 6 YOUR NUMBERS
// ☑️prize amounts get randomly generated and assigned to a YOUR NUMBER box (prize array has 4 values = i.e. $100, $2, $10, $45) -> use Math.random to pick a random # 0-3 and then use that as a index to pick a prize amount from prize array
// set up totalPrizeAmount, initialize to 0
// ☑️user clicks LUCKY NUMBER boxes to reveal numbers
// ☑️user clicks YOUR NUMBER boxes to reveal numbers
// loop through YOUR NUMBERS and...
// if the  YOUR NUMBERS scratched matches one of the LUCKY NUMBERS, user wins the prize amount associated with that number's box, add to totalPrizeAmount
// after all boxes are revealed  user clicks the "check card" button
// on "click" of the button the user will be informed of the prize amount won
// ☑️user can click a button for a new game (resets the scratch card)


// ***stretch goals*** 
// => coin cursor
// => animating scratch 
// => additional games keeps track of accumulated prize
// => add additional game to card: three boxes where the user scratches and has to find 3 identical symbol
// => when prize amount is displayed to user, have coins fall across screen

// *****to-do******
// => cache selectors
// => favicon
// => accessible


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

// hamburger menu (contains game instructions)
scratchCardApp.displayHamburger = function() {
    $('header .flexContainer').append(`
        <i class="fa fa-bars"></i>
    `)
    $('main').append(`
        <div class=hamMenu>
            <h2>How to Play</h2>
        </div>
    `);
}

// cover scratch squares


// generate random numbers between 1-20 (number on scratch boxes)
scratchCardApp.generateRandomNumber = function() {
    return Math.floor(Math.random() * 20) + 1;
}

// generate random numbers between 1-8 (index for prizeArray)
scratchCardApp.generateRandomNumber2 = function () {
    return Math.floor(Math.random() * 8) + 1;
}

// assign random numbers/display in the scratch boxes
// need to make it so that LUCKY NUMBERS c/n be the same
scratchCardApp.assignRandomNumber = function() {
    // assign LUCKY NUMBERS
    // let luckyNumbersArray = [];
    for (let i = 1; i <= 2; i++) {
        let randomNumber = scratchCardApp.generateRandomNumber();
        // checks to see if the generated random number is already in the array (ensures that the LUCKY numbers are always differnt) 
        if (scratchCardApp.luckyNumbersArray.includes(randomNumber)) {
            // console.log(luckyNumbersArray);
            // console.log(`I am a duplicate: ${randomNumber}`);
            i--; 
        }else {
            scratchCardApp.luckyNumbersArray.push(randomNumber);
            $(`.box${i}`).html(`
                <p class='ranNum'>${randomNumber}</p>
                <div class="scratchBoxCover"></div>
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
        $(`.box${i}`).html(`
            <p class='ranNum'>${randomNumber}</p>
            <p class='ranPrize'>${randomPrize}</p>
            <div class="scratchBoxCover"></div>
        `);
    }    
}

// determining the prizeAmountWon for this game
scratchCardApp.prizeAmountWon = function () {
   
    // map over the prizeAmountArray (all the randomly chosen prize amounts for this instance of the game) => remove the $ from the prize amounts, convernt the string into a number, and then return in a new array newPrizeArray
    // doing this b/c need to add the prize amounts together (need to be numbers to do this)
    let numberPrizeArray = scratchCardApp.prizeAmountArray.map(function(item) {
        return parseInt(item.slice(1));
        
    })
    console.log(numberPrizeArray);
    
    // check to see if any of the YOUR NUMBERS matches with either of the LUCKY NUMBERS 
    // loop through the items in yourNumbersArray (the 6 randomly chosen numbers displayed in YOUR NUMBERS scratch boxes)
    for (let i = 0; i < 6; i++) {
        // if the number at the ith position of yourNumbersArray is equal to the first LUCKY NUMBER or if it is equal to the second LUCKY NUMBER
        if (scratchCardApp.yourNumbersArray[i] === scratchCardApp.luckyNumbersArray[0] ||              scratchCardApp.yourNumbersArray[i] === scratchCardApp.luckyNumbersArray[1]) {
            
            // prizeAmount started at 0, add the matching numbers' prize value to the prizeAmount variable (able to do this b/c the yourNumbersArray[i] and numberPrizeArray[i] correspond to the same ith scratch box)
            scratchCardApp.gamePrizeAmount += numberPrizeArray[i];
            console.log(numberPrizeArray[i]);
            console.log(scratchCardApp.gamePrizeAmount); 

            // NEED TO SET gamePrizeAmount BACK TO 0 ON RESET
        }
    }
    // convert prizeAmount back to a string and add "$" to the front
    let gamePrizeAmount = `$${scratchCardApp.gamePrizeAmount.toString()}`;
    console.log(gamePrizeAmount);
}

// contains all the events to listen for
scratchCardApp.events = function() {
    //event listeners here

    // click on HAMBURGER MENU
    $('.flexContainer').on('click', 'i', function() {
        console.log("I clicked the hamburger");
        $('.hamMenu').toggleClass('openMenu')
    });

    // click on SCRATCH BOX
    $('.numBox').on('click','.scratchBoxCover', function() {
        console.log(`Scratching...`);
        $(this).addClass('scratched');
    })

    // click on SUBMIT CARD BUTTON
    // checks to see how many numbers matched, and informs user of the total amount won
    $('.submit').on('click', function() {
        scratchCardApp.prizeAmountWon();
        // $('.scratchBoxCover').removeClass('scratched');
        // scratchCardApp.assignRandomNumber();
    })

    // click on RESET BUTTON
    // resets the card

}

// INIT FXN
// contains fxns ready to be initialized at runtime
scratchCardApp.init = function() {
    scratchCardApp.events();
    scratchCardApp.displayHamburger();
    scratchCardApp.assignRandomNumber();
    console.log("document is initalized");
}

// DOCUMENT READY
$(document).ready(function () {
    scratchCardApp.init();
    console.log("document is ready!");
});