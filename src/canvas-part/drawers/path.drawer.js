import { Canvas } from '../services/canvas';
import { ShapeService } from '../services/shape.service';
import { repeat } from '../utils/animate';

export class PathDrawer {
  dotRadius = 2;
  xRatio = 0;
  yRatio = 1;
  sinRatio = 70;
  yRatioMultiplier = 4.2;
  xRatioMultiplier = 142;
  xOffset = -120;
  until = {done: false};

  lineCords = [];

   get centerOfNewDot() {
    return {
      y: this.canvas.height + this.sinRatio * Math.sin(this.xRatio) + (--this.yRatio * this.yRatioMultiplier),
      x: this.xRatio * this.xRatioMultiplier + this.xOffset
    }
  }

  constructor(canvas, shapeDrawer) {
    this.canvas = canvas;
    this.shapeDrawer = shapeDrawer;
  }


  resolve() {
    return new Promise(resolve => {
      repeat({
        until: this.until,
        draw: () => this.drawPath(resolve)
      });
    });
  }

  destroy() {
    this.until.done = true;
  }

   drawPath(onDone) {
    const center = this.centerOfNewDot;
    this.drawDot(center);
    this.lineCords.push(center);

    this.until.done = center.x >= this.canvas.width;
    if (this.until.done) {
      onDone(this);
    }
  }

   drawDot(center) {
    this.shapeDrawer.drawDot(center.x, center.y, this.dotRadius);
    this.xRatio += 0.1; // simple factor got by experemental running
  }
}


