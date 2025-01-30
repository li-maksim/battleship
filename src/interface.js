const logic = require('./logic')

const Ship = logic.Ship
const Gameboard = logic.Gameboard
const Player = logic.Player

const PlayerTables = function() {

    const gameboard1 = document.querySelector('#gameboard1')
    const gameboard2 = document.querySelector('#gameboard2')
    const player1 = []
    const player2 = []

    const createPlayerTables = function(one, two) {
        for (let i = 0; i < one.gameboard.table.length; i++) {
            const row = []
            for (let j = 0; j < one.gameboard.table[i].length; j++) {
                const square = document.createElement('div')
                square.setAttribute('class', 'square')
                square.textContent = one.gameboard.table[i][j]
                gameboard1.appendChild(square)
                row.push(square)
            }
            player1.push(row)
       }

       for (let i = 0; i < two.gameboard.table.length; i++) {
        const row = []
        for (let j = 0; j < two.gameboard.table[i].length; j++) {
            const square = document.createElement('div')
            square.setAttribute('class', 'square')
            square.textContent = two.gameboard.table[i][j]
            gameboard2.appendChild(square)
            row.push(square)
        }
        player2.push(row)
   }
    }

    return {player1, player2, createPlayerTables}
}()

module.exports.PlayerTables = PlayerTables