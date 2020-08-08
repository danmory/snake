export class Snake{
    constructor() {
        this.length = 1
        this.body = [[0,0]]
        document.getElementById('0').isFree = false
        document.getElementById('0').classList.add('snake')
    }

    /* SNAKE EAT THE APPLE*/
    eat(x, y){
        this.body.unshift([x,y])
        this.length++
        let headCell = document.getElementById(`${x * y}`)
        headCell.classList.remove('apple')
        headCell.classList.add('snake')
    }

    /* MOVE OF A SNAKE WITHOUT EATING AN APPLE*/
    move(x, y){
        this.body.unshift([x,y])
        document.getElementById(`${x*y}`).classList.add('snake')
        let tailPosition = this.body.pop()
        let tailCell = document.getElementById(`${tailPosition[0] * tailPosition[1]}`)
        tailCell.classList.remove('snake')
        tailCell.isFree = true
    }

}
