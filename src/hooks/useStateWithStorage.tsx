import { useEffect, useState, useRef } from 'react';

export default function useStateWithStorage(
  key: string,
  defaultValue: unknown,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  const updateStorageTotal = (total: number) => {
    localStorage.setItem(key, total.toString());

    setState(total);
  };

  return [state, updateStorageTotal];
}
