import { useState } from 'react';

export type Item = {
  id: string;
  nombre: string;
  estáComprado: boolean;
};

export const useListaDeCompras = () => {
  const [items, establecerItem] = useState<Item[]>([]);
  const [textoNuevo, establecerTextoNuevo] = useState('');

  const agregarItem = () => {
    const textoLimpio = textoNuevo.trim();
    if (!textoLimpio) return;
    establecerItem((estadoAnterior) => [
      ...estadoAnterior,
      { id: String(Date.now()), nombre: textoLimpio, estáComprado: false },
    ]);
    establecerTextoNuevo('');
  };

  const alternarItem = (id: string) => {
    establecerItem((estadoAnterior) =>
      estadoAnterior.map((it) => (it.id === id ? { ...it, estáComprado: !it.estáComprado } : it)),
    );
  };

  const sacarItem = (id: string) => {
    establecerItem((estadoAnterior) => estadoAnterior.filter((it) => it.id !== id));
  };

  return {
    items,
    textoNuevo,
    establecerTextoNuevo,
    agregarItem,
    alternarItem,
    sacarItem,
  };
};