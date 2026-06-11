import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { listarProdutos } from '../servicos/produtoServico';

export default function Estoque({ navigation }) {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listarProdutos()
      .then(lista => {
        const ordenado = [...lista].sort((a, b) => a.quantidade - b.quantidade);
        setProdutos(ordenado);
      })
      .catch(() => {});
  }, []);

  const baixos = produtos.filter(p => p.quantidade <= p.estoque_minimo).length;

  if (!fontsLoaded) return null;

  return (
    <View style={estilos.container}>

      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={estilos.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={estilos.titulo}>Estoque</Text>
        <View style={{ width: 60 }} />
      </View>

      {baixos > 0 && (
        <View style={estilos.alerta}>
          <Text style={estilos.alertaTexto}>⚠ {baixos} produto{baixos > 1 ? 's' : ''} com estoque baixo</Text>
        </View>
      )}

      <FlatList
        data={produtos}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => {
          const baixo = item.quantidade <= item.estoque_minimo;
          return (
            <View style={[estilos.cartao, baixo && estilos.cartaoBaixo]}>
              <View style={estilos.cartaoInfo}>
                <Text style={estilos.cartaoNome}>{item.nome}</Text>
                {item.categoria ? <Text style={estilos.categoria}>{item.categoria}</Text> : null}
              </View>
              <View style={estilos.qtdContainer}>
                <Text style={[estilos.qtd, baixo && estilos.qtdBaixo]}>{item.quantidade}</Text>
                <Text style={estilos.qtdLabel}>un.</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhum produto encontrado.</Text>
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
  alerta: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 12,
  },
  alertaTexto: {
    color: '#B71C1C',
    fontFamily: 'Roboto_700Bold',
    fontSize: 13,
  },
  lista: {
    padding: 16,
    gap: 10,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cartaoBaixo: {
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
  },
  cartaoInfo: {
    flex: 1,
  },
  cartaoNome: {
    fontSize: 15,
    fontFamily: 'Roboto_700Bold',
    color: '#222',
  },
  categoria: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    color: '#2E8B4A',
    marginTop: 3,
  },
  qtdContainer: {
    alignItems: 'center',
  },
  qtd: {
    fontSize: 22,
    fontFamily: 'Roboto_700Bold',
    color: '#2E8B4A',
  },
  qtdBaixo: {
    color: '#E53935',
  },
  qtdLabel: {
    fontSize: 11,
    fontFamily: 'Roboto_400Regular',
    color: '#999',
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Roboto_400Regular',
    marginTop: 40,
  },
});
