/* eslint-disable */

const logic = require('./logic')
const Ship = logic.Ship
const Gameboard = logic.Gameboard
const newShip = new Ship(4)

// Testing of class Ship

test('Hits ship', () => {
    expect(newShip.hit()).toBe(3)
})
test('Checks if ship is sunk at 3 hp', () => {
    expect(newShip.isSunk()).toBe(false)
})
test('Checks if ship is sunk at 0 hp', () => {
    newShip.hit()
    newShip.hit()
    newShip.hit()
    newShip.hit()
    expect(newShip.isSunk()).toBe(true)
})

// Testing of class Gameboard

const newGameboard = new Gameboard()

test('Creates Gameboard', () => {
    expect(newGameboard.table).toEqual([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
})
test('Place ship (length 3) at 1, 3', () => {
    newGameboard.placeShip(1, 3, 3)
    expect(newGameboard.table).toEqual([
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
})
test('Place ship (length 3) at 3, 3 vertically', () => {
    newGameboard.placeShip(3, 3, 3, true)
    expect(newGameboard.table).toEqual([
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
})
// test('Cant place Ship at occupied space', () => {
//     newGameboard.placeShip(1, 3, 3, true)
//     expect(() => newGameboard.placeShip(2, 3, 3)).toThrow()
// })
test('Misses attack at 1, 1', () => {
    expect(newGameboard.receiveAttack(1, 1)).toBe('Miss!')
})
test('Hits at 1, 4', () => {
    newGameboard.receiveAttack(1, 4)
    expect(newGameboard.table).toEqual([
        ['#', 0, 1, 'x', 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    )
})
test('Ship 1 has taken a hit', () => {
    expect(newGameboard.ships[0].hp).toBe(2)
})
// test('Terminates game when all ships are sunk', () => {
//     const secondGameboard = new Gameboard()
//     secondGameboard.placeShip(1, 1, 2)
//     secondGameboard.receiveAttack(1, 1)
//     expect(secondGameboard.receiveAttack(1, 2)).toBe('Game Over!')
// })

// test('Sunks ship', () => {
//     const newGameboard = new Gameboard()
//     newGameboard.placeShip(1, 3, 3)
//     // newGameboard.receiveAttack(1, 3)
//     // newGameboard.receiveAttack(1, 4)
//     // newGameboard.receiveAttack(1, 5)
//     expect(newGameboard.table).toEqual([
//         [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
// })