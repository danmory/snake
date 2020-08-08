import {Snake} from './models/snake'
import {Apple} from './models/apple'

const btns = document.getElementsByClassName('btn-size')
const gameOptions = document.querySelector('.game-options')
const gameArea = document.querySelector('.game-area')
let cellCount = 0 // TOTAL NUMBER OF CELLS
let sideCellCount = 0

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const createArea = sideCellCount => {
    gameArea.style.display = 'block'
    cellCount = sideCellCount*sideCellCount
    for (let i = 0; i < cellCount; i++) {
        /* CREATE CELLS AND ADD IT INTO THE AREA*/
        let areaCell = document.createElement('div')
        areaCell.classList.add('area-cell')
        areaCell.id = `${i}`
        areaCell.x = `${i%sideCellCount}`
        areaCell.y = `${Math.floor(i/sideCellCount)}`
        areaCell.isFree = true
        areaCell.style.width = `${parseInt(getComputedStyle(gameArea).width) / sideCellCount}px`
        areaCell.style.height = `${parseInt(getComputedStyle(gameArea).height) / sideCellCount}px`
        gameArea.appendChild(areaCell)
    }
    /* START THE GAME AFTER CREATING THE AREA*/
    startGame()
}

/* SELECTING AREA SIZE */
for (let btn of btns){
    btn.addEventListener('click', () => {
        sideCellCount = btn.value // NUMBER OF CELLS IN A ROW AND IN A COLUMN
        gameOptions.style.display = 'none'
        createArea(sideCellCount)
    })
}

let startGame = () => {
    let snake = new Snake()
    let apple = null

    while (true){
        /* CREATE AN APPLE IF IT IS NOT IN THE AREA*/
        if (!apple){
            let x = getRandomInt(0, sideCellCount)
            let y = getRandomInt(0, sideCellCount)
            while (!document.getElementById(`${x * y}`).isFree){
                x = getRandomInt(0, sideCellCount)
                y = getRandomInt(0, sideCellCount)
            }
            apple = new Apple(x, y)
        }


    }
}
