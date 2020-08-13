import {Snake} from './models/snake'
import {Apple} from './models/apple'


const btns = document.getElementsByClassName('btn-size')
const gameOptions = document.querySelector('.game-options')
const gameArea = document.querySelector('.game-area')
const gameSpeed = document.querySelector('.game-speed input')

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

let canChangeMove = true

function gameMove(nextMove, snake, apple){
    /* SNAKE MOVE LEFT */
    if (nextMove === 'ArrowLeft') {
        let futureHeadCell = document.getElementById(`${snake.body[0][0] - 1}x${snake.body[0][1]}`)
        /* SNAKE BUMPS INTO THE WALL*/
        if (snake.body[0][0] === 0){
            return true
        }
        /* COLLISION */
        else if (!futureHeadCell.isFree){
            return true
        }
        /* SNAKE EATS THE APPLE */
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
        let futureHeadCell = document.getElementById(`${snake.body[0][0] + 1}x${snake.body[0][1]}`)
        /* SNAKE BUMPS INTO THE WALL*/
        if (snake.body[0][0] === sideCellCount - 1){
            return true
        }
        /* COLLISION */
        else if (!futureHeadCell.isFree){
            return true
        }
        /* SNAKE EATS THE APPLE */
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
        let futureHeadCell = document.getElementById(`${snake.body[0][0]}x${snake.body[0][1] - 1}`)
        /* SNAKE BUMPS INTO THE WALL*/
        if (snake.body[0][1] === 0){
            return true
        }
        /* COLLISION */
        else if (!futureHeadCell.isFree){
            return true
        }
        /* SNAKE EATS THE APPLE */
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
        let futureHeadCell = document.getElementById(`${snake.body[0][0]}x${snake.body[0][1]+1}`)
        /* SNAKE BUMPS INTO THE WALL*/
        if (snake.body[0][1] === sideCellCount - 1){
            return true
        }
        /* COLLISION */
        else if (!futureHeadCell.isFree){
            return true
        }
        /* SNAKE EATS THE APPLE */
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

    let gameSpeedValue = parseInt(gameSpeed.value)
    if (isNaN(gameSpeedValue)) {
        gameSpeedValue = 600
    }

    let snake = new Snake()
    let apple = new Apple(sideCellCount)
    let nextMove = 'ArrowDown' // DEFAULT FIRST MOVE
    let prevMove = 'ArrowDown'

    document.addEventListener('keydown', e => {
        if (canChangeMove) {
            canChangeMove = false
            prevMove = nextMove
            nextMove = e.code
            if (prevMove === 'ArrowDown' && nextMove === 'ArrowUp') {
                nextMove = prevMove
            } else if (prevMove === 'ArrowUp' && nextMove === 'ArrowDown') {
                nextMove = prevMove
            } else if (prevMove === 'ArrowLeft' && nextMove === 'ArrowRight') {
                nextMove = prevMove
            } else if (prevMove === 'ArrowRight' && nextMove === 'ArrowLeft') {
                nextMove = prevMove
            }
        }
    })

    let gameOver = false

    let interval = setInterval(() => {
        /* IF SNAKE DIED AFTER PREVIOUS MOVE */

        if (gameOver){
            clearInterval(interval)
            gameArea.style.display = 'none' // HIDE GAME AREA
            gameArea.innerHTML = ''
            document.querySelector('.game-over').style.display = 'flex'
            setTimeout(() => {
                document.querySelector('.game-over').style.display = 'none'
                gameOptions.style.display = 'flex'
            }, 1500) // SHOW GAME OPTIONS
        }
        /* IF SNAKE DID NOT DIE AFTER PREVIOUS MOVE
        * VARIABLE gameOver CONTAINS RESULT OF THE LAST MOVE( IS SNAKE BUMPED INTO THE WALL/ITS BODY )
        */
        else {
            gameOver = gameMove(nextMove, snake, apple)
            canChangeMove = true
        }
    }, gameSpeedValue)

}
