import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Main() {
  return (
    <View style={styles.container} className="bg-slate-400">
      <Text style={styles.title}>Título</Text>
      <Text style={styles.subtitle}>Subtítulo</Text>
      <Text style={styles.text}>Texto normal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'roboto-semibold',
    fontSize: 32,
    color: '#03363D',
  },
  subtitle: {
    fontFamily: 'RobotoSlab_600SemiBold',
    fontSize: 24,
    color: '#03363D',
  },
  text: {
    fontFamily: 'RobotoSlab_400Regular',
    fontSize: 20,
    color: '#03363D',
  },
});
