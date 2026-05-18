import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© Senai 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    bottom: 7,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});