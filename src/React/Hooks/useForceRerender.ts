import { useCallback, useState } from "react";

export const useForceRerender = () => {
  const [, setTick] = useState(0);

  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  return update;
};
