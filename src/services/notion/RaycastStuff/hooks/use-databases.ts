import { getDatabases } from "../operations/get-databases";
import useSWR from "swr";
import { SWRResponse } from "swr";
// import { Database } from "../types/database"; // Assuming there is a Database type

interface Database {
  id: string;
  title: string;
}

export function useDatabases() {
  const { data, error, mutate, revalidate } = useSWR<Database[], Error>(
    "databases",
    getDatabases,
  );

  return {
    databases: data || [],
    error,
    isLoading,
    mutate,
    revalidate,
  };
}
