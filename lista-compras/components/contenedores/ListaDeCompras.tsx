import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Item } from '../../hooks/useListaDeCompras';
import { TarjetaParaItemDeCompra } from '../contenidos/TarjetaParaItemDeCompra';

export const ListaDeCompras = ({
  items,
  alAlternar,
  alSacar,
}: {
  items: Item[];
  alAlternar: (id: string) => void;
  alSacar: (id: string) => void;
}) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={({ item }) => (
        <TarjetaParaItemDeCompra
          item={item}
          alPresionar={() => alAlternar(item.id)}
          alMantenerPresionado={() => alSacar(item.id)}
        />
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>Sin productos. ¡Agregá el primero! 😊</Text>
      }
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  );
};

const styles = StyleSheet.create({
  sep: { height: 1, backgroundColor: '#eee' },
  empty: { textAlign: 'center', color: '#777', marginTop: 24 },
});