import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function Explore() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How to Use the Note App</Text>

      <Text style={styles.step}>1. Add notes using the input at the top.</Text>
      <Text style={styles.step}>2. Tap the checkbox to mark a note as done — it will move to the bottom.</Text>
      <Text style={styles.step}>3. Use the trash icon to delete notes.</Text>
      <Text style={styles.step}>4. Toggle light/dark mode with the switch in the header.</Text>

      <Text style={styles.footer}>Start listing now!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,             // your extra top padding
    backgroundColor: '#2B2E37', // balanced charcoal gray background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#A7F3D0',          // soft mint neon title
  },
  step: {
    fontSize: 16,
    marginBottom: 15,
    color: '#CBD5E1',          // light steel blue-gray text
  },
  footer: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 30,
    textAlign: 'center',
    color: '#94A3B8',          // muted blue-gray footer
  },
});
