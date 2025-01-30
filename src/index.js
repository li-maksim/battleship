const Logic = require('./logic')
const Interface = require('./interface')

const Ship = Logic.Ship
const Gameboard = Logic.Gameboard
const Player = Logic.Player
const ComputerPlayer = Logic.ComputerPlayer

const realPlayer = new Player
const botPlayer = new ComputerPlayer

Interface.PlayerTables.createPlayerTables(realPlayer, botPlayer)