import './style.css'

const Logic = require('./logic')
const Interface = require('./interface')

const Ship = Logic.Ship
const Gameboard = Logic.Gameboard
const Player = Logic.Player
const ComputerPlayer = Logic.ComputerPlayer

const realPlayer = Logic.realPlayer
const botPlayer = Logic.botPlayer

botPlayer.placeRandomShips()
realPlayer.gameboard.placeShip(3, 5, 4, true)
Interface.PlayerTables.createPlayerTables(realPlayer, botPlayer)
Interface.ControlsPanel.placeControls()

