import { useForceRerender } from "./useForceRerender";
import { useReducedQuery } from "./useReducedQuery";

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

  /**
   * Fires a query after a delay, and reduces the variables passed to the query
   *
   * @example
   * ```
   * const [fireQuery, { data }] = useReducedQuery({
   *  fireQuery: (v: { quantity: number }) => fetch("/api/buy-items", { method: "POST", body: JSON.stringify(v) }),
   *  delay: 500,
   *  reduceVariables: (v) => ({
   *    quantity: v.quantity + 1,
   *  }),
   * });
   *
   * useEffect(() => {
   *   if (data) {
   *    console.log("Bought items", data);
   *   }
   * }, [data]);
   *
   * return (
   *   <button
   *    onClick={() => fireQuery({ quantity: 1 })}
   *   />
   * );
   * ```
   *
   * If the user clicks the button faster, the query will only be fired once with
   * the latest variables.
   * `data` will be `null` until the query is fired.
   * And `data` will be filled with the response of the query after it is fired.
   */
  useReducedQuery,
} as const;
