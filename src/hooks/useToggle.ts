import { useState } from 'react';

export function useToggle(inicial = false) {
  const [valor, setValor] = useState(inicial);

  const alternar = () => setValor(v => !v);

  return [valor, alternar] as const;
}
