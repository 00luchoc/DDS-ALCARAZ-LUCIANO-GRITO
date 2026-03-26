import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TituloDeLaPagina = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🛒 Lista de Compras</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 55,
    paddingTop: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});