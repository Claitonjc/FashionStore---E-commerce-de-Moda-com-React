import { useEffect, useState } from "react";

export const useFetch = (callback, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const resposta = await callback();
        setData(resposta);
        setLoading(false);
      } catch (erro) {
        setError(erro.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, dependencies);
  return { data, loading, error, setLoading };
};
