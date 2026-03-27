import { Audio } from 'expo-av';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
    FACTOR_DE_SUAVIZADO,
    INTERVALO_DE_MUESTREO_MS,
    NIVEL_MINIMO_DECIBELES,
} from '../constants/ansiedad';

function normalizarDecibeles(decibeles: number): number {
  const nivelCrudo = (decibeles - NIVEL_MINIMO_DECIBELES) / Math.abs(NIVEL_MINIMO_DECIBELES);
  return Math.max(0, Math.min(1, nivelCrudo));
}

export function useMicrofono() {
  const [nivelDeIntensidad, setNivelDeIntensidad] = useState(0);
  const [tienePermiso, setTienePermiso]           = useState(false);

  const grabacionRef           = useRef<Audio.Recording | null>(null);
  const intensidadSuavizadaRef = useRef(0);

  const solicitarPermiso = useCallback(async (): Promise<boolean> => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      setTienePermiso(granted);
      return granted;
    } catch (error) {
      console.error('Error al solicitar permiso de micrófono:', error);
      return false;
    }
  }, []);

  const alRecibirEstadoDeGrabacion = useCallback(
    (estado: Audio.RecordingStatus) => {
      if (!estado.isRecording || estado.metering === undefined) return;

      const nivelInstantaneo = normalizarDecibeles(estado.metering);

      intensidadSuavizadaRef.current =
        intensidadSuavizadaRef.current * (1 - FACTOR_DE_SUAVIZADO) +
        nivelInstantaneo * FACTOR_DE_SUAVIZADO;

      setNivelDeIntensidad(intensidadSuavizadaRef.current);
    },
    [],
  );

  const iniciarGrabacion = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS:   true,
        playsInSilentModeIOS: true,
      });

      const opcionesDeGrabacion: Audio.RecordingOptions = {
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      };

      const { recording } = await Audio.Recording.createAsync(
        opcionesDeGrabacion,
        alRecibirEstadoDeGrabacion,
        INTERVALO_DE_MUESTREO_MS,
      );

      grabacionRef.current = recording;
    } catch (error) {
      console.error('Error al iniciar la grabación del micrófono:', error);
    }
  }, [alRecibirEstadoDeGrabacion]);

  const detenerGrabacion = useCallback(async () => {
    try {
      if (!grabacionRef.current) return;
      await grabacionRef.current.stopAndUnloadAsync();
      grabacionRef.current = null;
    } catch (error) {
      console.error('Error al detener la grabación del micrófono:', error);
    }
  }, []);

  useEffect(() => {
    const inicializar = async () => {
      const permisoConcedido = await solicitarPermiso();
      if (permisoConcedido) await iniciarGrabacion();
    };

    inicializar();

    return () => { detenerGrabacion(); };
  }, []);

  return { nivelDeIntensidad, tienePermiso };
}