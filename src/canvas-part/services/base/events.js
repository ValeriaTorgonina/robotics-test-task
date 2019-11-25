export class MouseEventService {
  handlers = [];
  isAnyHovered;

  constructor(
     canvasEl,
     evt
  ) {
    this.canvasEl = canvasEl;
    this.evt = evt;
    this.canvasEl.addEventListener(evt, this.callback)
  }

  addHandler(handlers) {
    this.handlers = [...this.handlers, ...handlers];
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter(h => h === handler);
  }

  removeAllHandlers() {
    this.handlers = [];
  }

  destroy() {
    this.removeAllHandlers();
    this.canvasEl.removeEventListener(this.evt, this.callback)
  }

   callback = (e) => {
    const {left, top} = this.canvasEl.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    for (let i = 0; i < this.handlers.length; i++) {
      const {area, handler} = this.handlers[i];
      const hovered = this.checkAreaHovered(area, x, y);
      if (hovered) this.isAnyHovered = true;

      handler(hovered, e);
    }

    if (this.isAnyHovered) {
      this.canvasEl.style.cursor = 'pointer';
      this.isAnyHovered = false
    } else {
      this.canvasEl.style.cursor = 'default';
    }
  };

   checkAreaHovered(area, x, y) {
    return (area.x0 <= x && area.x1 >= x) && (area.y0 <= y && area.y1 >= y)
  }


  static padding = 20;
}
