import { useState } from 'react';
import { Item } from '../_tipos/item'; // Importamos el tipo desde la nueva carpeta

export const usarItemsDeCompra = () => {
  const [items, establecerItems] = useState<Item[]>([]);

  // Cambiamos 'agregarItem' para que reciba el texto por parámetro
  const agregarItem = (nombre: string) => {
    const textoLimpio = nombre.trim();
    if (!textoLimpio) return;
    
    const nuevoItem: Item = { 
      id: String(Date.now()), 
      nombre: textoLimpio, 
      estáComprado: false 
    };

    establecerItems((estadoAnterior) => [...estadoAnterior, nuevoItem]);
  };

  // Renombramos según el estándar del profe: 'cambiarItem'
  const cambiarItem = (id: string) => {
    establecerItems((estadoAnterior) =>
      estadoAnterior.map((it) => 
        it.id === id ? { ...it, estáComprado: !it.estáComprado } : it
      )
    );
  };

  // Renombramos según el estándar del profe: 'eliminarItem'
  const eliminarItem = (id: string) => {
    establecerItems((estadoAnterior) => estadoAnterior.filter((it) => it.id !== id));
  };

  return {
    items,
    agregarItem,
    cambiarItem,   // Antes 'alternarItem'
    eliminarItem,  // Antes 'sacarItem'
  };
};

export default usarItemsDeCompra;