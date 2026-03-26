import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export const FormularioParaAgregarUnNuevoComponente = ({
  texto,
  alIntroducirTexto,
  alAgregarItem,
}: {
  texto: string;
  alIntroducirTexto: (text: string) => void;
  alAgregarItem: () => void;
}) => {
  return (
    <View style={styles.inputRow}>
      <TextInput
        value={texto}
        onChangeText={alIntroducirTexto}
        placeholder="Agregar producto (ej: Leche)"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={alAgregarItem}
      />
      <Pressable style={styles.addBtn} onPress={alAgregarItem}>
        <Text style={styles.addTxt}>Agregar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTxt: { color: '#fff', fontWeight: '600' },
});