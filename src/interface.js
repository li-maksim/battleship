const logic = require('./logic')

const realPlayer = logic.realPlayer
const botPlayer = logic.botPlayer

const PlayerTables = function() {

    const gameboard1 = document.querySelector('#gameboard1')
    const gameboard2 = document.querySelector('#gameboard2')
    const player1 = []
    const player2 = []
    let coordinatesPlayer1 = []

    const clearPlayerTables = function() {
        gameboard1.textContent = ''
        gameboard2.textContent = ''
    }

    const createPlayerTables = function(one, two) {
        clearPlayerTables()
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
                square.addEventListener('dragenter', () => {
                    coordinatesPlayer1[0] = parseInt(square.dataset.y)
                    coordinatesPlayer1[1] = parseInt(square.dataset.x)
                    console.log(coordinatesPlayer1)
                })  
                square.addEventListener('mouseleave', () => {
                    coordinatesPlayer1.length = 0
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
            square.dataset.y = i
            square.dataset.x = j
            square.addEventListener('click', () => {
                botPlayer.gameboard.receiveAttack(parseInt(square.dataset.y) + 1, parseInt(square.dataset.x) + 1)
                createPlayerTables(realPlayer, botPlayer)
                if (botPlayer.gameboard.checkIfAllShipsAreSunk() == true) {
                    alert('You Won!')
                }
                botPlayer.doRandomAttack()
                setTimeout(() => {createPlayerTables(realPlayer, botPlayer)}, '400')
                if (realPlayer.gameboard.checkIfAllShipsAreSunk() == true) {
                    alert('You lost!')
                }
            })
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

        const label = document.createElement('label')
        label.textContent = 'Horizontal'
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'

        for (let i = 4; i > 0; i--) {
            const shipControl = document.createElement('div')
            shipControl.setAttribute('class', 'ship_control')
            shipControl.draggable = 'true'
            // shipControl.addEventListener('dragstart', () => {
                
            // })
            shipControl.dataset.length = i
            let length = shipControl.dataset.length
            shipControl.style.height = `calc(40px * ${length})`
            shipControl.addEventListener('dragend', () => {
                if (PlayerTables.coordinatesPlayer1.length != 0) {
                    shipControl.classList.add('hidden')
                    console.log(PlayerTables.coordinatesPlayer1[0], PlayerTables.coordinatesPlayer1[1], parseInt(length))
                    if (checkbox.checked) {
                        realPlayer.gameboard.placeShip(PlayerTables.coordinatesPlayer1[0], PlayerTables.coordinatesPlayer1[1], parseInt(length), false)
                    } else {
                        realPlayer.gameboard.placeShip(PlayerTables.coordinatesPlayer1[0], PlayerTables.coordinatesPlayer1[1], parseInt(length), true)
                    }
                    PlayerTables.createPlayerTables(realPlayer, botPlayer)
                }
            })  

            controlsDiv.appendChild(shipControl)

            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    shipControl.style.height = '40px'
                    shipControl.style.width = `calc(40px * ${length})`
                } else {
                    shipControl.style.height = `calc(40px * ${length})`
                    shipControl.style.width = '40px'
                }
            })
        }

        controlsDiv.appendChild(label)
        controlsDiv.appendChild(checkbox)
    }

    return {placeControls}
}()

module.exports.PlayerTables = PlayerTables
module.exports.ControlsPanel = ControlsPanel