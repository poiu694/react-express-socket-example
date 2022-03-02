import { useCallback, useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  const [localValue, setLocalValue] = useState<any>(initialValue);

  const getValue = useCallback(() => {
    const existedValue = window.localStorage.getItem(key);
    return existedValue ? (parseJSON(existedValue) as any) : initialValue;
  }, [initialValue, key]);

  const setValue = useCallback(
    (value) => {
      try {
        const nextValue = value instanceof Function ? value(localValue) : value;
        window.localStorage.setItem(key, JSON.stringify(nextValue));
        setLocalValue(nextValue);

        window.dispatchEvent(new Event('local-storage'));
      } catch (err) {
        console.warn(err);
      }
    },
    [key, localValue]
  );

  useEffect(() => {
    setLocalValue(getValue());
  }, [getValue]);

  return [localValue, setValue];
};

export default useLocalStorage;

function parseJSON(value: string | null) {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
