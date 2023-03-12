import { useForceRerender } from "./useForceRerender";

export const ReactHooks = {
  /**
   * Forces a rerender of the component
   * @returns {Function} A function that forces a rerender of the component
   *
   * @example
   * ```
   * const forceRerender = useForceRerender();
   *
   * useEffect(() => {
   *  forceRerender();
   * }, [someDependency]);
   * ```
   */
  useForceRerender,
} as const;
