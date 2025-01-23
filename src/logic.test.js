const logic = require('./logic')
const Ship = logic.Ship
const newShip = new Ship(4)

// test('Creates Ship', () => {
//     expect(newShip).toEqual({length: 4, hp: 4})
// })

// test('Hits ship', () => {
//     expect(newShip.hit()).toBe(3)
// })
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