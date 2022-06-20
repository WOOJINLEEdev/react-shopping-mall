export function getSizedImageUrl(url: string, size: string) {
  return url.slice(0, -4) + size;
}
