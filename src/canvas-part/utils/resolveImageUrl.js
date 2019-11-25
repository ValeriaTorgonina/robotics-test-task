export function resolveImageUrl(img, url) {
  return new Promise(resolve => {
    img.onload = () => {
      resolve();
      img.onload = null
    };
    img.src = url
  });
}
