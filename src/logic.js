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

module.exports.Ship = Ship