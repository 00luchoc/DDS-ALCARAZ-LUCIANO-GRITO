import { Contenedor } from "./_componentes/Contenedor";
import { TituloDeLaPagina } from "./_componentes/TituloDeLaPagina";
import { FormularioParaItemNuevo } from "./_componentes/FormularioParaItemNuevo";
import { ListaDeCompras } from "./_componentes/ListaDeCompras";
import { useItemDeCompra } from "./_hooks/useItemDeCompra";

export default function App() {
  const { items, eliminarItem, cambiarItem, agregarItem } = useItemDeCompra();
  return (
    <Contenedor>
      <TituloDeLaPagina />

      <ListaDeCompras
        items={items}
        alPresionarSobreUnItem={cambiarItem}
        alMantenerPresionSobreUnItem={eliminarItem}
      />

      <FormularioParaItemNuevo 
        alCompletarFormulario={agregarItem} 
      />
    </Contenedor>
  );
}