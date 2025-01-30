const logic = require('./logic')

const Ship = logic.Ship
const Gameboard = logic.Gameboard
const Player = logic.Player

const body = document.querySelector('body')

const PlayerTables = function() {

    const gameboard1 = document.querySelector('.gameboard1')
    const gameboard2 = document.querySelector('.gameboard2')
    const player1 = []
    const player2 = []

    createTable = function(player, gameboard, array) {
       for (let i = 0; i < player.gameboard.table.length; i++) {
            const row = []
            for (let j = 0; j < player.gameboard.table[i]; j++) {
                const square = document.createElement('div')
                square.setAttribute('class', 'square')
                gameboard.appendChild(square)
                row.push(square)
            }
            array.push(row)
       }
    }

    const createPlayerTables = function(one, two) {
        createTable(one, gameboard1, player1)
        createTable(two, gameboard2, player2)
        return {player1, player2}
    }

    return {player1, player2, createPlayerTables}
}()

module.exports.PlayerTables = PlayerTables