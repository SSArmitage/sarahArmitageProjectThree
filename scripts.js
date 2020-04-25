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
scratchCardApp.buttonDisabled = false

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
            $(`.box${i}`).html(`
                <p class='ranNum'>${randomNumber}</p>
                <canvas width=80 height=80></canvas>
                <div id="spots"></div>
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
            <canvas width=80 height=80></canvas>
             <div id="spots"></div>
        `);
    }  
    scratchCardApp.setUpCanvas()
    // setTimeout(() => {
    //     scratchCardApp.setUpCanvas()
    // }, 400);
}

scratchCardApp.setUpCanvas = function () {
    let canvasNodeList = document.querySelectorAll("canvas")

    canvasNodeList.forEach((canvas) => {
        // console.log(canvas);
        
        // ******** SET UP MOUSE EVENTS *******
        // let cont = document.getElementById("spots") // UI elements
        // let canvas = document.getElementById("canvas")
        // let alpha = document.getElementById("alpha")
        // let modes = document.getElementById("modes")
        let ctx = canvas.getContext("2d")
        let isDown = false // defaults
        let color = "blueviolet";
        const audio = $("#scratchingSound")["0"]
        // console.log(audio);
        

        // set up color palette using a custom "Spot" object
        // This will use a callback function when it is clicked, to
        // change current color
        // function Spot(color, cont, callback) {
        //     var div = document.createElement("div");
        //     div.style.cssText = "width:50px;height:50px;border:1px solid #000;margin:0 1px 1px 0;background:" + color;
        //     div.onclick = function () {
        //         callback(color)
        //     };
        //     cont.appendChild(div);
        // }

        // add some spot colors to our palette container
        // new Spot(color, cont, setColor);

        // this will set current fill style based on spot clicked
        // function setColor(c) {
        //     ctx.fillStyle = c
        // }

        // setup defaults
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;

        // create a rectangle using canvas functions, not CSS
        // background color.
        const createRect = (ctx, width, height) => {
            ctx.fillRect(0, 0, width, height)
        }

        createRect(ctx, 300, 300)

        // events
        canvas.onmousedown = function () {
            isDown = true
            // When the mouse is down, play the audio file to simulate scratching sound
            // the audio file has no sound for the first second or so, start the file 2 seconds in
            audio.currentTime = 2
            // the audio file is a bit fast, slow down the scratching sound a bit
            audio.playbackRate = 0.7
            audio.play()
            // tag the box as scratched
            $(this).addClass('scratched');
        };

        canvas.onmouseup = function () {
            isDown = false
            // When the mouse is back up, stop the audio file 
            audio.pause()
        };
        canvas.onmousemove = function (e) {
            if (!isDown) return;
            var r = canvas.getBoundingClientRect(),
                x = e.clientX - r.left,
                y = e.clientY - r.top;

            // you needed a bit more code here:
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)"

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';

            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.restore();
        };

        // ****** SET UP TOUCH EVENTS (FOR MOBILE/TABLET) *******
        // use the touch events to trigger their mouse event counterparts and do the appropriate conversions(touch position to mouse position, etc)
        canvas.addEventListener("touchstart", function (e) {
            console.log(`touching`);

            // mousePos = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);

        canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);

        canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);

        // Get the position of a touch relative to the canvas
        // function getTouchPos(canvasDom, touchEvent) {
        //     var rect = canvasDom.getBoundingClientRect();
        //     return {
        //         x: touchEvent.touches[0].clientX - rect.left,
        //         y: touchEvent.touches[0].clientY - rect.top
        //     };
        // }

        // Prevent page scrolling when touching the canvas
        document.body.addEventListener("touchstart", function (e) {
            if (e.target == canvas) {
                console.log(`helloooo`);
                
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchend", function (e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchmove", function (e) {
            if (e.target == canvas) {
                e.preventDefault();
            }
        }, false);
    })
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

scratchCardApp.submitButtonToggle = function() {
    $('.submit').toggleClass('hide');
    // $('.buttonContainer').toggleClass('hide');
}

// add the scratch box covers
// for (let x=0; x<300; x++) {
//     $('.scratchBoxCover').append(`
//     <div class="gridDiv" id="${x}"></div>
//     `)
// }

// function that contains all the events to listen for
scratchCardApp.events = function() {
    //event listeners here

    // click on HAMBURGER MENU
    $('.fa-question').on('click', function() {
        $('.hamMenu').toggleClass('openMenu');
    })

    // click on SCRATCH BOX
    // $('.numBox').on('click','.scratchBoxCover', function() {
    //     $(this).addClass('scratched');
    // })

    // $('.gridDiv').on('mouseover', function () {
    //     // console.log(this);
    //     // console.log(event);
        
    //     $(this).addClass('notVisible')
    //     const sibs = $(this).siblings()
    //     // console.log(sibs);
    // })

    // click on SUBMIT CARD BUTTON
    // checks to see how many numbers matched, and informs user of the total amount won
    $('.submit').on('click', function() {
        // first check to see if all the boxes have been scratched
        const canvasArray = Array.from($("canvas"))
        console.log(canvasArray);
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

        // scratchCardApp.prizeAmountWon();
        // scratchCardApp.displayPrizeScreen();
        // scratchCardApp.submitButtonToggle();
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
