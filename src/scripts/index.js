import { lerp, addEvent, gebc, map } from '@qneyraud/q-utils'

class Font {
  constructor() {
    this.weight = {
      t: 100,
      v: 100
    }
    this.width = {
      t: 10,
      v: 10
    }

    this.bindMethods()
    this.initEvents()

    this.scrollToId = null

    this.section = gebc(document, 'project-section')
    this.onTick()
  }

  bindMethods () {
    this.onWheel = this.onWheel.bind(this)
    this.onTick = this.onTick.bind(this)
  }

  initEvents () {
    addEvent(window, 'wheel', this.onWheel)
  }

  onWheel (e) {
    this.weight.t = Math.abs(e.deltaY)
    this.weight.t = map(this.weight.t, 0, 200, 0, 1000, true)

    this.width.t = Math.abs(e.deltaY)
    this.width.t = map(this.width.t, 0, 200, 0, 200, true)

    window.clearTimeout(this.scrollToId)
    this.scrollToId = window.setTimeout(() => {
      this.weight.t = 100
      this.width.t = 10
    }, 50)
  }

  onTick () {
    this.weight.v = lerp(this.weight.v, this.weight.t, 0.1)
    this.section.style.setProperty('--wght', this.weight.v)

    this.width.v = lerp(this.width.v, this.width.t, 0.1)
    this.section.style.setProperty('--wdth', this.width.v)

    window.requestAnimationFrame(this.onTick)
  }
}

new Font()
