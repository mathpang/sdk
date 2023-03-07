export function sliceUnderPoint(x: number, n: number, m: number) {
  return +(x.toFixed(m).split(".").pop() || "").slice(n - 1);
}
