import {useEffect, useState} from 'react';

type LoadbleObjectType<T extends unknown> = {
  data: T | null;
  isLoading: boolean;
};

function useLoadable<T extends unknown>(
  call: () => Promise<T>,
  deps: any[] = [],
): LoadbleObjectType<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const execute = async () => {
    setIsLoading(true);
    const data = await call();
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    execute();
  }, []);

  return {
    data,
    isLoading,
  };
}

export default useLoadable;
