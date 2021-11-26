const blue = document.querySelector('.blue')
const yellow = document.querySelector('.yellow')
const green = document.querySelector('.green')
const red = document.querySelector('.red')
const colors = [blue, yellow, green, red]

const scoreh1 = document.querySelector('#score')
const besth2 = document.querySelector('#best')
const reset = document.querySelector('#reset')
console.log(reset)

let order = []
let clickOrder = []
let score = 0
let bestScore = 0

if (localStorage.length == 0) {
    localStorage.getItem('bestScore')
} else {
    bestScore = localStorage.getItem('bestScore')
}
besth2.innerHTML = `Best Score: ${bestScore}`

//Efeito da cor selecionada
let selectedColor = (color, time) => {
    time = time * 500
    setTimeout(() => {
        colors[color].classList.add('selected')
        playAudio(color)
    }, time - 250);
    setTimeout(() => {
        colors[color].classList.remove('selected')
    }, time)
}
//Gera próxima cor aleatoriamente
let nextColor = () => {
    randomColor = Math.floor(Math.random() * 4)
    order[order.length] = randomColor
    for (let i in order) {
        selectedColor(order[i], Number(i) + 1)
    }
}

let saveScore = () => {
    bestScore = score
    localStorage.setItem('bestScore', bestScore)
    besth2.innerHTML = `Best Score: ${bestScore}`
}

let GameOver = () => {
    if (score > bestScore) {
        saveScore()
    }
    score = 0
    scoreh1.innerHTML = `Score: ${score}`
    order = []
    clickOrder = []
    alert(`Você errou, fim de jogo!`)
    playGame()
}

//Checa se a ordem clicada está certa
let checkOrder = () => {
    for (let i = 0; i < clickOrder.length; i++) {
        if (order[i] !== clickOrder[i]){
            GameOver()
            break
        }
        
    }
    //Quando o jogador acerta a ordem
    if (clickOrder.length == order.length) {
        score++
        scoreh1.innerHTML = `Score: ${score}`
        clickOrder = []
        alert('Você acertou!!!\nClique OK para próxima fase!')
        setTimeout(() => {
            nextColor()
        }, 500);
    }
}

let playAudio = (colorNumber) => {
    const audio = document.getElementsByClassName(`audio ${colorNumber}`)[0]
    console.log(audio)
    audio.play()
    audio.currentTime = 0
}

let click = (color) => {
    clickOrder.push(color)
    colors[color].classList.add('selected')
    setTimeout(() => {
    colors[color].classList.remove('selected')
    }, 200);
    playAudio(color)
    checkOrder()
}

let playGame = () => {
    alert('Clique em OK para iniciar um novo jogo')
    nextColor()
}

playGame()

blue.addEventListener('click', function() {click(0)})
yellow.addEventListener('click', function() {click(1)})
green.addEventListener('click', function() {click(2)})
red.addEventListener('click', function() {click(3)})
reset.addEventListener('click', () => {
    localStorage.setItem('bestScore', 0)
    bestScore = 0
    besth2.innerHTML = `Best Score: 0`
})