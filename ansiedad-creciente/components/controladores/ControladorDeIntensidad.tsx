import { StyleSheet, Text, View } from 'react-native';
import { useMicrofono } from '../../hooks/useMicrofono';
import { ContenedorDeAnsiedad } from '../contenedores/ContenedorDeAnsiedad';

export function ControladorDeIntensidad() {
  const { nivelDeIntensidad, tienePermiso } = useMicrofono();

  const estaEsperandoPermiso = !tienePermiso;

  if (estaEsperandoPermiso) {
    return (
      <View style={estilos.contenedorDeSinPermiso}>
        <Text style={estilos.mensajeDeSinPermiso}>
          Esta experiencia necesita acceso al micrófono.{'\n'}
          Por favor, concedé el permiso para continuar.
        </Text>
      </View>
    );
  }

  return <ContenedorDeAnsiedad nivelDeIntensidad={nivelDeIntensidad} />;
}

const estilos = StyleSheet.create({
  contenedorDeSinPermiso: {
    flex:            1,
    backgroundColor: 'black',
    justifyContent:  'center',
    alignItems:      'center',
    padding:         32,
  },
  mensajeDeSinPermiso: {
    color:      'white',
    fontSize:   18,
    textAlign:  'center',
    lineHeight: 28,
  },
});