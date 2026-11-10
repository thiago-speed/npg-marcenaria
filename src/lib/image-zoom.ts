export function clampZoom(value: number) {
  return Math.min(4, Math.max(1, value));
}

export function getImagePanBounds(width: number, height: number, imageWidth: number, imageHeight: number, zoom: number) {
  if (!width || !height || !imageWidth || !imageHeight) return { x: 0, y: 0 };
  const fit = Math.min(width / imageWidth, height / imageHeight);
  return {
    x: Math.max(0, (imageWidth * fit * zoom - width) / 2),
    y: Math.max(0, (imageHeight * fit * zoom - height) / 2),
  };
}

export function clampPan(value: number, bound: number) {
  return Math.max(-bound, Math.min(bound, value));
}
