import { Pressable, Text, StyleSheet } from 'react-native';
import { Item } from '../../hooks/useListaDeCompras';

type Props = { 
  item: Item;
  alPresionar: () => void;
  alMantenerPresionado: () => void;
};

export const TarjetaParaItemDeCompra = ({ item, alPresionar, alMantenerPresionado }: Props) => (
  <Pressable
    onPress={alPresionar}
    onLongPress={alMantenerPresionado}
    style={styles.row}
  >
    <Text style={[styles.rowText, item.estáComprado && styles.done]}>
      {item.nombre}
    </Text>
    <Text style={[styles.pill, item.estáComprado ? styles.pillDone : styles.pillTodo]}>
      {item.estáComprado ? '✔' : '•'}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: { fontSize: 16 },
  done: { textDecorationLine: 'line-through', color: '#999' },
  pill: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
  },
  pillTodo: { backgroundColor: '#eee', color: '#666' },
  pillDone: { backgroundColor: '#2ecc71', color: '#fff' },
});