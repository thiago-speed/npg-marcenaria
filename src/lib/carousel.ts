/** Keep the same visual position inside a repeated gallery, in either direction. */
export function wrapCarouselOffset(offset: number, width: number) {
  if (width <= 0) return 0;
  return offset - Math.ceil(offset / width) * width;
}
