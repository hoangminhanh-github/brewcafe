import React, { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDeBounceValue] = useState(value);
  useEffect(() => {
    const timeOut = setTimeout(() => setDeBounceValue(value), delay);
    return () => {
      clearTimeout(timeOut);
    };
  }, [value]);
  return debounceValue;
};

export default useDebounce;
