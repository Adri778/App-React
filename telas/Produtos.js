import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { listarProdutos } from '../servicos/produtoServico';

const URL_CADASTRO = 'https://seusite.com/admin/produtos/novo';

export default function Produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listarProdutos().then(setProdutos).catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7F2' }}>

      <View style={{ backgroundColor: '#2E8B4A', paddingTop: 55, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#FFF', fontSize: 15 }}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Produtos</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {produtos.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
            Nenhum produto cadastrado.
          </Text>
        )}
        {produtos.map(item => (
          <View key={item.id} style={{ backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>{item.nome}</Text>
            <Text style={{ color: '#666', marginTop: 3 }}>
              R$ {parseFloat(item.preco).toFixed(2)}  ·  Estoque: {item.quantidade}
            </Text>
            {item.quantidade <= item.estoque_minimo && (
              <Text style={{ color: '#E53935' }}>⚠ Estoque baixo</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => WebBrowser.openBrowserAsync(URL_CADASTRO)}
        style={{ position: 'absolute', right: 24, bottom: 32, width: 56, height: 56, borderRadius: 28, backgroundColor: '#2E8B4A', alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: '#FFF', fontSize: 30 }}>+</Text>
      </TouchableOpacity>

    </View>
  );
}
