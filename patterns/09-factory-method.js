// 09 - Factory Method pattern

// The Factory Method pattern uses inheritance and relies on a subclass
// to handle the desired object instantiation.

class P2PTransfer {
  start () {
    console.log('P2P transfer started')
  }
}

class RelayTransfer {
  start () {
    console.log('Relay transfer started')
  }
}

class App {
  constructor () {
    this._transfers = []
  }
  createTransfer () {
    throw new Error('createTransfer() is not implemented')
  }
  newTransfer () {
    const t = this.createTransfer()
    this._transfers.push(t)
    t.start()
  }
}

class P2PApp extends App {
  createTransfer () {
    return new P2PTransfer()
  }
}

class RelayApp extends App {
  createTransfer () {
    return new RelayTransfer()
  }
}

new P2PApp().newTransfer()
new RelayApp().newTransfer()
