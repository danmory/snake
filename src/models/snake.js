export class Snake{
    constructor() {
        this.body = [[0,0]]
        document.getElementById('0x0').classList.add('snake')
        document.getElementById('0x0').isFree = false
    }

    /* SNAKE EAT THE APPLE*/
    eat(x, y){
        this.body.unshift([x,y])
        let headCell = document.getElementById(`${x}x${y}`)
        headCell.classList.remove('apple')
        headCell.classList.add('snake')
        headCell.isFree = false
    }

    /* MOVE OF A SNAKE WITHOUT EATING AN APPLE*/
    move(x, y){
        this.body.unshift([x,y])
        document.getElementById(`${x}x${y}`).classList.add('snake')
        let tailPosition = this.body.pop()
        let tailCell = document.getElementById(`${tailPosition[0]}x${tailPosition[1]}`)
        tailCell.classList.remove('snake')
        tailCell.isFree = true
    }
}
