import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  alCompletarFormulario: (nombre: string) => void;
}

export function FormularioParaItemNuevo({ alCompletarFormulario }: Props) {
  const [nombre, setNombre] = useState('');

  const manejarEnvio = () => {
    const textoLimpio = nombre.trim();
    if (textoLimpio !== '') {
      alCompletarFormulario(textoLimpio);
      setNombre('');
    }
  };

  return (
    <View style={styles.inputRow}>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Agregar producto (ej: Leche)"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={manejarEnvio}
      />
      <Pressable style={styles.addBtn} onPress={manejarEnvio}>
        <Text style={styles.addTxt}>Agregar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: { flexDirection: 'row', gap: 8, marginTop: 5 },
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