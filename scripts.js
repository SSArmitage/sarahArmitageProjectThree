// ****** Scratch card game ******

// LUCKY NUMBERS and YOUR NUMBERS get randomly generated & added to the DOM using Math.random (1-20)
// 2 LUCKY NUMBERS, 6 YOUR NUMBERS
// prize amounts get randomly generated and assigned to a YOUR NUMBER box (prize array has 4 values = i.e. $100, $2, $10, $45) -> use Math.random to pick a random # 0-3 and then use that as a index to pick a prize amount from prize array
// set up totalPrizeAmount, initialize to 0
// user clicks LUCKY NUMBER boxes to reveal numbers
// user clicks YOUR NUMBER boxes to reveal numbers
// loop through YOUR NUMBERS and...
// if the  YOUR NUMBERS scratched matches one of the LUCKY NUMBERS, user wins the prize amount associated with that number's box, add to totalPrizeAmount
// after all boxes are revealed  user clicks the "check card" button
// on "click" of the button the user will be informed of the prize amount won
// user can click a button for a new game (resets the scratch card) 


// ***stretch goals*** 
// => coin cursor
// => animating scratch 
// => additional games keeps track of accumulated prize
// => add additional game to card: three boxes where the user scratches and has to find 3 identical symbol
// => when prize amount is displayed to user, have coins fall across screen

// *****extras******
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
    let luckyNumbersArray = [];
    for (let i = 1; i <= 2; i++) {
        let randomNumber = scratchCardApp.generateRandomNumber();
        // checks to see if the generated random number is already in the array (ensures that the LUCKY numbers are always differnt) 
        if (luckyNumbersArray.includes(randomNumber)) {
            // console.log(luckyNumbersArray);
            // console.log(`I am a duplicate: ${randomNumber}`);
            i--; 
        }else {
            luckyNumbersArray.push(randomNumber);
            $(`.box${i}`).html(`
                <p class='ranNum'>${randomNumber}</p>
                <div class="scratchBoxCover"></div>
            `);
        }
    } 
    // assign YOUR NUMBERS
    for (let i = 3; i <=8; i++) {
        let randomNumber = scratchCardApp.generateRandomNumber();
        let randomPrizeIndex = scratchCardApp.generateRandomNumber2();
        // console.log(randomPrizeIndex);
        let randomPrize = scratchCardApp.prizeArray[randomPrizeIndex];
        // console.log(randomPrize);
        $(`.box${i}`).html(`
            <p class='ranNum'>${randomNumber}</p>
            <p class='ranPrize'>${randomPrize}</p>
            <div class="scratchBoxCover"></div>
        `);
    }
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