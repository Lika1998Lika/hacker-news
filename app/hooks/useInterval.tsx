import { useEffect, useRef } from 'react';

type CallbackFunction = () => void;

export default function useInterval(callback: CallbackFunction, delay: number | null): void {
  const savedCallback = useRef<CallbackFunction | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}
