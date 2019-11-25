import { animate } from '../utils/animate';
import { COLORS } from '../configs/colors';
import { HoverService } from '../services/hover.service';
import { mainOpts } from '../configs/main';
import { linear, easeInOutQuint, easeInCubic } from '../utils/timing';

export class PeakDrawer {
  peakRadius = 20;
  delayRatio = 150;

  peakCords = [];
  active;
  clickHandlers = [];
  hoverHandlers = [];

   get partsAmount() {
    if (this.labels.length < 2) return 2;
    return this.labels.length
  }

   get dotsSkipped() {
    return Math.floor(this.pathCords.length / this.partsAmount)
  }

  constructor(
     shaper,
     pathCords,
     labels = [new Date().getFullYear()],
     hoverService,
     clickService
  ) {
    this.shaper = shaper;
    this.pathCords = pathCords;
    this.labels = labels;
    this.hoverService = hoverService;
    this.clickService = clickService;
  }

  resolve() {
    return new Promise(resolve => {
      for (let i = 0; i < this.labels.length; i++) {
        const opts = this.computeCords(i);
        this.peakCords.push(opts);
        this.drawPeakWithDelay(opts, i,this.delayRatio * i);
      }

      setTimeout(() => resolve(this), this.delayRatio * this.labels.length);
    });


  }

  setActive(index) {
    this.peakCords.forEach(p => {
      this.shaper.drawDot(p.x, p.y, this.peakRadius, COLORS.peak);
    });

    const active = this.peakCords[index];
    if (!active) {
      return console.warn('not exist');
    }

    this.active = active;
    this.shaper.drawDot(active.x, active.y, this.peakRadius, COLORS.red)
  }

  onClick(handler) {
    this.clickHandlers.push(handler);
  }

  destroy() {
    this.hoverHandlers.forEach(h => this.hoverService.removeHandler(h));
    this.clickHandlers.forEach(h => this.clickService.removeHandler(h))

    this.hoverHandlers = [];
    this.clickHandlers = [];
  }

   drawPeakWithDelay(opts, index, delay = 0) {
    setTimeout(() => this.drawPeak(opts, index), delay)
  }

   drawPeak(peak, index) {
    animate({
      draw: progress => this.shaper.drawDot(peak.x, peak.y, this.peakRadius * progress, COLORS.peak),
      duration: 600,
      timing: easeInOutQuint,
      onDone: () => {
        this.drawLabel(peak);
        this.addHover(peak);
        this.addClick(peak, index)
      }
    })
  }

   addHover(peak) {
    const {x, y} = peak;

    const handler = (hovered) => {
      if (peak === this.active) {
        return this.shaper.drawDot(x, y, this.peakRadius, COLORS.red)
      }

      if (hovered) {
        return animate({
          draw: t => this.shaper.drawDot(x, y, t * this.peakRadius, COLORS.dot),
          duration: 300,
          timing: easeInCubic
        });
      }

      animate({
        draw: t => this.shaper.drawDot(x, y, t * this.peakRadius, COLORS.peak),
        duration: 300,
        timing: easeInCubic
      });
    };
    this.hoverHandlers.push(handler);

    this.hoverService.addHandler([{
      area: this.computeClickArea(peak),
      handler
    }])
  }

   addClick(peak, index) {
    this.clickService.addHandler([{
      area: this.computeClickArea(peak),
      handler: (clicked) => {
        if (clicked) {
          this.clickHandlers.forEach(h => h(index, peak.label))
        }
      }
    }])
  }

   computeClickArea({x, y}) {
    return {
      x0: (x - this.peakRadius - HoverService.padding) / mainOpts.dpiMultiplier,
      x1: (x + this.peakRadius + HoverService.padding) / mainOpts.dpiMultiplier,
      y0: (y - this.peakRadius - HoverService.padding) / mainOpts.dpiMultiplier,
      y1: (y + this.peakRadius + HoverService.padding) / mainOpts.dpiMultiplier
    }
  }

   drawLabel({x, y, label}) {
    animate({
      timing: linear,
      duration: 100,
      draw: progress => this.shaper.drawText(
        x - 35,
        y + 50,
        `${label}`,
        `${30 * progress}px Arial`,
        COLORS.text,
        COLORS.white
      )
    })
  }

   computeCords(index) {
    const _opts = this.pathCords[(index + 1) * this.dotsSkipped];
    _opts.label = this.labels[index];

    return _opts
  }
}
