/**
 * Based on preset height and width, a polygon is generated based on the appropriate ratio
 * */
function generate(w, h, sw) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  svg.setAttribute('viewBox', `0 0 ${h} ${w}`);
  path.setAttribute('height', '100%');
  path.setAttribute('width', '100%');
  path.setAttribute('stroke', '#363842');
  path.setAttribute('stroke-width', sw);
  path.setAttribute('fill', 'none');

  svg.appendChild(path);
  return svg;
}

function drawInlineSVG(svgElement) {
  return new Promise(((resolve) => {
    const svgURL = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();
    img.onload = function () {
      resolve(this);
    };
    img.src = 'data:image/svg+xml; charset=utf8,' + encodeURIComponent(svgURL);
  }));
}

/**
 * Draw Mask
 * @param h - canvas height
 * @param w - canvas width
 * @param mw - svg stroke width for mask
 */
export default async function (h, w, mw = 10) {
  return drawInlineSVG(generate(h, w, mw));
}
