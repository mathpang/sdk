export function sliceUnderPoint(x: number, n: number, m: number) {
  if (Number.isInteger(x)) {
    return 0;
  }

  return +(x.toFixed(m).split(".").pop() || "").slice(n - 1);
}
