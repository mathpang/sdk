import { useCallback, useState } from "react";

export function useReducedQuery<
  QueryVariables extends Record<string, unknown>,
  QueryResponse extends Record<string, unknown>
>({
  fireQuery,
  variableReducer,
  delay = 500,
}: {
  fireQuery: (v: QueryVariables) => Promise<{ data: QueryResponse }>;
  variableReducer: (prev: QueryVariables) => QueryVariables;
  delay?: number;
}) {
  const [timer, setTimer] = useState<number | null>(null);
  const [variables, setVariables] = useState<QueryVariables | null>(null);
  const [data, setData] = useState<QueryResponse | null>(null);

  const fire = useCallback(
    (v: QueryVariables) => {
      setVariables((prev) => variableReducer(prev ? { ...prev, ...v } : v));

      if (timer) {
        clearTimeout(timer);
      }

      setTimer(
        +setTimeout(() => {
          fireQuery(v).then(({ data }) => setData(data));
          setTimer(null);
          setVariables(null);
        }, delay)
      );
    },
    [delay, timer]
    // `fireQuery`, `variableReducer` are not dependencies because they should be
    // guaranteed to be stable.
  );

  return [
    fire,
    {
      fire,
      data,
      variables,
    },
  ];
}
