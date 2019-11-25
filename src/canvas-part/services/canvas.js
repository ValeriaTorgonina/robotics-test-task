import { mainOpts } from '../configs/main';

export class Canvas {
  ctx;

  get width () {
    return this.el.width
  }

  get height () {
    return this.el.height
  }

  constructor (el) {
    this.el = el;
    this.el.height = 450 * mainOpts.dpiMultiplier; // this height 400x2 (400 ===  viewbox-image in particular task)
    this.el.width = 1250 * mainOpts.dpiMultiplier; // this height 1250x2 (1250 === viewbox-image in particular task)

    this.ctx = this.el.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
  }
}
