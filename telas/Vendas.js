import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Vendas({ navigation }) {
  return (
    <View style={estilos.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={estilos.voltar}>
        <Text style={estilos.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>
      <Text style={estilos.titulo}>Vendas</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F7F2', padding: 24, paddingTop: 60 },
  voltar: { marginBottom: 20 },
  voltarTexto: { color: '#2E8B4A', fontSize: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1B5E35' },
});
