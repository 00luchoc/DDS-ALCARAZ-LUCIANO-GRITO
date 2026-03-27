import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import {
    AMPLITUD_MAXIMA_TEMBLOR,
    AMPLITUD_MINIMA_TEMBLOR,
    INTENTOS_MAXIMOS_DE_UBICACION,
    MARGEN_ENTRE_PALABRAS_PX,
    PALABRAS_DE_ANSIEDAD,
    RADIO_MAXIMO_ORBITAL_PX,
    RADIO_MINIMO_ORBITAL_PX,
    TAMANO_BASE_PALABRA_PX,
    TAMANO_MAXIMO_PALABRA_PX,
} from '../../constants/ansiedad';

import { PalabraAnsiosa } from '../contenidos/PalabraAnsiosa';
import { PalabraCentral } from '../contenidos/PalabraCentral';

const { width: ANCHO_PANTALLA, height: ALTO_PANTALLA } = Dimensions.get('window');
const CENTRO_X = ANCHO_PANTALLA / 2;
const CENTRO_Y = ALTO_PANTALLA / 2;

type PropsDeContenedorDeAnsiedad = {
  nivelDeIntensidad: number;
};

type DatosDePalabraUbicada = {
  texto:             string;
  x:                 number;
  y:                 number;
  tamaño:            number;
  amplitudDeTemblor: number;
};

function calcularDistanciaRelativa(radio: number): number {
  const rango = RADIO_MAXIMO_ORBITAL_PX - RADIO_MINIMO_ORBITAL_PX;
  return Math.min(Math.max((radio - RADIO_MINIMO_ORBITAL_PX) / rango, 0), 1);
}

function calcularTamañoPorDistancia(distanciaRelativa: number): number {
  const rango = TAMANO_MAXIMO_PALABRA_PX - TAMANO_BASE_PALABRA_PX;
  return TAMANO_BASE_PALABRA_PX + distanciaRelativa * rango;
}

function calcularAmplitudPorDistancia(distanciaRelativa: number): number {
  const rango = AMPLITUD_MAXIMA_TEMBLOR - AMPLITUD_MINIMA_TEMBLOR;
  return AMPLITUD_MINIMA_TEMBLOR + distanciaRelativa * rango;
}

function estimarAnchoDeTexto(texto: string, tamaño: number): number {
  return texto.length * tamaño * 0.58;
}

function estimarAltoDeTexto(tamaño: number): number {
  return tamaño * 1.3;
}

function seSuperponen(
  ax: number, ay: number, aAncho: number, aAlto: number,
  bx: number, by: number, bAncho: number, bAlto: number,
): boolean {
  return !(
    ax + aAncho + MARGEN_ENTRE_PALABRAS_PX < bx ||
    bx + bAncho + MARGEN_ENTRE_PALABRAS_PX < ax ||
    ay + aAlto  + MARGEN_ENTRE_PALABRAS_PX < by ||
    by + bAlto  + MARGEN_ENTRE_PALABRAS_PX < ay
  );
}

function colisionaConPalabrasExistentes(
  x:                  number,
  y:                  number,
  ancho:              number,
  alto:               number,
  palabrasUbicadas:   DatosDePalabraUbicada[],
): boolean {
  return palabrasUbicadas.some(existente => {
    const anchoExistente = estimarAnchoDeTexto(existente.texto, existente.tamaño);
    const altoExistente  = estimarAltoDeTexto(existente.tamaño);
    return seSuperponen(x, y, ancho, alto, existente.x, existente.y, anchoExistente, altoExistente);
  });
}

function estaFueraDePantalla(
  x: number, y: number, ancho: number, alto: number,
): boolean {
  return x < 0 || x + ancho > ANCHO_PANTALLA || y < 0 || y + alto > ALTO_PANTALLA;
}

function calcularPosicionAleatoria(): { angulo: number; radio: number } {
  return {
    angulo: Math.random() * 2 * Math.PI,
    radio:  RADIO_MINIMO_ORBITAL_PX +
            Math.random() * (RADIO_MAXIMO_ORBITAL_PX - RADIO_MINIMO_ORBITAL_PX),
  };
}

function ubicarPalabraSinSuperposicion(
  texto:            string,
  palabrasUbicadas: DatosDePalabraUbicada[],
): DatosDePalabraUbicada | null {
  for (let intento = 0; intento < INTENTOS_MAXIMOS_DE_UBICACION; intento++) {
    const { angulo, radio } = calcularPosicionAleatoria();

    const distanciaRelativa  = calcularDistanciaRelativa(radio);
    const tamaño             = calcularTamañoPorDistancia(distanciaRelativa);
    const amplitudDeTemblor  = calcularAmplitudPorDistancia(distanciaRelativa);

    const x     = CENTRO_X + Math.cos(angulo) * radio;
    const y     = CENTRO_Y + Math.sin(angulo) * radio;
    const ancho = estimarAnchoDeTexto(texto, tamaño);
    const alto  = estimarAltoDeTexto(tamaño);

    if (estaFueraDePantalla(x, y, ancho, alto)) continue;
    if (colisionaConPalabrasExistentes(x, y, ancho, alto, palabrasUbicadas)) continue;

    return { texto, x, y, tamaño, amplitudDeTemblor };
  }

  return null;
}

function calcularCantidadDePalabrasVisibles(nivel: number): number {
  return Math.floor(nivel * PALABRAS_DE_ANSIEDAD.length);
}

export function ContenedorDeAnsiedad({ nivelDeIntensidad }: PropsDeContenedorDeAnsiedad) {
  const [palabrasUbicadas, setPalabrasUbicadas] = useState<DatosDePalabraUbicada[]>([]);

  const cantidadDePalabrasVisibles = calcularCantidadDePalabrasVisibles(nivelDeIntensidad);

  useEffect(() => {
    setPalabrasUbicadas(prev => {
      // Reducir palabras cuando baja la intensidad
      if (cantidadDePalabrasVisibles < prev.length) {
        return prev.slice(0, cantidadDePalabrasVisibles);
      }

      // Agregar nuevas palabras con posición aleatoria sin superposición
      if (cantidadDePalabrasVisibles > prev.length) {
        const nuevas = [...prev];

        for (let i = prev.length; i < cantidadDePalabrasVisibles; i++) {
          const palabra  = PALABRAS_DE_ANSIEDAD[i];
          const ubicacion = ubicarPalabraSinSuperposicion(palabra, nuevas);

          if (ubicacion) nuevas.push(ubicacion);
        }

        return nuevas;
      }

      return prev;
    });
  }, [cantidadDePalabrasVisibles]);

  return (
    <View style={estilos.contenedor}>

      {palabrasUbicadas.map(datos => (
        <PalabraAnsiosa
          key={datos.texto}
          texto={datos.texto}
          posicionX={datos.x}
          posicionY={datos.y}
          tamaño={datos.tamaño}
          amplitudDeTemblor={datos.amplitudDeTemblor}
        />
      ))}

      {/* "silencio" siempre al centro, se desvanece y achica con la intensidad */}
      <View style={estilos.contenedorCentral}>
        <PalabraCentral nivelDeIntensidad={nivelDeIntensidad} />
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex:            1,
    backgroundColor: 'black',
  },
  contenedorCentral: {
    position: 'absolute',
    left:     CENTRO_X - 55,
    top:      CENTRO_Y - 20,
  },
});