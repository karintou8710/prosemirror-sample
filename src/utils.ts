export function isObjectEqual(o1: object, o2: object) {
  return JSON.stringify(o1) === JSON.stringify(o2);
}

export function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}

export function objectIncludes(
  object1: Record<string, any>,
  object2: Record<string, any>
): boolean {
  const keys = Object.keys(object2);

  if (!keys.length) {
    return true;
  }

  return keys.every((key) => {
    return object2[key] === object1[key];
  });
}

export async function resizeImg(img: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const bitmap = await createImageBitmap(img, {
    resizeWidth: img.clientWidth,
    resizeHeight: img.clientHeight,
  });
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("not support canvas");

  ctx.globalAlpha = 0.6;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}
