// 11 - Mixin pattern

// From "Learning JavaScript Design Patterns":
// Mixins allow objects to borrow (or inherit) functionality from them with
// a minimal amount of complexity. As the pattern works well with
// JavaScripts object prototypes, it gives us a fairly flexible way to share
// functionality from not just one Mixin, but effectively many through
// multiple inheritance.
// They can be viewed as objects with attributes and methods that can be
// easily shared across a number of other object prototypes.
// Imagine that we define a Mixin containing utility functions in a
// standard object literal as follows:

class Car {
  constructor (settings) {
    this.model = settings.model || 'no model provided'
    this.color = settings.color || 'no colour provided'
  }
}

class Mixin {
  driveForward () {
    console.log('drive forward')
  }
  driveBackward () {
    console.log('drive backward')
  }
  driveSideways () {
    console.log('drive sideways')
  }
}

class Util {
  static augment (receivingClass, givingClass, ...specificMethods) {
    // only provide certain methods
    if (specificMethods && specificMethods.length > 0) {
      const len = specificMethods.length
      for (let i = 0; i < len; i++) {
        receivingClass.prototype[specificMethods[i]] =
          givingClass.prototype[specificMethods[i]]
      }
    } else {
      for (let methodName of Object.getOwnPropertyNames(givingClass.prototype)) {
        // check to make sure the receiving class doesn't
        // have a method of the same name as the one currently
        // being processed
        if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
          receivingClass.prototype[methodName] =
            givingClass.prototype[methodName]
        }
      }
    }
  }
}

// Usage:

// Augment Car class applying Mixin
Util.augment(Car, Mixin, 'driveForward', 'driveBackward')

// Create a new Car
const myCar = new Car({
  model: 'Ford Escort',
  color: 'blue'
})

// Test to make sure we now have access to the methods
myCar.driveForward() // print "drive forward"
myCar.driveBackward() // print "drive backward"

// Augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
Util.augment(Car, Mixin)

const mySportsCar = new Car({
  model: 'Porsche',
  color: 'red'
})

mySportsCar.driveSideways() // print "drive sideways"
