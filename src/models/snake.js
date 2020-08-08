export class Snake{
    constructor() {
        this.length = 1
        this.body = [[0,0]]
    }

    eat(x, y){
        this.body.unshift([x,y])
        this.length++
    }

    move(x, y){
        this.body.unshift([x,y])
        this.body.pop()
    }

    show(){
        for (let pos of this.body){
            document.getElementById(`${pos[0] * pos[1]}`).classList.add('snake')
        }
    }
}
