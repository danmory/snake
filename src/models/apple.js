function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export class Apple{
    constructor(sideCellCount) {
        let x = getRandomInt(0, sideCellCount)
        let y = getRandomInt(0, sideCellCount)
        while (!document.getElementById(`${x}x${y}`).isFree){
            x = getRandomInt(0, sideCellCount)
            y = getRandomInt(0, sideCellCount)
        }
        this.x = x
        this.y = y
        document.getElementById(`${x}x${y}`).classList.add('apple')
    }

    create(sideCellCount){
        let x = getRandomInt(0, sideCellCount)
        let y = getRandomInt(0, sideCellCount)
        while (!document.getElementById(`${x}x${y}`).isFree){
            x = getRandomInt(0, sideCellCount)
            y = getRandomInt(0, sideCellCount)
        }
        this.x = x
        this.y = y
        document.getElementById(`${x}x${y}`).classList.add('apple')
    }
}

