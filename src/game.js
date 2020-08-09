import {Snake} from './models/snake'
import {Apple} from './models/apple'


const btns = document.getElementsByClassName('btn-size')
const gameOptions = document.querySelector('.game-options')
const gameArea = document.querySelector('.game-area')
let cellCount = 0 // TOTAL NUMBER OF CELLS
let sideCellCount = 0


function createArea (sideCellCount){
    gameArea.style.display = 'block'
    cellCount = sideCellCount*sideCellCount
    for (let i = 0; i < cellCount; i++) {
        /* CREATING CELLS AND ADDING IT INTO THE AREA*/
        let areaCell = document.createElement('div')
        areaCell.classList.add('area-cell')
        areaCell.x = `${i%sideCellCount}`
        areaCell.y = `${Math.floor(i/sideCellCount)}`
        areaCell.id = `${areaCell.x}x${areaCell.y}`
        areaCell.isFree = true
        areaCell.style.width = `${parseInt(getComputedStyle(gameArea).width) / sideCellCount}px`
        areaCell.style.height = `${parseInt(getComputedStyle(gameArea).height) / sideCellCount}px`
        gameArea.appendChild(areaCell)
    }
    return true
}

/* SELECTING AREA SIZE */
for (let btn of btns){
    btn.addEventListener('click', () => {
        sideCellCount = btn.value // NUMBER OF CELLS IN A ROW AND IN A COLUMN
        gameOptions.style.display = 'none'
        let creatingArea = new Promise((resolve) => {
                resolve(createArea(sideCellCount))
            }
        )
        /* START THE GAME AFTER CREATING THE AREA*/
        creatingArea.then((areaCreated)=> areaCreated? startGame() : alert('Something is broken'))
    })
}


function gameMove(nextMove, snake, apple){
    /* SNAKE MOVE LEFT */
    if (nextMove === 'ArrowLeft') {
        if (snake.body[0][0] === 0){
            return true
        }
        else if (apple.x === snake.body[0][0] - 1 && apple.y === snake.body[0][1]) {
            snake.eat(snake.body[0][0] - 1, snake.body[0][1])
            apple.create(sideCellCount)
            return false
        }
        else {
            snake.move(snake.body[0][0] - 1, snake.body[0][1])
            return false
        }
    }
    /* SNAKE MOVE RIGHT */
    else if (nextMove === 'ArrowRight') {
        if (snake.body[0][0] === sideCellCount - 1){
            return true
        }
        else if (apple.x === snake.body[0][0] + 1 && apple.y === snake.body[0][1]) {
            snake.eat(snake.body[0][0] + 1, snake.body[0][1])
            apple.create(sideCellCount)
            return false
        }
        else {
            snake.move(snake.body[0][0] + 1, snake.body[0][1])
            return false
        }
    }
    /* SNAKE MOVE UP */
    else if (nextMove === 'ArrowUp') {
        if (snake.body[0][1] === 0){
            return true
        }
        else if (apple.x === snake.body[0][0] && apple.y === snake.body[0][1] - 1) {
            snake.eat(snake.body[0][0], snake.body[0][1] - 1)
            apple.create(sideCellCount)
            return false
        }
        else {
            snake.move(snake.body[0][0], snake.body[0][1] - 1)
            return false
        }
    }
    /* SNAKE MOVE DOWN */
    else if (nextMove === 'ArrowDown') {
        if (snake.body[0][1] === sideCellCount - 1){
            return true
        }
        else if (apple.x === snake.body[0][0] && apple.y === snake.body[0][1] + 1) {
            snake.eat(snake.body[0][0], snake.body[0][1] + 1)
            apple.create(sideCellCount)
            return false
        }
        else {
            snake.move(snake.body[0][0], snake.body[0][1] + 1)
            return false
        }
    }
}



let startGame = () => {

    let snake = new Snake()
    let apple = new Apple(sideCellCount)
    let nextMove = 'ArrowDown' // DEFAULT FIRST MOVE

    document.addEventListener('keydown', e => nextMove = e.code)

    let gameOver = false

    let interval = setInterval(() => {
        if (gameOver){
            clearInterval(interval)
            gameArea.style.display = 'none' // HIDE GAME AREA
            gameArea.innerHTML = ''
            gameOptions.style.display = 'block' // SHOW GAME OPTIONS
        }
        gameOver = gameMove(nextMove, snake, apple)
    }, 600)

}
