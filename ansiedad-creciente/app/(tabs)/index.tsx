import { StatusBar } from 'expo-status-bar';
import { ControladorDeIntensidad } from '../../components/controladores/ControladorDeIntensidad';

export default function PantallaPrincipal() {
  return (
    <>
      <StatusBar style="light" hidden />
      <ControladorDeIntensidad />
    </>
  );
}