import { useState, useEffect } from 'react';

export function useDebounce<T>(valor: T, retardo = 400): T {
  const [valorDiferido, setValorDiferido] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDiferido(valor);
    }, retardo);

    return () => clearTimeout(timer);
  }, [valor, retardo]);

  return valorDiferido;
}
