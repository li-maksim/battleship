const logic = require('./logic')

const Ship = logic.Ship
const Gameboard = logic.Gameboard
const Player = logic.Player

const PlayerTables = function() {

    const gameboard1 = document.querySelector('#gameboard1')
    const gameboard2 = document.querySelector('#gameboard2')
    const player1 = []
    const player2 = []
    let coordinatesPlayer1 = []

    const createPlayerTables = function(one, two) {
        for (let i = 0; i < one.gameboard.table.length; i++) {
            const row = []
            for (let j = 0; j < one.gameboard.table[i].length; j++) {
                const square = document.createElement('div')
                square.setAttribute('class', 'square')
                if (one.gameboard.table[i][j] != 0) {
                    square.textContent = one.gameboard.table[i][j]
                }
                square.dataset.y = i
                square.dataset.x = j
                square.textContent = square.dataset.y + ' ' + square.dataset.x     
                square.addEventListener('mouseenter', () => {
                    coordinatesPlayer1[0] = square.dataset.y
                    coordinatesPlayer1[1] = square.dataset.x
                })  
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
            if (two.gameboard.table[i][j] != 0) {
                square.textContent = two.gameboard.table[i][j]
            }
            gameboard2.appendChild(square)
            row.push(square)
        }
        player2.push(row)
   }
    }

    return {player1, player2, createPlayerTables, coordinatesPlayer1}
}()

const ControlsPanel = function() {
    const controlsDiv = document.querySelector('.controls')
    const placeControls = function() {
        const ship4 = document.createElement('div')
        ship4.setAttribute('class', 'ship_control')
        const ship3 = document.createElement('div')
        ship3.setAttribute('class', 'ship_control')
        const ship2 = document.createElement('div')
        ship2.setAttribute('class', 'ship_control')
        const ship1 = document.createElement('div')
        ship1.setAttribute('class', 'ship_control')
        controlsDiv.appendChild(ship4)
        controlsDiv.appendChild(ship3)
        controlsDiv.appendChild(ship2)
        controlsDiv.appendChild(ship1)
    }

    return {placeControls}
}()

const controls = document.querySelectorAll('.ship_control')
controls.forEach(function(item, idx) {
    item.addEventListener('click', () => {
        console.log('yup')
    })
})

module.exports.PlayerTables = PlayerTables
module.exports.ControlsPanel = ControlsPanel