// 06 - Mediator Pattern

// A Mediator is an object that coordinates interactions (logic and behavior)
// between multiple objects. It makes decisions on when to call which objects,
// based on the actions (or inaction) of other objects and input.

// Delegation pattern is used to enable communication between the Mediator
// and the Colleague classes.
// PubSub, Observer and Events patterns can also be used.

class Dog {
  constructor (mediator) {
    this._mediator = mediator
  }
  bark () {
    console.log('The dog barked.')
    this._mediator.dogBarked()
  }
}

class Cat {
  constructor (mediator) {
    this._mediator = mediator
  }
  runAway () {
    console.log('The cat is running away.')
  }
}

class DogCatMediator {
  createAnimals () {
    this._dog = new Dog(this)
    this._cat = new Cat()
  }
  bringAnimalsToPark () {
    console.log('Animals are at the park.')
    this._dog.bark()
  }
  dogBarked () {
    this._cat.runAway()
  }
}

const dcm = new DogCatMediator()
dcm.createAnimals()
dcm.bringAnimalsToPark()
