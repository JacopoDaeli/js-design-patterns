// 07 - Command pattern

class Switch {
  constructor () {
    this._commands = []
  }

  storeAndExecute (command) {
    this._commands.push(command)
    command.execute()
  }
}

class Light {
  turnOn () {
    console.log('turn on')
  }
  turnOff () {
    console.log('turn off')
  }
}

class FlipDownCommand {
  constructor (light) {
    this._light = light
  }

  execute () {
    this._light.turnOff()
  }
}

class FlipUpCommand {
  constructor (light) {
    this._light = light
  }

  execute () {
    this._light.turnOn()
  }
}

const light = new Light()
const switchUp = new FlipUpCommand(light)
const switchDown = new FlipDownCommand(light)
const s = new Switch()

s.storeAndExecute(switchUp)
s.storeAndExecute(switchDown)
