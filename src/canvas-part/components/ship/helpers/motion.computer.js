import { ShapeService } from '../../../services/shape.service';

export class MotionComputer {
  currDotCord;
  rotate = 0;

  constructor(pathCords, initDotIndex = 0) {
    this.pathCords = pathCords;
    this.initDotIndex = initDotIndex;
    this.currDotCord = this.pathCords[initDotIndex];
    this.rotate = this.computeAngle(this.currDotCord, this.pathCords[initDotIndex + 1]);
  }

  computeNextCord() {
    const i = this.pathCords.findIndex(c => c === this.currDotCord);
    const next = this.pathCords[i + 1];
    this.setCord(next);
  }

  computePrevCord() {
    const i = this.pathCords.findIndex(c => c === this.currDotCord);
    const prev = this.pathCords[i - 1];
    this.setCord(prev);
  }

  setCord(cord) {
    if (!cord) return console.warn('end of the part');
    this.rotate = this.computeAngle(this.currDotCord, cord);
    this.currDotCord = cord;
  }

  computeAngle(from, to) {
    const { cathetY, cathetX, rotateDirection } = this.computeTrangleAndDirection(from ,to);
    const gyp = Math.sqrt(Math.pow(cathetX, 2) + Math.pow(cathetY, 2));
    const sin = cathetY / gyp;
    const rads = Math.asin(sin) * rotateDirection;
    return -Math.ceil((rads / ShapeService.radianMulti))
  }

  computeTrangleAndDirection(from, to) {
    const xDelta = from.x - to.x;
    const yDelta = from.y - to.y;
    const cathetX = Math.abs(xDelta);
    const cathetY = Math.abs(yDelta);
    const shouldChangeRotateDir = (xDelta < 0 && yDelta > 0) || (xDelta > 0 && yDelta < 0);

    return {
      cathetX,
      cathetY,
      rotateDirection: shouldChangeRotateDir ? 1 : -1 // 1 is means that real peak of triangle tend to top, -1 means that real peak tends to bottom
    }
  }
}
