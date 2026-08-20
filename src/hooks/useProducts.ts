import { useState, useEffect } from 'react';
import { getProductos } from '../api/tiendaApi';
import type { Producto } from '../types/tienda';
import { useDebounce } from './useDebounce';

export function useProducts(termino: string) {
  const terminoDiferido = useDebounce(termino);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignorar = false;

    setCargando(true);
    setError(null);

    getProductos(terminoDiferido)
      .then(data => {
        if (!ignorar) {
          setProductos(data);
          setCargando(false);
        }
      })
      .catch(err => {
        if (!ignorar) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
          setCargando(false);
        }
      });

    return () => {
      ignorar = true;
    };
  }, [terminoDiferido]);

  return { productos, cargando, error };
}
