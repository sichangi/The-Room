import maskGen from '../../utils/maskGen';

export class Shifter {
  constructor(settings) {
    // base canvas
    this.canvas = null;
    this.ctx = null;

    // Mask canvas
    this.maskCanvas = null;
    this.maskCtx = null;

    // Window && container bounds
    this.Rect = null;
    this.globalRect = null;

    // Container reference
    this.container = settings.container;
    if (!this.container) throw 'No container provided';
    this.globalContainer = settings.globalContainer;

    // Slides
    this.slides = settings.slides.slice();
    if (this.slides.length <= 1) throw 'Very few slides to work with';
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

    this.worker = null;

    this._init();
  }

  async _init() {
    this.worker = new Worker('workers/bg.js');
    // prepare the canvas
    this._addCanvas();
    // prepare and append the mask
    if (this.masked) this._addMask();

    this.worker.addEventListener('message', ev => this._handleWorkerRequests(ev));

    this.worker.postMessage({
      event: 'init',
      context: {
        canvas: this.canvas,
        masked: this.masked,
        maskCanvas: this.maskCanvas,
        maskWidth: this.maskWidth,
        Rect: this.Rect,
        globalRect: this.globalRect,
        slides: this.slides,
        easing: this.easing,
        duration: this.duration,
        animationProps: this.animationProps
      }
    }, [this.canvas, ...(this.masked ? [this.maskCanvas] : [])]);
  }

  _addCanvas() {
    const canvas = document.createElement('canvas');

    this.Rect = this.container.getBoundingClientRect();
    if (this.globalContainer) this.globalRect = this.globalContainer.getBoundingClientRect();

    // bind canvas to containers height and width
    canvas.width = this.Rect.width;
    canvas.height = this.Rect.height;

    // Attach canvas to container & pass over control to worker
    this.canvas = this.container.appendChild(canvas).transferControlToOffscreen();
  }

  _addMask() {
    const maskCanvas = document.createElement('canvas');
    maskCanvas.className += 'mask';
    maskCanvas.width = this.Rect.width;
    maskCanvas.height = this.Rect.height;

    this.maskCanvas = this.container.appendChild(maskCanvas).transferControlToOffscreen();
  }

  async _handleWorkerRequests(e) {
    const data = e.data;

    switch (data.event) {
      case 'initialized':
        console.debug('initialized', this.container.id);
        break;
      case 'mask:gen':
        const {h, w, mw} = data.args;
        const img = await maskGen(h, w, mw);
        this.worker.postMessage({event: 'mask:gen', mask: await createImageBitmap(img)});
        break;
      case 'navigate:complete':
        break;
    }
  }

  async navigate(index, mask, opts = {disable: false, easing: false}) {
    if (opts.disable) return;
    if (index === this.slidesIndex) return;
    await this.workerReq('navigate', {index, mask, easing: opts.easing});
    this.slidesIndex = index;
  }

  update() {
  }

  workerReq(event, data) {
    return new Promise(resolve => {
      const listener = (ev) => {
        const message = ev.data;
        if (message.event === `${event}:complete`) {
          this.worker.removeEventListener('message', listener);
          resolve(message.data);
        }
      };
      this.worker.addEventListener('message', listener);
      this.worker.postMessage({event, data});
    });
  }
}
