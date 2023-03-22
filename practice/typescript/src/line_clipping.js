const xmin = 100;
const ymin = 100;
const xmax = 500;
const ymax = 500;

window.onload = canvas;

function Line(x1, x2, y1, y2) {
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
}
function canvas() {
  const lines = [
    {x1: -10, x2: 0,  y1: 12, y2: 20}
  ]

  const c = document.getElementById('canvas');
  if (c && c.getContext('2d')) {
    const ctx = c.getContext('2d');
    ctx.strokeStyle = "red";
    ctx.strokeRect(xmin, ymin, xmax, ymax);
        
  }
}

/* Cohen Sutherland Implementation */

const INSIDE = 0;
const LEFT = 1;
const RIGHT = 2;
const BOTTOM = 3;
const TOP = 4;

function computeOutCode(x, y) {
  let code = INSIDE;

  if (x < xmin) {
    code |= LEFT;
  } else if (x > xmax) {
    code |= RIGHT;
  }
  if (y < ymin) {
    code |= BOTTOM;
  } else if (y > ymax) {
    code |= TOP;
  }

  return code;
}

function CohenSutherlandLineClip(x0, y0, x1, y1) {
  let outcode0 = computeOutCode(x0, y0);
  let outcode1 = computeOutCode(x1, y1);
  let accept = false;

  while (true) {
    if (!(outcode0 | outcode1)) {
      accept = true;
      break;
    } else if (outcode0 & outcode1) break;
    else {
      let x, y;
      const outcodeOut = outcode1 > outcode0 ? outcode1 : outcode0;
      if (outcodeOut & TOP) {
        x = x0 + ((x1 - x0) * (ymax - y0)) / (y1 - y0);
        y = ymax;
      } else if (outcodeOut & BOTTOM) {
        x = x0 + ((x1 - x0) * (ymin - y0)) / (y1 - y0);
        y = ymin;
      } else if (outcodeOut & RIGHT) {
        y = y0 + ((y1 - y0) * (xmax - x0)) / (x1 - x0);
        x = xmax;
      } else if (outcodeOut & LEFT) {
        y = y0 + ((y1 - y0) * (xmin - x0)) / (x1 - x0);
        x = xmin;
      }

      if (outcodeOut === outcode0) {
        x0 = x;
        y0 = y;
        outcode0 = computeOutCode(x0, y0);
      } else {
        x1 = x;
        y1 = y;
        outcode1 = computeOutCode(x1, y1);
      }
    }
  }
  return accept;
}