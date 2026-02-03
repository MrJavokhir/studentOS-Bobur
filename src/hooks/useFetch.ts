import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions<T> {
  initialData?: T;
  dependencies?: any[];
}

interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  refetch: () => void;
}

export function useFetch<T>(
  fetcher: () => Promise<{ data?: T; error?: string }>,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(options.initialData ?? null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const result = await fetcher();

      if (isMounted) {
        if (result.error) {
          setError(result.error);
          setData(null);
        } else {
          setData(result.data ?? null);
        }
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [refetchIndex, ...(options.dependencies || [])]);

  return { data, error, isLoading, refetch };
}

// Mutation hook for POST/PATCH/DELETE operations
interface UseMutationReturn<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<{ data?: TData; error?: string }>;
  data: TData | null;
  error: string | null;
  isLoading: boolean;
  reset: () => void;
}

export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<{ data?: TData; error?: string }>
): UseMutationReturn<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (variables: TVariables) => {
    setIsLoading(true);
    setError(null);

    const result = await mutationFn(variables);

    if (result.error) {
      setError(result.error);
      setData(null);
    } else {
      setData(result.data ?? null);
    }
    setIsLoading(false);

    return result;
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return { mutate, data, error, isLoading, reset };
}
