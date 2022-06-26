const buttons = document.querySelector('#buttonsContainer')
const screenDisplay = document.querySelector('.screenDisplay')
const totalDisplay = document.querySelector('.screenDisplayTotal')

totalValue = "0"
screenValue = ""
operatorMemory = "+"

// Listens to all click events in the buttons <div> and sends the button name to the input bus
buttons.addEventListener('click', function (e) {
    let input = (e.target.textContent)
        inputBus(input)
})

// Checks the input type / value and acts as a signal bus to run the correct fuction
function inputBus (input) {
    if (isNaN(input) === false) { // is a number
        updateScreenNum(input)
    }
    else if (isNaN(input) === true) { // not number
        if (Boolean(String(screenValue).match(/√/g)) ===true && Boolean(input.match(/=/g)) === true) {
            sqrt = squareRoot()
            screenDisplay.textContent = sqrt
        }
        else if (Boolean(input.match(/-|÷|=|x|\+/g)) === true) {
            operatorBus(input)
        }
        else if (input === "." || input ==="√") {
            updateScreenNum(input)
        }
        else if (input === "AC") {
            reset()
        }
        else if (input === "%") {
            updateScreenNum(input)
            percentageConvert()
        }
        else if (input === "▶") { // removes last character from string
            screenValue = screenValue.slice(-0, -1)
            screenDisplay.textContent = screenValue
        }
        else screenDisplay.textContent = "Syntax Error"
    }}

// Programme is sent here if a maths operation needs to be run and this bus will direct the correct function
function operatorBus (input) {
    if (Boolean(input.match(/=/g)) === true) {
        
        let calc = operators[operatorMemory](totalValue, screenValue)
        if (String(calc) == "NaN") {
            screenDisplay.textContent = "Syntax Error"
            }
        screenValue = calc
        screenDisplay.textContent = calc
        totalDisplay.textContent = ""
        totalValue = "0"
        operatorMemory = "+"
        return

}   else {
        let calc = operators[operatorMemory](totalValue, screenValue)
        operatorMemory = input
        updateTotal(calc)
        updateScreenOperator(input)
        return
    }} 

function updateTotal (calc) {
    totalValue = calc
    totalDisplay.textContent = totalValue
    return
}

function updateScreenNum (input) {
    screenValue = screenValue.concat(input)
    screenDisplay.textContent = screenValue
    return
}

function updateScreenOperator (input) {
    operatorMemory = input
    screenDisplay.textContent = operatorMemory
    screenValue = ""
    return
}

// The operator calculation is predefined here. The return is wrapped to allow 
// for floating point calculations and then rewrapped with parseFloat() to drop 
// any trailing zeros.
const operators = {
    '+': function(a , b) {
        return parseFloat((parseFloat(a) + parseFloat(b)).toFixed(3))
    },
    '-': function(a , b) {
        return parseFloat((parseFloat(a) - parseFloat(b)).toFixed(3))
    },
    'x': function(a , b) {
        return parseFloat((parseFloat(a) * parseFloat(b)).toFixed(3))
    },
    '÷': function(a , b) {
        return parseFloat((parseFloat(a) / parseFloat(b)).toFixed(3))
    },
    }

function percentageConvert () {
    screenValue = (operators['x']((parseFloat(screenValue)/100), totalValue))
    console.log(screenValue)
    return
}

function squareRoot() {
    let sqrt = parseFloat(Math.sqrt(screenValue.slice(1)).toFixed(3))
    if (String(sqrt) === "NaN") {
        console.log("syntax error")
        return "Syntax Error"
    }
    else return sqrt
}

function reset() {
    totalValue = "0"
    screenValue = ""
    operatorMemory = "+"
    screenDisplay.textContent = 0
    totalDisplay.textContent = ""
}
