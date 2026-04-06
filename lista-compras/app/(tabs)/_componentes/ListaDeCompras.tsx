import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Item } from '../_tipos/item';
import { TarjetaParaItemDeCompra } from './TarjetaParaItemDeCompra';

export const ListaDeCompras = ({
  items,
  alPresionarSobreUnItem,
  alMantenerPresionSobreUnItem,
}: {
  items: Item[];
  alPresionarSobreUnItem: (id: string) => void;
  alMantenerPresionSobreUnItem: (id: string) => void;
}) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(it) => it.id}
      renderItem={({ item }) => (
        <TarjetaParaItemDeCompra
          item={item}
          alPresionar={() => alPresionarSobreUnItem(item.id)}
          alMantenerPresionado={() => alMantenerPresionSobreUnItem(item.id)}
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