const area = document.querySelector('.area')
const btns = document.getElementsByClassName('btn-size')
const gameOptions = document.querySelector('.game-options')
const gameArea = document.querySelector('.game-area')

const createArea = sideSize => {
    alert(sideSize)
}

for (let btn of btns){
    btn.addEventListener('click', () => {
        let sideSize = btn.value
        gameOptions.style.display = 'none'
        createArea(sideSize)
    })
}