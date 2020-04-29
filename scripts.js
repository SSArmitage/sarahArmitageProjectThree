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
// => ☑️animating scratch
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
    '$200',
    '$1000'
]

// initializing variables
scratchCardApp.luckyNumbersArray = [];
scratchCardApp.yourNumbersArray = [];
scratchCardApp.prizeAmountArray = [];
scratchCardApp.gamePrizeAmount = 0;
scratchCardApp.finalGamePrizeAmount;
scratchCardApp.buttonDisabled = false;
scratchCardApp.bodyEl = $("body");
scratchCardApp.prizeCounterValue = 0;

// generate random numbers between 1-20 (number on scratch boxes)
scratchCardApp.generateRandomNumber = function() {
    return Math.floor(Math.random() * 20) + 1;
}

// generate random numbers between 0-10 (index for prizeArray)
scratchCardApp.generateRandomNumber2 = function () {
    return Math.floor(Math.random() * 11);
}

// assign random numbers & display in the scratch boxes
scratchCardApp.assignRandomNumber = function() {
    // assign LUCKY NUMBERS (2 numbers)
    for (let i = 1; i <= 2; i++) {
        let randomNumber = scratchCardApp.generateRandomNumber();
        // check to see if the generated random number is already in the array, and if so, decrement i by 1 (ensures that the two LUCKY numbers are always different) 
        if (scratchCardApp.luckyNumbersArray.includes(randomNumber)) {
            i--; 
        }else {
            scratchCardApp.luckyNumbersArray.push(randomNumber);
            $(`.box${i}`).html(`
                <p class='ranNum'>${randomNumber}</p>
                <canvas width=80 height=80></canvas>
                <div id="spots"></div>
            `);
        }
    } 
    
    // assign YOUR NUMBERS (6 numbers)
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
            <canvas width=80 height=80></canvas>
            <div id="spots"></div>
        `);
    } 
    // After the canvas elements are added to the DOM, call the following function to set up event listeners
    scratchCardApp.setUpCanvas()
}

// This function is called after the canvas elements are added to the DOM, sets up the canvas event listeners
scratchCardApp.setUpCanvas = function () {
    const canvasNodeList = document.querySelectorAll("canvas")

    canvasNodeList.forEach((canvas) => {

        // ******** SET UP MOUSE EVENTS *******
        let ctx = canvas.getContext("2d")
        let isDown = false // defaults
        let color = "blueviolet";
        const audio = $("#scratchingSound")["0"]

        // setup defaults
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;

        // create a rectangle using canvas functions, not CSS
        // background color
        const createRect = (ctx, width, height) => {
            ctx.fillRect(0, 0, width, height)
        }

        createRect(ctx, 300, 300)

        // events
        canvas.addEventListener("mousedown", function() {
            isDown = true
            // When the mouse is down, play the audio file to simulate scratching sound
            // the audio file has no sound for the first second or so, start the file >2 seconds in
            audio.currentTime = 3.2
            // the audio file is a bit fast, slow down the scratching sound a bit
            audio.playbackRate = 0.7
            audio.play()
            // tag the box as scratched
            $(this).addClass('scratched');
        })

        canvas.addEventListener("mouseup", function() {
            isDown = false
            // When the mouse is back up, stop the audio file 
            audio.pause()
        })

        canvas.addEventListener("mousemove", function() {
            if (!isDown) return;
            var r = canvas.getBoundingClientRect(),
                x = event.clientX - r.left,
                y = event.clientY - r.top;

            ctx.fillStyle = "rgba(255, 255, 255, 0.5)"

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.restore();
        })

        // ****** SET UP TOUCH EVENTS (FOR MOBILE/TABLET) *******
        // use the touch events to trigger their mouse event counterparts and do the appropriate conversions (touch position to mouse position, etc)
        // using event dispatching
        canvas.addEventListener("touchstart", function (event) {

            let touch = event.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);

             // when you initially touch the canvas, the body will have overflow:hidden added to prevent scrolling
            scratchCardApp.bodyEl.addClass("stopScroll")
        }, false);

        canvas.addEventListener("touchend", function () {
            let mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);

            // when you stop touching the canvas, the body will have overflow:hidden removed
            scratchCardApp.bodyEl.removeClass("stopScroll")
        }, false);

        canvas.addEventListener("touchmove", function (event) {
            let touch = event.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            scratchCardApp.bodyEl.addClass("stopScroll")
        }, false);

        // Prevent page scrolling when touching the canvas
        // document.body.addEventListener("touchstart", function (event) {
        //     if (event.target == canvas) {
        //         scratchCardApp.bodyEl.addClass("stopScroll")
        //     }
        // }, false);

        // document.body.addEventListener("touchend", function (event) {
        //     if (event.target == canvas) {
        //         scratchCardApp.bodyEl.removeClass("stopScroll")
        //         event.preventDefault();
        //     }
        // }, false);

        // document.body.addEventListener("touchmove", function (event) {
        //     if (event.target == canvas) {
        //         scratchCardApp.bodyEl.addClass("stopScroll")
        //     }
        // }, false);
    })
}

// this function is called when the "submit card" button is clicked
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
        console.log(scratchCardApp.gamePrizeAmount);
    }

    // convert prizeAmount back to a string and add "$" to the front
    scratchCardApp.finalGamePrizeAmount = `$${scratchCardApp.gamePrizeAmount.toString()}`;

    // Update the prize counter to get the total prize amount won
    scratchCardApp.prizeCounterValue += scratchCardApp.gamePrizeAmount
    // update the counter on the page
    scratchCardApp.updatePrizeCounter(scratchCardApp.prizeCounterValue);
    // if the current prize won is $1000, gold coins fall from top of screen with "ta da" sound
    if (scratchCardApp.gamePrizeAmount >= 1000) {
        scratchCardApp.prizeCelebration()
    }
}

// Generate random number within a range
scratchCardApp.randomRange = function(minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// 
scratchCardApp.prizeCelebration = function() {

    const audioCoins = $("#fallingCoinsSound")["0"]
    const audioWinner = $("#winnerSound")["0"]
    audioWinner.play()
    
    // the audio file is a bit slow, speed up the scratching sound x2
    audioCoins.playbackRate = 2.0

    // wait 1s before starting the falling coins sound (gives the coins ~time to reach the bottom of the screen)
    setTimeout(() => {
        audioCoins.play()
    }, 1000);

    // end the falling coins sound to coincide with the end of the falling coins animation
    setTimeout(() => {
        audioCoins.pause()
        audioWinner.pause()
    }, 4260);

    // the number of falling coins for the animation
    const numOfDrops = 158;
    // const viewportHeight =  window.innerHeight
    // console.log(viewportHeight);
    
    // assign each of the falling coins a random starting position, and append them to the page (they will be placed above the viewport and will fall to the bottom/100vh)
    // done twice to make the falling coins look more seamless, overlap the two animations (to get rid of gaps in the downward flow of coins when the animation starts/stops)
    for (i = 1; i < numOfDrops; i++) {
        // get a random number for the left position
        const dropLeft = scratchCardApp.randomRange(0, 499);
        // get a random number for the top position
        // the min is -100 becasue the coins need to be placed sufficiently high enough above the top of the view port, so that they are not visible before/after the animation
        const dropTop = scratchCardApp.randomRange(-1000, -100)

        $('.rain').append(`<div class="drop" id="drop${i}"></div>`);
        $(`#drop${i}`).css('left', dropLeft);
        $(`#drop${i}`).css('top', dropTop);
    }

    for (i = 1; i < numOfDrops; i++) {
        const dropLeft = scratchCardApp.randomRange(0, 499);
        const dropTop = scratchCardApp.randomRange(-1000, -100)

        $('.rainB').append(`<div class="dropB" id="dropB${i}"></div>`);
        $(`#dropB${i}`).css('left', dropLeft);
        $(`#dropB${i}`).css('top', dropTop);
    }
}

