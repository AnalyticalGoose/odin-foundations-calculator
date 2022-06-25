const buttons = document.querySelector('#buttonsContainer')
const screenDisplay = document.querySelector('.screenDisplay')
const totalDisplay = document.querySelector('.screenDisplayTotal')


screenValue = ""
totalValue = ""
intMemory = ""
operatorMemory = ""

buttons.addEventListener('click', function (e) {
    let input = (e.target.textContent)
    // console.log(input)
        inputBus(input)
})
function inputBus (input) {
    if (isNaN(input) === false) { // is a number
        updateScreen(input)
    }
    else if (isNaN(input) === true) { // not number
        if (Boolean(input.match(/-|÷|x|\+/g)) === true) {
            operatorBus(input)
        }
    }
}


function operatorBus (input) {
    if (intMemory !== "" && operatorMemory !== "" && screenValue !== "") {
        operatorCalc(input)
    }
    operatorMemory = operatorMemory.concat(input)
    intMemory = screenValue.concat(input)
    screenValue = ""
    screenDisplay.textContent = operatorMemory
}

function updateScreen(input) {
    screenValue = screenValue.concat(input)
    screenDisplay.textContent = screenValue
    return
}

function updateTotal(calc) {
    totalValue = totalValue.concat(calc)
    totalDisplay.textContent = totalValue
    return
}

function operatorCalc(input) {
    if (operatorMemory === '+') {
        let calc = parseInt(intMemory) + parseInt(screenValue)
        screenValue= ""
        operatorMemory = ""
        updateTotal(calc)
    }
}