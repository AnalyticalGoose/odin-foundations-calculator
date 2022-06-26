const buttons = document.querySelector('#buttonsContainer')
const screenDisplay = document.querySelector('.screenDisplay')
const totalDisplay = document.querySelector('.screenDisplayTotal')

totalValue = "0"
screenValue = ""
operatorMemory = "+"

buttons.addEventListener('click', function (e) {
    let input = (e.target.textContent)
        inputBus(input)
})

function inputBus (input) {
    if (isNaN(input) === false) { // is a number
        updateScreenNum(input)
    }
    else if (isNaN(input) === true) { // not number
        if (Boolean(input.match(/-|÷|=|x|\+/g)) === true) {
            operatorBus(input)
    }}}

function operatorBus (input) {
    if (Boolean(input.match(/=/g)) === true) {
        let calc = operators[operatorMemory](totalValue, screenValue)
        screenDisplay.textContent = calc
        totalDisplay.textContent = ""
        totalValue = "0"
        screenValue = ""
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

const operators = {
    '+': function(a , b) {
        return parseInt(a) + parseInt(b)
    },
    '-': function(a , b) {
        return parseInt(a) - parseInt(b)
    },
    'x': function(a , b) {
        return parseInt(a) * parseInt(b)
    },
    '÷': function(a , b) {
        return parseInt(a) / parseInt(b)
    },}
