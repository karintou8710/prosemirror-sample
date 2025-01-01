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
