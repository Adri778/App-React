import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { listarVendas } from '../servicos/vendaServico';

const COR_STATUS = {
  pendente: '#F5A623',
  processando: '#1976D2',
  enviado: '#7B1FA2',
  entregue: '#2E8B4A',
  cancelado: '#E53935',
};

export default function Vendas({ navigation }) {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    listarVendas().then(setVendas).catch(() => {});
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7F2' }}>

      <View style={{ backgroundColor: '#2E8B4A', paddingTop: 55, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: '#FFF', fontSize: 15 }}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Vendas</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {vendas.length === 0 && (
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>Nenhuma venda encontrada.</Text>
        )}
        {vendas.map(item => {
          const cor = COR_STATUS[item.status] || '#999';
          const data = new Date(item.criado_em).toLocaleDateString('pt-BR');
          return (
            <View key={item.id} style={{ backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <Text style={{ color: '#999', fontSize: 13 }}>#{item.id}</Text>
                <View style={{ backgroundColor: cor, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 }}>
                  <Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>{item.status}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                <Text style={{ color: '#999', fontSize: 12 }}>{data}</Text>
                <Text style={{ color: '#1B5E35', fontSize: 15, fontWeight: 'bold' }}>R$ {parseFloat(item.total).toFixed(2)}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

    </View>
  );
}
