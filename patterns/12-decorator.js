// 12 - Decorator pattern

// Decorators are a structural design pattern that aim to promote code re-use.
// Similar to Mixins, they can be considered another viable alternative
// to object sub-classing.
// Classically, Decorators offered the ability to add behaviour to existing
// classes in a system dynamically. The idea was that the decoration itself
// wasn't essential to the base functionality of the class, otherwise it would
// be baked into the superclass itself.

// The constructor to decorate
class MacBook {
  cost () {
    return 997
  }
  screenSize () {
    return 11.6
  }
}

class MacBookDecorator {
  addMemory (mb) {
    const v = mb.cost()
    mb.cost = function () {
      return v + 75
    }
  }

  engraving (mb) {
    const v = mb.cost()
    mb.cost = function () {
      return v + 200
    }
  }

  buyInsurance (mb) {
    const v = mb.cost()
    mb.cost = function () {
      return v + 250
    }
  }
}

const mb = new MacBook()
const mbdec = new MacBookDecorator()
mbdec.addMemory(mb)
mbdec.engraving(mb)
mbdec.buyInsurance(mb)

// Outputs: 1522
console.log(mb.cost())

// Outputs: 11.6
console.log(mb.screenSize())
