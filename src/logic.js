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
        let result = true
        for(let i; i < this.ships.length; i++) {
            if (!this.ships[i].isSunk()) {
                result = false
            } 
        }
        return result
    }

    throwPlacingError = function() {
        throw new Error('The ship cannot be placed near another ship or go beyond gameboard')
    }
    placeShip = function(y, x, length, vertically = false) {

        if (!vertically) {
            for (let i = 0; i <= x; i++) {
                if (this.table[y - 1][x - 1 + i] != 0) {
                    this.throwPlacingError()
                    break
                }
            }
            for (let i = 0; i < length; i++) {
                if (x + i > 10) {
                    this.throwPlacingError()
                    break
                }
            }
        } else {
            for (let i = 0; i <= y; i++) {
                if (this.table[y - 1 + i][x - 1] != 0) {
                    this.throwPlacingError()
                    break
                }
            }
            for (let i = 0; i < length; i++) {
                if (y + i > 10) {
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
                this.table[y - 1][x - 1 + i] = num
            }
        } else {
            for (let i = 0; i < length; i++) {
                this.table[y - 1 + i][x - 1] = num
            }
        }
    }

    receiveAttack = function(y, x) {
        if (this.table[y - 1][x - 1] === 0) {
            this.table[y - 1][x - 1] = '#'
            return 'Miss!'
        } else {
            const num = this.table[y - 1][x - 1] - 1
            this.ships[num].hit()
            this.table[y - 1][x - 1] = 'x'
            if (this.checkIfAllShipsAreSunk()) {
                return 'Game Over!'
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
}

module.exports.Ship = Ship
module.exports.Gameboard = Gameboard
module.exports.Player = Player
module.exports.ComputerPlayer = ComputerPlayer