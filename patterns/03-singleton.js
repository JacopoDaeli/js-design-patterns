// 03 - Singleton Pattern

const mySingleton = (function () {
  let instance

  function init () {
    let used = false
    return {
      onlyOnce () {
        if (used) return
        used = true
        console.log('only once')
      }
    }
  }

  return {
    getInstance () {
      if (!instance) {
        instance = init()
      }
      return instance
    }
  }
})()

// Usage:
mySingleton.getInstance().onlyOnce() // print "only once"
mySingleton.getInstance().onlyOnce() // do nothing
