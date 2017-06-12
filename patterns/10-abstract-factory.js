// 08 - Abstract Factory pattern

// Abstract Factory pattern, a class delegates the responsibility
// of object instantiation to another object via composition.

// Abstract Factory can be implemented with Factory Method pattern:

const GlassSide = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
}

class Glasses {
  constructor () {
    this.leftGlass = null
    this.rightGlass = null
  }
  setGlass (side, glass) {
    if (side === GlassSide.LEFT) this.leftGlass = glass
    else this.rightGlass = glass
  }
}

class Glass {
  constructor (color) {
    this.color = color
    this.isLux = false
  }
}

class LuxoryGlass extends Glass {
  constructor (color) {
    super(color)
    this.isLux = true
  }
}

class GlassesFactory {
  createGlasses (glassColor) {
    const g = new Glasses()
    g.setGlass(GlassSide.LEFT, this.createGlass(glassColor))
    g.setGlass(GlassSide.RIGHT, this.createGlass(glassColor))
    return g
  }
  createGlass (color) {
    return new Glass(color)
  }
}

class LuxoryGlassesFactory extends GlassesFactory {
  createGlass (color) {
    return new LuxoryGlass(color)
  }
}

// Helper method that accept a Factory object
function createGlasses (factory, color) {
  return factory.createGlasses(color)
}

const gf = new GlassesFactory()
const gfLux = new LuxoryGlassesFactory()
console.log(createGlasses(gf, 'blue'))
console.log(createGlasses(gfLux, 'black'))
