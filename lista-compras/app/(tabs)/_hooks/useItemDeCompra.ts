import { useState } from 'react';
import { Item } from '../_tipos/item';
import { usarItemsDeCompra } from './useListaDeCompras';

export const useItemDeCompra = () => {
  const [items, establecerItems] = useState<Item[]>([]);

  const agregarItem = (nombre: string) => {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) return;

    const nuevoItem: Item = {
      id: String(Date.now()),
      nombre: nombreLimpio,
      estáComprado: false,
    };

    establecerItems((prev) => [...prev, nuevoItem]);
  };

  const cambiarItem = (id: string) => {
    establecerItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, estáComprado: !it.estáComprado } : it
      )
    );
  };

  const eliminarItem = (id: string) => {
    establecerItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items,
    agregarItem,
    cambiarItem,
    eliminarItem,
  };
};

export default useItemDeCompra;