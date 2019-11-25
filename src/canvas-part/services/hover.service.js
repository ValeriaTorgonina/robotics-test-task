import { MouseEventService } from './base/events';

export class HoverService extends MouseEventService{
  constructor(canvasEl) {
    super(canvasEl, 'mousemove')
  }
}
