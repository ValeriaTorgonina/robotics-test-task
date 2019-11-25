import { Canvas } from './services/canvas';
import { PathDrawer } from './drawers/path.drawer';
import { ShapeService } from './services/shape.service';
import { PeakDrawer } from './drawers/peak.drawer';
import { ShipComponent } from './components/ship';
import { HoverService } from './services/hover.service';
import { ClickService } from './services/click.service';

export class CanvasApp {

  constructor({canvasEl, years, imageUrl}) {
    this.canvasEl = canvasEl;
    this.years = years;
    this.imageUrl = imageUrl;
    this.imageUrl = imageUrl;
    this.years = years;
    this.canvas = new Canvas(canvasEl);
    this.hover = new HoverService(canvasEl);
    this.click = new ClickService(canvasEl);
    this.shaper = new ShapeService(this.canvas.ctx);
  }

  async run() {
    this.path = await new PathDrawer(
      this.canvas,
      this.shaper
    ).resolve();

    this.peaks = await new PeakDrawer(
      this.shaper,
      this.shotPathToCenter(this.path.lineCords),
      this.years,
      this.hover,
      this.click
    ).resolve();

    this.ship = new ShipComponent(this.shaper, this.path.lineCords, this.peaks.peakCords);

    try {
      await this.ship.downloadImage(this.imageUrl)
    } catch (err) {
      console.warn(`Image for ship wasn't downloaded! Check url correction!`);
    }

    await this.ship.appearance();
    this.peaks.setActive(0);
    return this
  }

  setActive(index) {
    return new Promise(resolve => {
      this.peaks.setActive(index);
      this.ship.moveToPeak(index, resolve)
    })
  }

  onPeakClick(handler) {
    this.peaks.onClick(handler);
  }

   shotPathToCenter(lineCords) {
    return lineCords.slice(20, lineCords.length - 10)
  }

  destroy() {
    this.hover.destroy();
    this.click.destroy();
  }
}

// const canvas = new CanvasApp({
//   years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
//   canvasEl: document.all['canvas'],
//   imageUrl: './ship.png'
// });

// canvas.run().then(app => {
//   app.onPeakClick((i, year) => {
//     app.setActive(i);
//     console.log('chosen year:', year)
//   })
// })


