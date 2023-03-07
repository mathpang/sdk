export function factorial(n: number): number {
  if (n < 0) {
    throw new Error("n must positive number in factorial(n: number)");
  }

  if (n == 1 || n == 0) {
    return 1;
  }

  return factorial(n - 1) * n;
}
