import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { DURACION_DE_TEMBLOR_MS } from '../../constants/ansiedad';

type PropsDePalabraAnsiosa = {
  texto:             string;
  posicionX:         number;
  posicionY:         number;
  tamaño:            number;
  amplitudDeTemblor: number;
};

export function PalabraAnsiosa({
  texto,
  posicionX,
  posicionY,
  tamaño,
  amplitudDeTemblor,
}: PropsDePalabraAnsiosa) {
  const opacidadAnimada     = useRef(new Animated.Value(0)).current;
  const desplazamientoX     = useRef(new Animated.Value(0)).current;
  const desplazamientoY     = useRef(new Animated.Value(0)).current;
  const animacionTemblorRef = useRef<Animated.CompositeAnimation | null>(null);

  // Fade-in al aparecer
  useEffect(() => {
    Animated.timing(opacidadAnimada, {
      toValue:         1,
      duration:        400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Temblor en loop: la amplitud viene del contenedor según distancia al centro
  useEffect(() => {
    animacionTemblorRef.current?.stop();

    const valorAleatorio = () => (Math.random() * 2 - 1) * amplitudDeTemblor;

    animacionTemblorRef.current = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(desplazamientoX, {
            toValue:         valorAleatorio(),
            duration:        DURACION_DE_TEMBLOR_MS,
            useNativeDriver: true,
          }),
          Animated.timing(desplazamientoY, {
            toValue:         valorAleatorio(),
            duration:        DURACION_DE_TEMBLOR_MS,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(desplazamientoX, {
            toValue:         valorAleatorio(),
            duration:        DURACION_DE_TEMBLOR_MS,
            useNativeDriver: true,
          }),
          Animated.timing(desplazamientoY, {
            toValue:         valorAleatorio(),
            duration:        DURACION_DE_TEMBLOR_MS,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(desplazamientoX, {
            toValue:         0,
            duration:        DURACION_DE_TEMBLOR_MS,
            useNativeDriver: true,
          }),
          Animated.timing(desplazamientoY, {
            toValue:         0,
            duration:        DURACION_DE_TEMBLOR_MS,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    animacionTemblorRef.current.start();

    return () => { animacionTemblorRef.current?.stop(); };
  }, [amplitudDeTemblor]);

  return (
    <Animated.Text
      style={[
        estilos.palabraAnsiosa,
        {
          left:      posicionX,
          top:       posicionY,
          fontSize:  tamaño,
          opacity:   opacidadAnimada,
          transform: [
            { translateX: desplazamientoX },
            { translateY: desplazamientoY },
          ],
        },
      ]}
    >
      {texto}
    </Animated.Text>
  );
}

const estilos = StyleSheet.create({
  palabraAnsiosa: {
    position:   'absolute',
    color:      'red',
    fontWeight: 'bold',
  },
});