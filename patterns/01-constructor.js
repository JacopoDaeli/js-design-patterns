// 01 - Constructor Pattern

function Person (firstname, lastname) {
  this.firstname = firstname
  this.lastname = lastname
}

// Note here that we are using Object.prototype.newMethod rather than
// Object.prototype so as to avoid redefining the prototype object
Person.prototype.sayHi = function () {
  return `Hi, my name is ${this.firstname} ${this.lastname}`
}

Person.prototype.toString = function () {
  return `${this.firstname} ${this.lastname} is a Person`
}

function Engineer (firstname, lastname, field) {
  Person.call(this, firstname, lastname)
  this.field = field
}

Engineer.prototype = Object.create(Person.prototype)
Engineer.prototype.toString = function () {
  return `${this.firstname} ${this.lastname} is a ${this.field} Engineer`
}
Engineer.prototype.constructor = Engineer

// Usage:
const ruben = new Person('Ruben', 'Nataf')
const jacopo = new Engineer('Jacopo', 'Daeli', 'Software')

console.log(ruben.sayHi())
console.log(ruben.toString())
console.log(jacopo.sayHi())
console.log(jacopo.toString())

// Appendix ES6:
class A {
  constructor (who) {
    this._who = who
    console.log(`created ${this._who}`)
  }
  doStuff () {
    console.log(`${this._who} did stuff`)
  }
}

class B extends A {
  constructor (who) {
    super(who)
    console.log(`${this._who} will do something soon`)
  }
  doStuff () {
    super.doStuff()
    console.log('and it was awesome')
  }
}

const b = new B('B')
b.doStuff()
