import maskGen from '@/utils/maskGen'
import {Power3, TimelineLite} from 'gsap'
// import imgCover from '@/utils/imgCover'

export default class Shifter {
  constructor(settings) {
    // base canvas
    this.canvas = null
    this.ctx = null

    // Mask canvas
    this.maskCanvas = null
    this.maskCtx = null

    // Window && container bounds
    this.Rect = null
    this.globalRect = null

    // Container reference
    this.container = settings.container
    if (!this.container) throw 'No container provided'
    this.globalContainer = settings.globalContainer

    // Slides
    this.slides = settings.slides.slice()
    if (this.slides.length <= 1) throw 'Very few slides to work with'
    this.slidesIndex = 0
    this.prevSlidesIndex = 0
    this.indexOffset = 1

    // Apply a mask
    this.masked = settings.masked
    this.maskWidth = settings.maskWidth
    if (!this.maskWidth) throw 'No mask specified'
    this.mask = null

    // Animation
    this.duration = settings.duration
    this.easing = settings.easing
    this.isUpdatingBounds = false
    this.animationProps = settings.animationProps

    this._init()
  }

  static _loadImage(path, callback) {
    const image = new Image()
    image.onload = callback
    image.src = path
    return image
  }

  static _drawSlide(ctx, slide, rect, globalRect) {
    if (globalRect) {
      // imgCover(ctx, slide, -rect.x, -rect.y, globalRect.height, globalRect.height)
      ctx.drawImage(slide, -rect.x, -rect.y, globalRect.width, globalRect.height)
    } else {
      // imgCover(ctx, slide, rect.x, rect.y, rect.width, rect.height)
      ctx.drawImage(slide, rect.x, rect.y, rect.width, rect.height)
    }
  }

  _init() {
    // prepare the canvas
    this._addCanvas()
    // prepare and append the mask
    if (this.masked) this._addMask()
    // prepare the slides
    setTimeout(this._addSlides.bind(this), 0)
  }

  _addCanvas() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.Rect = this.container.getBoundingClientRect()
    if (this.globalContainer) this.globalRect = this.globalContainer.getBoundingClientRect()

    // bind canvas to containers height and width
    this.canvas.width = this.Rect.width
    this.canvas.height = this.Rect.height

    // Attach canvas to container
    this.container.appendChild(this.canvas)
  }

  _addMask() {
    this.maskCanvas = document.createElement('canvas')
    this.maskCanvas.className += 'mask'
    this.maskCtx = this.maskCanvas.getContext('2d')
    this.maskCtx.imageSmoothingEnabled = false
    this.maskCanvas.width = this.Rect.width
    this.maskCanvas.height = this.Rect.height

    this.container.appendChild(this.maskCanvas)
  }

  _addSlides() {
    this.slides.forEach((path, i) => {
      const toRender = () => (i === 0) ? this._renderSlide.bind(this, i) :
        (i === 1 && this.masked) ? this._renderMask.bind(this, i) : null

      this.slides[i] = Shifter._loadImage(path, toRender())

    }, this)
  }

  _renderSlide = function (i) {
    // Set index to existent index if Not moved.
    i = i || this.slidesIndex
    this.slidesIndex = i
    Shifter._drawSlide(this.ctx, this.slides[i], this.Rect, this.globalRect)
  }

  async _renderMask(i) {
    i = i || this.slidesIndex + 1

    // if current slide is the last, select the first
    const index = (i >= this.slides.length) ? 0 : i,
      slide = this.slides[index],
      globalRect = this.globalRect,
      rect = this.Rect
    this.maskCtx.clearRect(0, 0, rect.width, rect.height)
    await this._applyMask(this.maskCtx, rect)
    this.maskCtx.globalCompositeOperation = 'source-atop'
    this.maskCtx.save()
    Shifter._drawSlide(this.maskCtx, slide, rect, globalRect)
  }

  async _applyMask(ctx, rect) {
    this.mask = (!this.mask || this.isUpdatingBounds) ?
      await maskGen(rect.height, rect.width, this.maskWidth, ctx)
      : this.mask
    this.maskCtx.drawImage(this.mask, 0, 0)
  }

  _updateBounds() {
    this.Rect = this.container.getBoundingClientRect()
    if (this.globalContainer) this.globalRect = this.globalContainer.getBoundingClientRect()

    const {width, height} = this.Rect

    this.canvas.width = width
    this.canvas.height = height

    if (this.masked) {
      this.maskCanvas.width = width
      this.maskCanvas.height = height
    }
  }

  _animate(i, ctx, state) {
    const slide = this.slides[i]
    const rect = this.Rect
    let halfRectW = rect.width / 2
    let halfRectH = rect.height / 2

    ctx.translate(halfRectW, halfRectH)
    ctx.globalAlpha = state.globalAlpha
    ctx.scale(state.scale, state.scale)

    if (this.globalRect) {
      Shifter._drawSlide(ctx, slide, {
        x: halfRectW + rect.x, y: halfRectH + rect.y,
        width: rect.width, height: rect.height
      }, this.globalRect)
    } else {
      Shifter._drawSlide(ctx, slide, {x: -halfRectW, y: -halfRectH, width: rect.width, height: rect.height})
    }

    ctx.resetTransform()
  }

  _enter(index, ctx) {
    return new Promise((resolve => {
      let state = {}

      const tl = new TimelineLite({
        onUpdate: () => {
          this._animate(index, ctx, state)
        },
        onComplete: () => {
          resolve()
        }
      })

      tl.set(state, {
        globalAlpha: 0,
        scale: 1.2
      })

      tl.to(state, this.duration, {
        globalAlpha: 1,
        scale: 1,
        ease: this.easing || Power3.easeOut
      })
    }))
  }

  _leave(index, ctx) {
    let state = {scale: 1, globalAlpha: 1}

    TweenLite.to(state, this.duration,
      {
        scale: 1.2,
        globalAlpha: 0,
        ease: this.easing || Power3.easeOut,
        onUpdate: () => {
          this._animate(index, ctx, state)
        }
      })
  }

  fullscreen() {
    var style = this.canvas.getAttribute('style') || ''

    var scale = {x: 16, y: 9}
    scale.x = (window.innerWidth - 10) / this.canvas.width
    scale.y = (window.innerHeight - 10) / this.canvas.height

    if (scale.x < 1 || scale.y < 1) {
      scale = '1, 1'
    } else if (scale.x < scale.y) {
      scale = scale.x + ', ' + scale.x
    } else {
      scale = scale.y + ', ' + scale.y
    }

    // this.canvas.setAttribute('style', style + ' ' + '-ms-transform-origin: center top; -webkit-transform-origin: center top; -moz-transform-origin: center top; -o-transform-origin: center top; transform-origin: center top; -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');');
  }

  onResize() {
    if (document.readyState === 'complete') {
      this.isUpdatingBounds = true
      this._updateBounds()
      this._renderSlide()
      if (this.masked) this._renderMask()
      this.isUpdatingBounds = false
    }
  }

  navigate(index, mask) {
    if (index === this.slidesIndex) return
    if (this.masked && mask) {
      const to = index + 1
      const out = this.slidesIndex + 1
      const enterI = (to >= this.slides.length) ? 0 : to
      const leaveI = (out >= this.slides.length) ? 0 : out
      this._enter(enterI, this.maskCtx)
      this._leave(leaveI, this.maskCtx)
    } else {
      this._enter(index, this.ctx).then(() => this.slidesIndex = index)
      this._leave(this.slidesIndex, this.ctx)
    }
  }
}
