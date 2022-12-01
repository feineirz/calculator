const oprBuffer = document.querySelector('.operator-buffer')
const valueBuffer = document.querySelector('.value-buffer')
const display = document.querySelector('.display')

const btnAc = document.querySelector('#btn_ac')
const btnC = document.querySelector('#btn_c')
const btnM = document.querySelector('#btn_m')
const btnMr = document.querySelector('#btn_mr')
const btnEx2 = document.querySelector('#btn_ex2')
const btnEx3 = document.querySelector('#btn_ex3')
const btnFact = document.querySelector('#btn_fact')
const btnSqrt = document.querySelector('#btn_sqrt')

const numberButtons = document.querySelectorAll('.number-button')
const calcButtons = document.querySelectorAll('.calc-button')

const btnDot = document.querySelector('#btn_dot')
const btnAns = document.querySelector('#btn_eq')

const convertButtons = document.querySelectorAll('.convert-button')
const btnCmToIn = document.querySelector('#btn_cm-in')
const btnInToCm = document.querySelector('#btn_in-cm')
const btnKmToMi = document.querySelector('#btn_km-mi')
const btnMiToKm = document.querySelector('#btn_mi-km')

const btnCToF = document.querySelector('#btn_c-f')
const btnFToC = document.querySelector('#btn_f-c')
const btnCToK = document.querySelector('#btn_c-k')
const btnKToC = document.querySelector('#btn_k-c')

const btnDecToBin = document.querySelector('#btn_dec-bin')
const btnDecToOct = document.querySelector('#btn_dec-oct')
const btnDecToHex = document.querySelector('#btn_dec-hex')
const btnBinToDec = document.querySelector('#btn_bin-dec')

// Calculation Logics
const numberButtonClickHandler = e => {
    if (display.innerText === '0' || oprBuffer.innerText === 'ANS') {
        display.innerText = e.target.innerText
        oprBuffer.innerText = oprBuffer.innerText === 'ANS' ? 'None' : oprBuffer.innerText
    } else {
        display.innerText = display.innerText + e.target.innerText
    }
}

const calcButtonClickHandler = e => {
    calculate()

    oprBuffer.innerText = e.target.innerText
    valueBuffer.innerText = display.innerText
    display.innerText = 0
}

for (let btn of numberButtons) {
    btn.addEventListener('click', numberButtonClickHandler)
}

for (let btn of calcButtons) {
    btn.addEventListener('click', calcButtonClickHandler)
}

const calculate = () => {
    const opr = oprBuffer.innerText
    const bufferValue = valueBuffer.innerText - 0
    const displayValue = display.innerText - 0

    if (opr === '+') {
        display.innerText = bufferValue + displayValue
    } else if (opr === '-') {
        display.innerText = bufferValue - displayValue
    } else if (opr === '*') {
        display.innerText = bufferValue * displayValue
    } else if (opr === '/') {
        display.innerText = bufferValue / displayValue
    }

    trimDisplay()
    oprBuffer.innerText = 'ANS'
    valueBuffer.innerText = 0
}

// Converter Logics

const maxDisplay = 20
const trimDisplay = () => {
    const content = display.innerText
    const valueParts = content.split('.')

    if (valueParts[1]) {
        if (!valueParts[1].includes('e'))
            display.innerText = valueParts[0] + '.' + valueParts[1].slice(0, maxDisplay - valueParts[0].length - 1)
    }
    // Todo: Handler +E and overflow max display
    if (display.innerText.length > maxDisplay) display.innerText = 'OVERFLOW'
}

display.addEventListener('change', () => console.log('Changed'))

btnAc.addEventListener('click', e => {
    oprBuffer.innerText = 'None'
    valueBuffer.innerText = 0
    display.innerText = 0
})

btnC.addEventListener('click', e => {
    display.innerText = 0
})

btnEx2.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = val * val
    trimDisplay()
    oprBuffer.innerText = 'ANS'
})

btnEx3.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = val * val * val
    trimDisplay()
    oprBuffer.innerText = 'ANS'
})

const factorial = v => {
    if (v <= 0) return 1
    else return v * factorial(v - 1)
}

btnFact.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = factorial(val)
    trimDisplay()
    oprBuffer.innerText = 'ANS'
})

btnSqrt.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = Math.sqrt(val)
    trimDisplay()
    oprBuffer.innerText = 'ANS'
})

btnDot.addEventListener('click', () => {
    console.log(display.innerText.includes('.'))
    if (!display.innerText.includes('.')) {
        display.innerText += '.'
    }
})

btnAns.addEventListener('click', calculate)

// Convertor
const factorCmIn = 0.393700787
const factorKmMi = 0.621371192
const formulaCF = c => (c * 9) / 5 + 32
const formulaFC = f => ((f - 32) * 5) / 9
const formulaCK = c => c + 273.15
const formulaKC = k => k - 273.15

btnCmToIn.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * factorCmIn
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnInToCm.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / factorCmIn
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnKmToMi.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * factorKmMi
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnMiToKm.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / factorKmMi
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnCToF.addEventListener('click', () => {
    display.innerText = formulaCF(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnFToC.addEventListener('click', () => {
    display.innerText = formulaFC(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnCToK.addEventListener('click', () => {
    display.innerText = formulaCK(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnKToC.addEventListener('click', () => {
    display.innerText = formulaKC(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnDecToBin.addEventListener('click', () => {
    display.innerText = (display.innerText - 0).toString(2)
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnDecToOct.addEventListener('click', () => {
    display.innerText = (display.innerText - 0).toString(8)
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnDecToHex.addEventListener('click', () => {
    display.innerText = (display.innerText - 0).toString(16).toUpperCase()
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})

btnBinToDec.addEventListener('click', () => {
    display.innerText = parseInt(display.innerText, 2)
    oprBuffer.innerText = 'ANS'
    trimDisplay()
})
