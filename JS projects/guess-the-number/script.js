const input = document.querySelector(".informed-number")
let numero = Math.floor(Math.random() * 100)
let nTentativas = 10
const resultArea = document.querySelector(".result-area")
const numberArea = document.querySelector(".number")
const playAgainBtn = document.querySelector(".play-again-btn")
const attemptsAmount = document.querySelector(".attempts-amount")

input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) { 

        if (nTentativas > 0) {
            nTentativas = nTentativas - 1
            attemptsAmount.innerHTML = `Você tem ${nTentativas} tentativas`
            playing()

    
        }
       else {
            numberArea.innerHTML = numero
            resultArea.innerHTML = `O número era ${numero}!`
            attemptsAmount.innerHTML = "Suas tentativas acabaram! Tente novamente!"
            playAgainBtn.style.display = "flex"
        }    
        
    }
})
       
function playAgain() {
    numero = Math.floor(Math.random() * 100)
    nTentativas = 10
    resultArea.innerHTML = "Digite um número abaixo!"
    resultArea.style.color = ""
    numberArea.innerHTML = "?"
    playAgainBtn.style.display = "none"
    input.value = ""
    attemptsAmount.innerHTML = ""
}

function playing() {
    if (input.value > 100) {
        resultArea.innerHTML = `O número não pode ser maior que 100`
    }
    else if (input.value > numero) {
        resultArea.innerHTML = (`ERROU! Tente um número menor que ${input.value}`)
        resultArea.style.color = "red"
       }

    if (input.value == numero) {
        resultArea.innerHTML = (`ACERTOU! O número é ${numero}`)
        resultArea.style.color = "chartreuse"
        numberArea.innerHTML = `${numero}`
        playAgainBtn.style.display = "flex"
        attemptsAmount.innerHTML = ""
        nTentativas = 10
    
    }

    if (input.value < numero) {
        resultArea.innerHTML = (`ERROU! Tente um número maior que ${input.value}`)
        resultArea.style.color = "red"
       } 
}



