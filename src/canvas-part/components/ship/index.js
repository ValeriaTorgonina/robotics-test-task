import { COLORS } from '../../configs/colors';
import { repeat } from '../../utils/animate';
import { MotionComputer } from './helpers/motion.computer';
import { resolveImageUrl } from '../../utils/resolveImageUrl';
import { getPercentOf } from '../../utils/numeric';

const inaccuracy = 1; // simple padding in clean area
const rotateInaccuracy = 33; // this is a "magic" number getting in experiments with ship moving (using in getter cords);

export class ShipComponent {
  motion
  startDot = 20;
  currentPeak = -1;
  image = new Image();
  width = 120; // picture's width according to canvas-scaling
  height = 60; // picture's height according to canvas-scaling
  xOffset = getPercentOf(this.width, 80);
  yOffset = this.height + 30; // 30 is a margin from bottom;

  get cords() {
    const dotCord = this.motion.currDotCord;
    return {
      y: dotCord.y - this.yOffset - (this.motion.rotate + rotateInaccuracy) / 3, // equation getting by experiments
      x: dotCord.x - this.xOffset + (this.motion.rotate / 2) + rotateInaccuracy // equation getting by experiments
    }
  }

  constructor(
    shaper,
    pathCords,
    peakCords,
  ) {
    this.shaper = shaper;
    this.pathCords = pathCords;
    this.peakCords = peakCords;

    this.motion = new MotionComputer(this.pathCords, this.startDot);
  }

  downloadImage(url = './ship.png') {
    return resolveImageUrl(this.image, url).then(() => this)
  }

  appearance() {
    return new Promise(resolve => this.moveToPeak(0, resolve));
  }

  moveToPeak(i, onDone) {
    const peak = this.peakCords[i];
    if (!peak) {
      return console.warn(`no pick with index {${i}}`);
    }

    const direction = this.currentPeak < i; // true means next; false means prev
    const until = {done: false};

    repeat({
      until,
      fps: 50,
      draw: () => {
        until.done = this.motion.currDotCord === peak;
        if (!until.done) {
          if (direction) {
            return this.moveNextCord()
          }

          this.movePrevCord();
        }
      },
      onDone: () => {
        this.currentPeak = i;
        if (typeof onDone === 'function') onDone(this.currentPeak);
      }
    })
  }

  moveNextCord() {
    this.clean();
    this.motion.computeNextCord();
    this.move();
  }

  movePrevCord() {
    this.clean();
    this.motion.computePrevCord();
    this.move();
  }

  move() {
    this.shaper.drawImage(this.cords.x, this.cords.y, this.image, this.width, this.height, null, this.motion.rotate)
  }

  clean() {
    this.shaper.drawRect(
      this.cords.x - inaccuracy,
      this.cords.y - inaccuracy,
      this.width + 2 * inaccuracy,
      this.height + 2 * inaccuracy,
      COLORS.white,
      this.motion.rotate
    );
  }


}
