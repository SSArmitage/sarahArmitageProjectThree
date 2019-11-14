// ****** Scratch card game ******

// LUCKY NUMBERS and YOUR NUMBERS get randomly generated & added to the DOM using Math.random (1-10)
// 2 LUCKY NUMBERS, 8 YOUR NUMBERS
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

// main section that contains all the scratch game boxes
scratchCardApp.displayMain = function() {
    $('main .wrapper').html(`
        <div class="luckyNumbersContainer">
            <div class="numBox"></div>
            <div class="numBox"></div>
        </div>

        <div class="yourNumbersContainer">
            <div class="numBox"></div>
            <div class="numBox"></div>
            <div class="numBox"></div>
            <div class="numBox"></div>
            <div class="numBox"></div>
            <div class="numBox"></div>
        </div>
    `);
}

// contains all the events to listen for ("make Dom aware")
scratchCardApp.events = function() {
    //event listeners here
    $('.flexContainer').on('click', 'i', function() {
        console.log("I clicked the hamburger");
        $('.hamMenu').toggleClass('openMenu')
    });
}

// INIT FXN
// contains fxns ready to be initialized at runtime
scratchCardApp.init = function() {
    scratchCardApp.events();
    scratchCardApp.displayHamburger();
    scratchCardApp.displayMain();
    console.log("document is initalized");
}

// DOCUMENT READY
$(document).ready(function () {
    scratchCardApp.init();
    console.log("document is ready!");
});