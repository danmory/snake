const btns = document.getElementsByClassName('btn-size')
const gameOptions = document.querySelector('.game-options')
const gameArea = document.querySelector('.game-area')


const createArea = cellSideSize => {
    gameArea.style.display = 'block'
    for (let i = 0; i < cellSideSize*cellSideSize; i++) {
        let areaCell = document.createElement('div')
        areaCell.classList.add('area-cell')
        areaCell.style.width = `${parseInt(getComputedStyle(gameArea).width) / cellSideSize}px`
        areaCell.style.height = `${parseInt(getComputedStyle(gameArea).height) / cellSideSize}px`
        gameArea.appendChild(areaCell)
    }
}

for (let btn of btns){
    btn.addEventListener('click', () => {
        let cellSideSize = btn.value
        gameOptions.style.display = 'none'
        createArea(cellSideSize)
    })
}

