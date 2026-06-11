import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { listarVendas } from '../servicos/vendaServico';

const COR_STATUS = {
  pendente: '#F5A623',
  processando: '#1976D2',
  enviado: '#7B1FA2',
  entregue: '#2E8B4A',
  cancelado: '#E53935',
};

function formataData(dataStr) {
  const d = new Date(dataStr);
  return d.toLocaleDateString('pt-BR');
}

export default function Vendas({ navigation }) {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    listarVendas().then(setVendas).catch(() => {});
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={estilos.container}>

      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={estilos.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={estilos.titulo}>Vendas</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={vendas}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => {
          const cor = COR_STATUS[item.status] || '#999';
          return (
            <View style={estilos.cartao}>
              <View style={estilos.cartaoTopo}>
                <Text style={estilos.cartaoId}>#{item.id}</Text>
                <View style={[estilos.badge, { backgroundColor: cor }]}>
                  <Text style={estilos.badgeTexto}>{item.status}</Text>
                </View>
              </View>
              <View style={estilos.cartaoRodape}>
                <Text style={estilos.cartaoData}>{formataData(item.criado_em)}</Text>
                <Text style={estilos.cartaoTotal}>R$ {parseFloat(item.total).toFixed(2)}</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhuma venda encontrada.</Text>
        }
      />

    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F2',
  },
  cabecalho: {
    backgroundColor: '#2E8B4A',
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voltar: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Roboto_400Regular',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
  },
  lista: {
    padding: 16,
    gap: 10,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  cartaoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cartaoId: {
    fontSize: 13,
    fontFamily: 'Roboto_400Regular',
    color: '#999',
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Roboto_700Bold',
  },
  cartaoRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cartaoData: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#999',
  },
  cartaoTotal: {
    fontSize: 15,
    fontFamily: 'Roboto_700Bold',
    color: '#1B5E35',
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Roboto_400Regular',
    marginTop: 40,
  },
});
