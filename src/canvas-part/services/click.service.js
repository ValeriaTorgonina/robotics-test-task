import { MouseEventService } from './base/events';

export class ClickService extends MouseEventService {
  constructor(el) {
    super(el, 'click');
  }
}
