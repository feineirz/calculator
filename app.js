const oprBuffer = document.querySelector('.operator-buffer')
const valueBuffer = document.querySelector('.value-buffer')
const valueUnit = document.querySelector('.value-unit')
const memoryState = document.querySelector('.value-memory')
const display = document.querySelector('.display')

const btnAc = document.querySelector('#btn_ac')
const btnC = document.querySelector('#btn_c')
const btnM = document.querySelector('#btn_m')
const btnMr = document.querySelector('#btn_mr')

const btnConst_Pi = document.querySelector('#btn_const-pi')
const btnConst_C = document.querySelector('#btn_const-c')
const btnConst_g = document.querySelector('#btn_const-g')
const btnConst_h = document.querySelector('#btn_const-h')

const btnEx2 = document.querySelector('#btn_ex2')
const btnEx3 = document.querySelector('#btn_ex3')
const btnFact = document.querySelector('#btn_fact')
const btnSqrt = document.querySelector('#btn_sqrt')

const numberButtons = document.querySelectorAll('.number-button')
const calcButtons = document.querySelectorAll('.calc-button')

const btnDot = document.querySelector('#btn_dot')
const btnAns = document.querySelector('#btn_eq')

const convertButtons = document.querySelectorAll('.convert-button')
const btnDecToBin = document.querySelector('#btn_dec-bin')
const btnDecToOct = document.querySelector('#btn_dec-oct')
const btnDecToHex = document.querySelector('#btn_dec-hex')
const btnBinToDec = document.querySelector('#btn_bin-dec')

const btnCToF = document.querySelector('#btn_c-f')
const btnFToC = document.querySelector('#btn_f-c')
const btnCToK = document.querySelector('#btn_c-k')
const btnKToC = document.querySelector('#btn_k-c')

const btnCmToM = document.querySelector('#btn_cm-m')
const btnMToKm = document.querySelector('#btn_m-km')
const btnKmToM = document.querySelector('#btn_km-m')
const btnMToCm = document.querySelector('#btn_m-cm')

const btnKmToAu = document.querySelector('#btn_km-au')
const btnAuToLy = document.querySelector('#btn_au-ly')
const btnLyToAu = document.querySelector('#btn_ly-au')
const btnAuToKm = document.querySelector('#btn_au-km')

const btnCmToIn = document.querySelector('#btn_cm-in')
const btnInToCm = document.querySelector('#btn_in-cm')
const btnKmToMi = document.querySelector('#btn_km-mi')
const btnMiToKm = document.querySelector('#btn_mi-km')

let memoryBuffer = 0

// Calculation Logics
const numberButtonClickHandler = e => {
    if (display.innerText === '0' || oprBuffer.innerText === 'ANS') {
        display.innerText = e.target.innerText
        if (oprBuffer.innerText === 'ANS') {
            oprBuffer.innerText = 'None'
            valueUnit.innerText = ''
        }
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
        if (valueUnit.innerText === 'm/s') valueUnit.innerText = 'm'
        display.innerText = bufferValue * displayValue
    } else if (opr === '/') {
        valueUnit.innerText = ''
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
    // Use CSS overflow instead.
    // if (display.innerText.length > maxDisplay) display.innerText = 'OVERFLOW'
}

display.addEventListener('change', () => console.log('Changed'))

btnAc.addEventListener('click', e => {
    oprBuffer.innerText = 'None'
    valueUnit.innerText = ''
    valueBuffer.innerText = 0
    display.innerText = 0
})

btnC.addEventListener('click', e => {
    display.innerText = 0
})

btnM.addEventListener('click', () => {
    memoryBuffer = display.innerText
    if (memoryBuffer != 0) memoryState.style.display = 'block'
    else memoryState.style.display = 'none'
})

btnMr.addEventListener('click', () => {
    display.innerText = memoryBuffer
})

btnEx2.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = val * val
    trimDisplay()
    valueUnit.innerText = ''
})

btnEx3.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = val * val * val
    trimDisplay()
    valueUnit.innerText = ''
})

btnSqrt.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = Math.sqrt(val)
    trimDisplay()
    valueUnit.innerText = ''
})

const factorial = v => {
    if (v <= 0) return 1
    else return v * factorial(v - 1)
}

btnFact.addEventListener('click', e => {
    const val = display.innerText - 0
    display.innerText = factorial(val)
    trimDisplay()
    valueUnit.innerText = ''
})

// Constant
btnConst_Pi.addEventListener('click', () => {
    display.innerText = '3.14159265358979324'
    valueUnit.innerText = ''
})

btnConst_C.addEventListener('click', () => {
    display.innerText = '299792458'
    valueUnit.innerText = 'm/s'
})

btnConst_g.addEventListener('click', () => {
    display.innerText = '9.82'
    valueUnit.innerText = 'm/s^2'
})

btnConst_h.addEventListener('click', () => {
    display.innerText = '6.62607015E-34'
    valueUnit.innerText = 'Js'
})

// Etc

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
const factorKmAu = 6.6845871226706e-9
const factorAuLy = 1.5812507408871e-5

const formulaCF = c => (c * 9) / 5 + 32
const formulaFC = f => ((f - 32) * 5) / 9
const formulaCK = c => c + 273.15
const formulaKC = k => k - 273.15

btnDecToBin.addEventListener('click', () => {
    display.innerText = (display.innerText - 0).toString(2)
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'BIN'
    trimDisplay()
})

btnDecToOct.addEventListener('click', () => {
    display.innerText = (display.innerText - 0).toString(8)
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'OCT'
    trimDisplay()
})

btnDecToHex.addEventListener('click', () => {
    display.innerText = (display.innerText - 0).toString(16).toUpperCase()
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'HEX'
    trimDisplay()
})

btnBinToDec.addEventListener('click', () => {
    display.innerText = parseInt(display.innerText, 2)
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = ''
    trimDisplay()
})

// Temperature

btnCToF.addEventListener('click', () => {
    display.innerText = formulaCF(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = '°F'
    trimDisplay()
})

btnFToC.addEventListener('click', () => {
    display.innerText = formulaFC(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = '°C'
    trimDisplay()
})

btnCToK.addEventListener('click', () => {
    display.innerText = formulaCK(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = '°K'
    trimDisplay()
})

btnKToC.addEventListener('click', () => {
    display.innerText = formulaKC(display.innerText - 0)
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = '°C'
    trimDisplay()
})

// Distance

btnCmToM.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / 100
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'm'
    trimDisplay()
})

btnMToKm.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / 1000
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'Km'
    trimDisplay()
})

btnKmToAu.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * factorKmAu
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'AU'
    trimDisplay()
})

btnAuToLy.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * factorAuLy
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'LY'
    trimDisplay()
})

btnLyToAu.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / factorAuLy
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'AU'
    trimDisplay()
})

btnAuToKm.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / factorKmAu
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'Km'
    trimDisplay()
})

btnKmToM.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * 1000
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'm'
    trimDisplay()
})

btnMToCm.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * 100
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'Cm'
    trimDisplay()
})

btnCmToIn.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * factorCmIn
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'In'
    trimDisplay()
})

btnInToCm.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / factorCmIn
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'Cm'
    trimDisplay()
})

btnKmToMi.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) * factorKmMi
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'Mi'
    trimDisplay()
})

btnMiToKm.addEventListener('click', () => {
    display.innerText = (display.innerText - 0) / factorKmMi
    oprBuffer.innerText = 'ANS'
    valueUnit.innerText = 'Km'
    trimDisplay()
})
