//zooped off https://www.30secondsofcode.org/js/s/hsl-to-rgb
export const HSLToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return (
    "rgb(" +
    (255 * f(0)).toFixed(0) +
    "," +
    (255 * f(8)).toFixed(0) +
    "," +
    (255 * f(4)).toFixed(0) +
    ")"
  );
};
