import { COLORS } from '../configs/colors';

export class TestOfDrawingDrawer {
   width = 120; // picture's width according to canvas-scaling
   height = 60; // picture's height according to canvas-scaling
   cords = {x: 0, y: 300};
   rotate = 0;

  constructor(
     shaper
  ) {
    this.shaper = shaper;
  }

   image = new Image();

  downloadImage() {
    return new Promise(resolve => {
      this.image.onload = () => {
        this.move({
          y: 300,
          x: 0
        });
        resolve(this);
        this.image.onload = null
      };
      this.image.src = './ship.png'
    });
  }

  move(cords, rotate = 0) {
    this.clean();
    this.shaper.drawImage(cords.x, cords.y, this.image, this.width, this.height, COLORS.white, rotate);
    this.cords = cords;
    this.rotate = rotate
  }

   clean() {
    const inaccuracy = 1;
    this.shaper.drawRect(
      this.cords.x - inaccuracy,
      this.cords.y - inaccuracy,
      this.width + 2 * inaccuracy,
      this.height + 2 * inaccuracy,
      COLORS.white,
      this.rotate
    );
  }
}
