export class Apple{
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    show(){
        document.getElementById(`${this.x * this.y}`).classList.add('apple')
    }

    remove(){
        document.getElementById(`${this.x * this.y}`).classList.remove('apple')
    }
}