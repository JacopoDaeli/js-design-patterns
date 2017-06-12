// 02 - Module Pattern

const testModule = (function () {
  let counter = 0
  return {
    incrementCounter () {
      return ++counter
    },
    resetCounter () {
      console.log(`Counter value prior to reset: ${counter}`)
      counter = 0
    }
  }
})()

// Increment our counter
console.log(testModule.incrementCounter())
console.log(testModule.incrementCounter())
console.log(testModule.incrementCounter())

// Check the counter value and reset
// Outputs: counter value prior to reset: 1
testModule.resetCounter()
