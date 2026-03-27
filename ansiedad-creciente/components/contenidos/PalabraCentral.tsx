import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { TAMANO_PALABRA_CENTRAL_PX } from '../../constants/ansiedad';

type PropsDePalabraCentral = {
  nivelDeIntensidad: number;
};

const TAMANO_MINIMO_PALABRA_CENTRAL_PX = 8;

export function PalabraCentral({ nivelDeIntensidad }: PropsDePalabraCentral) {
  const opacidadAnimada = useRef(new Animated.Value(1)).current;
  const tamañoAnimado   = useRef(new Animated.Value(TAMANO_PALABRA_CENTRAL_PX)).current;

  useEffect(() => {
    const tamañoObjetivo =
      TAMANO_PALABRA_CENTRAL_PX -
      nivelDeIntensidad * (TAMANO_PALABRA_CENTRAL_PX - TAMANO_MINIMO_PALABRA_CENTRAL_PX);

    Animated.parallel([
      Animated.timing(opacidadAnimada, {
        toValue:         1 - nivelDeIntensidad,
        duration:        200,
        useNativeDriver: false, // false porque fontSize no soporta native driver
      }),
      Animated.timing(tamañoAnimado, {
        toValue:         tamañoObjetivo,
        duration:        200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [nivelDeIntensidad]);

  return (
    <Animated.Text
      style={[
        estilos.palabraCentral,
        {
          opacity:  opacidadAnimada,
          fontSize: tamañoAnimado,
        },
      ]}
    >
      silencio
    </Animated.Text>
  );
}

const estilos = StyleSheet.create({
  palabraCentral: {
    color:      'white',
    fontWeight: 'bold',
    textAlign:  'center',
  },
});