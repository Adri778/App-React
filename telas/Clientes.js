import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Modal, TextInput, Alert, ScrollView,
} from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { listarClientes, criarCliente } from '../servicos/clienteServico';

const FORM_VAZIO = { nome: '', email: '', telefone: '', endereco: '' };

export default function Clientes({ navigation }) {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [clientes, setClientes] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(FORM_VAZIO);

  useEffect(() => { carregar(); }, []);

  function carregar() {
    listarClientes().then(setClientes).catch(() => {});
  }

  function campo(chave, valor) {
    setForm(f => ({ ...f, [chave]: valor }));
  }

  async function salvar() {
    if (!form.nome.trim()) {
      return Alert.alert('Atenção', 'O nome é obrigatório.');
    }
    const dados = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim(),
      endereco: form.endereco.trim(),
    };
    try {
      await criarCliente(dados);
      setModal(false);
      setForm(FORM_VAZIO);
      carregar();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o cliente.');
    }
  }

  if (!fontsLoaded) return null;

  return (
    <View style={estilos.container}>

      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={estilos.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={estilos.titulo}>Clientes</Text>
        <TouchableOpacity style={estilos.botaoNovo} onPress={() => setModal(true)}>
          <Text style={estilos.botaoNovoTexto}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={clientes}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => (
          <View style={estilos.cartao}>
            <Text style={estilos.cartaoNome}>{item.nome}</Text>
            {item.email ? <Text style={estilos.cartaoDetalhe}>{item.email}</Text> : null}
            {item.telefone ? <Text style={estilos.cartaoDetalhe}>{item.telefone}</Text> : null}
          </View>
        )}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhum cliente cadastrado.</Text>
        }
      />

      <Modal visible={modal} animationType="slide" transparent>
        <View style={estilos.overlay}>
          <ScrollView style={estilos.modalBox} keyboardShouldPersistTaps="handled">
            <Text style={estilos.modalTitulo}>Novo Cliente</Text>

            <Text style={estilos.label}>Nome *</Text>
            <TextInput style={estilos.input} value={form.nome} onChangeText={v => campo('nome', v)} placeholder="Nome completo" />

            <Text style={estilos.label}>E-mail</Text>
            <TextInput style={estilos.input} value={form.email} onChangeText={v => campo('email', v)} placeholder="email@exemplo.com" keyboardType="email-address" autoCapitalize="none" />

            <Text style={estilos.label}>Telefone</Text>
            <TextInput style={estilos.input} value={form.telefone} onChangeText={v => campo('telefone', v)} placeholder="(00) 00000-0000" keyboardType="phone-pad" />

            <Text style={estilos.label}>Endereço</Text>
            <TextInput style={[estilos.input, estilos.inputArea]} value={form.endereco} onChangeText={v => campo('endereco', v)} placeholder="Rua, número, bairro..." multiline numberOfLines={3} />

            <TouchableOpacity style={estilos.botaoSalvar} onPress={salvar}>
              <Text style={estilos.botaoSalvarTexto}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botaoCancelar} onPress={() => { setModal(false); setForm(FORM_VAZIO); }}>
              <Text style={estilos.botaoCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

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
  botaoNovo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  botaoNovoTexto: {
    color: '#2E8B4A',
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
    elevation: 2,
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
  vazio: {
    textAlign: 'center',
    color: '#999',
    fontFamily: 'Roboto_400Regular',
    marginTop: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  modalTitulo: {
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
    color: '#1B5E35',
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Roboto_700Bold',
    color: '#444',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    fontFamily: 'Roboto_400Regular',
    backgroundColor: '#FAFAFA',
  },
  inputArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  botaoSalvar: {
    backgroundColor: '#2E8B4A',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoSalvarTexto: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_700Bold',
    fontSize: 16,
  },
  botaoCancelar: {
    padding: 14,
    alignItems: 'center',
    marginBottom: 8,
  },
  botaoCancelarTexto: {
    color: '#888',
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
  },
});
