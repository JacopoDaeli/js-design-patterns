// 04 - Observer Pattern

class ObserverList {
  constructor () {
    this._observerList = []
  }

  add (obj) {
    return this._observerList.push(obj)
  }

  count () {
    return this._observerList.length
  }

  get (index) {
    if (index > -1 && index < this._observerList.length) {
      return this._observerList[index]
    }
  }

  indexOf (obj, startIndex) {
    let i = startIndex

    while (i < this._observerList.length) {
      if (this._observerList[i] === obj) {
        return i
      }
      i++
    }

    return -1
  }

  removeAt (index) {
    this._observerList.splice(index, 1)
  }
}

class Subject {
  constructor () {
    this._observers = new ObserverList()
  }

  addObserver (observer) {
    this._observers.add(observer)
  }

  removeObserver (observer) {
    this._observers.removeAt(this.observers.indexOf(observer, 0))
  }

  notify (context) {
    const observerCount = this._observers.count()
    for (let i = 0; i < observerCount; i++) {
      this._observers.get(i).update(context)
    }
  }
}

class Observer {
  update (contex) {
    console.log(contex)
  }
}

// Usage:

// Extends Subject class
class ObservableString extends Subject {
  constructor () {
    super()
    this._value = ''
  }
  set (str) {
    this._value = str
    this.notify(this._value)
  }
  get () {
    return this._value
  }
}

// Create an ObservableString Object
const observStr = new ObservableString()

// Create an Observer Object
const observer = new Observer()

// Attach the Observer to the Subject
observStr.addObserver(observer)

// Modify the subject
observStr.set('This calls observer.update() method.')
