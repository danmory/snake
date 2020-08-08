export class Apple{
    constructor(x, y) {
        this.x = x
        this.y = y
        document.getElementById(`${x * y}`).classList.add('apple')
        document.getElementById(`${x * y}`).isFree = false
    }

    /* REMOVE APPLE FROM THE AREA */
    remove(){
        document.getElementById(`${this.x * this.y}`).classList.remove('apple')
        delete(this)
    }
}