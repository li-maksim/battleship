class Ship {
    constructor(length) {
        this.length = length
        this.hp = length
    }

    hit = function() {
        this.hp = this.hp - 1
        return this.hp
    }

    isSunk = function() {
        if(this.hp < 1) {
            return true
        } else {
            return false
        }
    }
} 

class Gameboard {
    createTable = function() {
        const table = []
        for (let i = 0; i < 10; i++) {
            const row = []
            for (let j = 0; j < 10; j++) {
                row.push(0)
            }
            table.push(row)
        }
    
        return table
    }
    constructor() {
        this.table = this.createTable()
        this.ships = []
    }

    checkIfAllShipsAreSunk = function() {
        for(let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].isSunk() == false) {
                return false
            } 
        }
        return true
    }

    throwPlacingError = function() {
        throw new Error('The ship cannot be placed near another ship or go beyond gameboard')
    }
    placeShip = function(y, x, length, vertically = false) {

        if (!vertically) {
            for (let i = 0; i <= length; i++) {
                if (this.table[y][x + i - 1] != 0) {
                    this.throwPlacingError()
                    break
                }
            }
            for (let i = 0; i < length; i++) {
                if (x + i > 11) {
                    console.log(x + i)
                    this.throwPlacingError()
                    break
                }
            }
        } else {
            for (let i = 0; i <= length; i++) {
                if (this.table[y + i - 1][x] != 0) {
                    this.throwPlacingError()
                    break
                }
            }
            for (let i = 0; i < length; i++) {
                if (y + i > 11) {
                    this.throwPlacingError()
                    break
                }
            }
        }
        const newShip = new Ship(length)
        this.ships.push(newShip)
        const num = this.ships.length

        if (!vertically) {
            for (let i = 0; i < length; i++) {
                this.table[y][x + i] = num
            }
        } else {
            for (let i = 0; i < length; i++) {
                this.table[y + i][x] = num
            }
        }
    }

    receiveAttack = function(y, x) {
        const shipIdx = this.table[y - 1][x - 1]
        if (shipIdx === 0) {
            this.table[y - 1][x - 1] = '#'
            return 'Miss!'
        } else {
            const idx = shipIdx - 1
            if (shipIdx != '#' && shipIdx != 'x') {
                this.ships[idx].hit()
                this.table[y - 1][x - 1] = 'x'
                // if (this.ships[idx].isSunk() === true) {
                //     for (let i = 0; i < this.table.length; i++) {
                //         for (let j = 0; j < this.table[i].length; j++) {
                //             if (this.table[i][j] == shipIdx) {
                //                 this.table[i][j] = 's'
                //             }
                //         }
                //     }
                // }
            }
        }
    }
}

class Player {
    constructor() {
        this.gameboard = new Gameboard()
    }
}

class ComputerPlayer extends Player {
    constructor() {
        super()
    }

    createRandomNum = function() {
        return Math.floor(Math.random() * 10 + 1)
    }

    createTrueOrFalse = function() {
        if ((this.createRandomNum() % 2) > 0) {
            return false
        } else {
            return true
        }
    }

    placeRandomShip = function(length) {
        try {
            this.gameboard.placeShip(this.createRandomNum(), this.createRandomNum(), length, this.createTrueOrFalse())
        } catch(e) {
            this.placeRandomShip(length)
        }
    }

    placeRandomShips = function() {
        this.placeRandomShip(4)
        this.placeRandomShip(3)
        this.placeRandomShip(2)
        this.placeRandomShip(1)
        console.log(this.gameboard)
    }

    doRandomAttack = function() {
        realPlayer.gameboard.receiveAttack(this.createRandomNum(), this.createRandomNum())
    }
}

const realPlayer = new Player
const botPlayer = new ComputerPlayer

module.exports.Ship = Ship
module.exports.Gameboard = Gameboard
module.exports.Player = Player
module.exports.ComputerPlayer = ComputerPlayer
module.exports.realPlayer = realPlayer
module.exports.botPlayer = botPlayer