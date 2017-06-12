// 08 - Facade pattern

// In this example, calling Facade.facade() will actually trigger a
// set of private behavior within the module, but again, the programmer
// isn't necessarly concerned with this.
// I've made it much easier for them to consume a feature without
// needing to worry about implementation-level details.

class Facade {
  constructor () {
    this._color = 0x00000
  }
  _changeColor (color) {
    console.log('Changing color...')
    this._color = color
  }
  _processSomething () {
    console.log('Processing something...')
  }
  doStuff (params) {
    this._processSomething()
    if (params.color) this._changeColor(params.color)
  }
}

const f = new Facade()
f.doStuff({color: 0xFFFF00})
