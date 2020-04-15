let shifter;

// Declare anime.js stubs
class NodeList {
}

class HTMLCollection {
}

class SVGElement {
}

const window = {Promise};

self.addEventListener('message', function (e) {
  const data = e.data;

  switch (data.event) {
    case 'init':
      if (!shifter) {
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.0/anime.min.js');
        shifter = new Shifter(data.context);
      }
      break;
    case 'navigate':
      shifter.navigate(data.data);
      break;
  }
});

class Shifter {

  constructor(settings) {
    // base canvas
    this.canvas = settings.canvas;
    this.ctx = null;

    // Mask canvas
    this.maskCanvas = settings.maskCanvas;
    this.maskCtx = null;

    // Window && container bounds
    this.Rect = settings.Rect;
    this.globalRect = settings.globalRect;

    // Slides
    this.slides = settings.slides.slice();
    this.slidesIndex = 0;

    // Apply a mask
    this.masked = settings.masked;
    this.maskWidth = settings.maskWidth;
    if (!this.maskWidth) throw 'No mask specified';
    this.mask = null;

    // Animation
    this.duration = settings.duration;
    this.easing = settings.easing;
    this.isUpdatingBounds = false;
    this.animationProps = settings.animationProps;

    this._init();
    self.postMessage({event: 'initialized', data: true});
  }

  static async _loadImage(path) {
    const blob = await fetch(path).then(x => x.blob());
    return createImageBitmap(blob);
  }

  static _drawSlide(ctx, slide, rect, globalRect) {
    if (globalRect) {
      // imgCover(ctx, slide, -rect.x, -rect.y, globalRect.height, globalRect.height)
      ctx.drawImage(slide, -rect.x, -rect.y, globalRect.width, globalRect.height);
    } else {
      // imgCover(ctx, slide, rect.x, rect.y, rect.width, rect.height)
      ctx.drawImage(slide, rect.x, rect.y, rect.width, rect.height);
    }
  }

  _init() {
    // prepare the canvas
    this.ctx = this.canvas.getContext('2d');
    // prepare and append the mask
    if (this.masked) {
      this.maskCtx = this.maskCanvas.getContext('2d');
      this.maskCtx.imageSmoothingEnabled = false;
    }
    // prepare the slides
    setTimeout(this._setSlides.bind(this, this.slides), 0);
  }

  async _setSlides(slides = []) {
    return Promise.all(slides.map(async (path, i) => {
      const runRenderer = !i ? this._renderSlide.bind(this, i) :
        (i === 1 && this.masked) ? this._renderMask.bind(this, i) : () => true;

      this.slides[i] = await Shifter._loadImage(path);
      runRenderer();
    }, this));
  }

  _renderSlide(i) {
    // Set index to existent index if Not moved.
    i = i || this.slidesIndex;
    this.slidesIndex = i;
    Shifter._drawSlide(this.ctx, this.slides[i], this.Rect, this.globalRect);
  };

  async _renderMask(i) {
    i = i || this.slidesIndex + 1;

    // if current slide is the last, select the first
    const index = (i >= this.slides.length) ? 0 : i,
      slide = this.slides[index],
      globalRect = this.globalRect,
      rect = this.Rect;
    this.maskCtx.clearRect(0, 0, rect.width, rect.height);
    await this._applyMask(this.maskCtx, rect);
    this.maskCtx.globalCompositeOperation = 'source-atop';
    this.maskCtx.save();
    Shifter._drawSlide(this.maskCtx, slide, rect, globalRect);
  }

  async _applyMask(ctx, rect) {
    this.mask = (!this.mask || this.isUpdatingBounds) ?
      await this.getMask(rect.height, rect.width, this.maskWidth)
      : this.mask;
    this.maskCtx.drawImage(this.mask, 0, 0);
  }

  getMask(h, w, mw = 10) {
    return new Promise(resolve => {
      self.postMessage({event: 'mask:gen', args: {h, w, mw}});
      self.addEventListener('message', async ev => {
        const {event, mask} = ev.data;
        if (event === 'mask:gen') {
          resolve(createImageBitmap(mask));
        }
      });
    });
  }

  _updateBounds({rect, globalRect}) {
    this.Rect = rect;
    if (globalRect) this.globalRect = globalRect;

    const {width, height} = this.Rect;

    this.canvas.width = width;
    this.canvas.height = height;

    if (this.masked) {
      this.maskCanvas.width = width;
      this.maskCanvas.height = height;
    }
  }

  _animate(i, ctx, state) {
    const slide = this.slides[i];
    const rect = this.Rect;
    let halfRectW = rect.width / 2;
    let halfRectH = rect.height / 2;

    ctx.translate(halfRectW, halfRectH);
    ctx.globalAlpha = state.globalAlpha;
    ctx.scale(state.scale, state.scale);

    if (this.globalRect) {
      Shifter._drawSlide(ctx, slide, {
        x: halfRectW + rect.x, y: halfRectH + rect.y,
        width: rect.width, height: rect.height
      }, this.globalRect);
    } else {
      Shifter._drawSlide(ctx, slide, {x: -halfRectW, y: -halfRectH, width: rect.width, height: rect.height});
    }

    ctx.resetTransform();
  }

  _enter(index, ctx) {
    return new Promise((resolve => {
      let state = {
        scale: 1.2,
        globalAlpha: 0
      };

      anime({
        targets: state,
        globalAlpha: 1,
        scale: 1,
        easing: this.easing || 'linear',
        update: () => this._animate(index, ctx, state),
        complete: resolve
      });
    }));
  }

  _leave(index, ctx) {
    return new Promise((resolve => {
      let state = {
        scale: 1,
        globalAlpha: 1
      };

      anime({
        targets: state,
        scale: 1.2,
        globalAlpha: 0,
        easing: this.easing || 'linear',
        update: () => this._animate(index, ctx, state),
        complete: resolve
      });
    }));
  }

  async update({slides, maskWidth}) {
    if (maskWidth) this.maskWidth = maskWidth;
    if (Array.isArray(slides)) await this._setSlides.bind(this, slides)();
  }

  onResize(update) {
    this.isUpdatingBounds = true;
    this._updateBounds(update);
    this._renderSlide();
    if (this.masked) this._renderMask().catch(console.error);
    this.isUpdatingBounds = false;
  }

  async navigate({index, mask, easing = false}) {
    if (index === this.slidesIndex) return;
    if (easing) this.easing = easing;
    if (this.masked && mask) {
      const to = index + 1;
      const out = this.slidesIndex + 1;
      const enterI = (to >= this.slides.length) ? 0 : to;
      const leaveI = (out >= this.slides.length) ? 0 : out;
      await Promise.all([
        this._enter(enterI, this.maskCtx),
        this._leave(leaveI, this.maskCtx)
      ]);
    } else {
      await Promise.all([
        this._enter(index, this.ctx).then(() => this.slidesIndex = index),
        this._leave(this.slidesIndex, this.ctx)
      ]);
    }
    this.workerRes('navigate:complete', {slidesIndex: this.slidesIndex});
  }

  workerRes(event, data) {
    self.postMessage({event, data});
  }
}
