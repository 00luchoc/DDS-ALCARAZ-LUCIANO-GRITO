import { useListaDeCompras } from '../../hooks/useListaDeCompras';
import { Contenedor } from '../../components/contenedores/Contenedor';
import { TituloDeLaPagina } from '../../components/contenidos/TituloDeLaPagina';
import { FormularioParaAgregarUnNuevoComponente } from '../../components/contenidos/FormularioParaAgregarUnNuevoComponente';
import { ListaDeCompras } from '../../components/contenedores/ListaDeCompras';

export default function App() {
  const {
    items,
    textoNuevo,
    establecerTextoNuevo,
    agregarItem,
    alternarItem,
    sacarItem,
  } = useListaDeCompras();

  return (
    <Contenedor>
      <TituloDeLaPagina />
      <FormularioParaAgregarUnNuevoComponente
        texto={textoNuevo}
        alAgregarItem={agregarItem}
        alIntroducirTexto={establecerTextoNuevo}
      />
      <ListaDeCompras
        items={items}
        alAlternar={alternarItem}
        alSacar={sacarItem}
      />
    </Contenedor>
  );
}