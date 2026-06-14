import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as WebBrowser from 'expo-web-browser';
import { listarProdutos } from '../servicos/produtoServico';

const URL_CADASTRO = 'https://seusite.com/admin/produtos/novo'; // trocar pela URL real

export default function Produtos({ navigation }) {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listarProdutos().then(setProdutos).catch(() => {});
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={estilos.container}>

      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={estilos.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={estilos.titulo}>Produtos</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={produtos}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => (
          <View style={estilos.cartao}>
            <View style={estilos.cartaoInfo}>
              <Text style={estilos.cartaoNome}>{item.nome}</Text>
              <Text style={estilos.cartaoDetalhe}>
                R$ {parseFloat(item.preco).toFixed(2)}  ·  Estoque: {item.quantidade}
              </Text>
              {item.categoria ? <Text style={estilos.categoria}>{item.categoria}</Text> : null}
            </View>
            {item.quantidade <= item.estoque_minimo && (
              <Text style={estilos.alerta}>⚠</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhum produto cadastrado.</Text>
        }
      />

      <TouchableOpacity
        style={estilos.botaoAdicionar}
        onPress={() => WebBrowser.openBrowserAsync(URL_CADASTRO)}
      >
        <Text style={estilos.botaoAdicionarTexto}>+</Text>
      </TouchableOpacity>

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
  botaoAdicionar: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E8B4A',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  botaoAdicionarTexto: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'Roboto_700Bold',
    lineHeight: 34,
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
  cartaoInfo: {
    flex: 1,
  },
  cartaoNome: {
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
    color: '#222',
  },
  cartaoDetalhe: {
    fontSize: 13,
    fontFamily: 'Roboto_400Regular',
    color: '#666',
    marginTop: 3,
  },
  categoria: {
    fontSize: 11,
    fontFamily: 'Roboto_400Regular',
    color: '#2E8B4A',
    marginTop: 4,
  },
  alerta: {
    fontSize: 20,
    marginLeft: 8,
  },
  vazio: {
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Roboto_400Regular',
    marginTop: 40,
  },
});