// this function is called when the "submit card" button is clicked
// display prize screen to alert user of the amount won during this game
scratchCardApp.displayPrizeScreen = function() {
    // winner card
    if (scratchCardApp.finalGamePrizeAmount !== '$0') {
        $('main .gameContainer').append(`
        <div class="prizeAlertContainer">
            <div class="prizeAlert" id="starBurst">
                <p>Winner!</p>
                <p>${scratchCardApp.finalGamePrizeAmount}</p>
                <button class="reset outline">New Card</button>
            </div>
        </div>    
        `); 
    // non-winner card
    } else {
        $('main .gameContainer').append(`
        <div class="prizeAlertContainer">
            <div class="prizeAlert" id="starBurst">
                <p>Non-winner</p>
                <div class="buttonContainer">
                    <button class="reset outline">New Card</button>
                </div>
            </div>
        </div>    
        `); 
    }
}

// this function is called when the "submit card" button is clicked, it will hide the button using visibility: hidden
// *** still need to remove the css shine with the button ***
scratchCardApp.submitButtonToggle = function() {
    $('.submit').toggleClass('hide outline');
}

// this function is called when the "submit card" button is clicked, it will update the prizeCounter
// Note: on refresh, the counter will reset back to zero
scratchCardApp.updatePrizeCounter = function(totalPrizeAmount) {    
    $('.prizeCounter').text(`Total: $${totalPrizeAmount}`)
}

// function that contains all the events to listen for
scratchCardApp.events = function() {
    //event listeners here

    // click on HAMBURGER MENU
    $('.fa-question').on('click', function() {
        $('.hamMenu').toggleClass('openMenu');
    })

    // click on SUBMIT CARD BUTTON
    // checks to see how many numbers matched, and informs user of the total amount won
    $('.submit').on('click', function() {
        // first check to see if all the boxes have been scratched
        const canvasArray = Array.from($("canvas"))
        let counter = 0;
        canvasArray.some((canvas) => {
            if (canvas.classList.length === 0) {
                // if the canvas element has an empty class list, that means that the class="scratched" was not added, and therefore, the box was not scratched
                // alert the user that they must scratch all of the boxes
                alert("You must scratch all the boxes before submitting the card!")
            } else {
                // if the canvas element does not have an empty class list, that means that the class="scratched" was added, and therefore, the box was scratched
                // increment the counter
                counter++
                if (counter === 8) {
                    // if the counter reaches a value of 8 that means that all the boxes were scratched, and the card can be submitted
                    // call the following functions
                    scratchCardApp.prizeAmountWon();
                    scratchCardApp.displayPrizeScreen();
                    scratchCardApp.submitButtonToggle();
                }
            }
            // if the canvas element has an empty class list, exit the function (b/c at least one box has not been scratched, and the card cannot be submitted)
            return canvas.classList.length === 0
        })
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
        // make the submit button visible again & add the css shine back to the submit button
        scratchCardApp.submitButtonToggle();
        // if the prizeCelebration fxn was called (prize >= 100), then remove the appended coin rain droplets from the rain divs (resets it for the next win >= 100)
        $('.rain').empty()
        $('.rainB').empty()
        // if user clicks "new card" before the falling coins have finished, need to remove the sound as well
        const audioCoins = $("#fallingCoinsSound")["0"]
        audioCoins.pause()
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