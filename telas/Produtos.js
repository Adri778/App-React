import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  Modal, TextInput, Alert, ScrollView, Switch,
} from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { listarProdutos, criarProduto } from '../servicos/produtoServico';

const FORM_VAZIO = {
  nome: '', preco: '', quantidade: '', estoque_minimo: '5', categoria: '', descricao: '',
  // Campos da vitrine (consumidos pelo site)
  image: '', originalPrice: '', isPromo: false, freeShipping: false, affiliateLink: '',
};

export default function Produtos({ navigation }) {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [produtos, setProdutos] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(FORM_VAZIO);

  useEffect(() => { carregar(); }, []);

  function carregar() {
    listarProdutos().then(setProdutos).catch(() => {});
  }

  function campo(chave, valor) {
    setForm(f => ({ ...f, [chave]: valor }));
  }

  async function salvar() {
    if (!form.nome.trim() || !form.preco.trim()) {
      return Alert.alert('Atenção', 'Nome e preço são obrigatórios.');
    }
    const dados = {
      nome: form.nome.trim(),
      preco: parseFloat(form.preco),
      descricao: form.descricao.trim(),
      quantidade: parseInt(form.quantidade) || 0,
      estoque_minimo: parseInt(form.estoque_minimo) || 5,
      categoria: form.categoria.trim(),
      // Campos da vitrine (consumidos pelo site)
      image: form.image.trim(),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      isPromo: form.isPromo,
      freeShipping: form.freeShipping,
      affiliateLink: form.affiliateLink.trim(),
    };
    try {
      await criarProduto(dados);
      setModal(false);
      setForm(FORM_VAZIO);
      carregar();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    }
  }

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

      <TouchableOpacity style={estilos.botaoAdicionar} onPress={() => setModal(true)}>
        <Text style={estilos.botaoAdicionarTexto}>+</Text>
      </TouchableOpacity>

      <Modal visible={modal} animationType="slide" transparent>
        <View style={estilos.overlay}>
          <ScrollView style={estilos.modalBox} keyboardShouldPersistTaps="handled">
            <Text style={estilos.modalTitulo}>Novo Produto</Text>

            <Text style={estilos.label}>Nome *</Text>
            <TextInput style={estilos.input} value={form.nome} onChangeText={v => campo('nome', v)} placeholder="Nome do produto" />

            <Text style={estilos.label}>Preço *</Text>
            <TextInput style={estilos.input} value={form.preco} onChangeText={v => campo('preco', v)} placeholder="0.00" keyboardType="decimal-pad" />

            <Text style={estilos.label}>Quantidade</Text>
            <TextInput style={estilos.input} value={form.quantidade} onChangeText={v => campo('quantidade', v)} placeholder="0" keyboardType="number-pad" />

            <Text style={estilos.label}>Estoque mínimo</Text>
            <TextInput style={estilos.input} value={form.estoque_minimo} onChangeText={v => campo('estoque_minimo', v)} placeholder="5" keyboardType="number-pad" />

            <Text style={estilos.label}>Categoria</Text>
            <TextInput style={estilos.input} value={form.categoria} onChangeText={v => campo('categoria', v)} placeholder="Ex: Bebidas" />

            <Text style={estilos.label}>Descrição</Text>
            <TextInput style={[estilos.input, estilos.inputArea]} value={form.descricao} onChangeText={v => campo('descricao', v)} placeholder="Descrição do produto" multiline numberOfLines={3} />

            <Text style={estilos.secaoVitrine}>Vitrine (site)</Text>

            <Text style={estilos.label}>Link da imagem</Text>
            <TextInput style={estilos.input} value={form.image} onChangeText={v => campo('image', v)} placeholder="https://..." autoCapitalize="none" />

            <Text style={estilos.label}>Preço original</Text>
            <TextInput style={estilos.input} value={form.originalPrice} onChangeText={v => campo('originalPrice', v)} placeholder="0.00 (opcional)" keyboardType="decimal-pad" />

            <Text style={estilos.label}>Link de afiliado</Text>
            <TextInput style={estilos.input} value={form.affiliateLink} onChangeText={v => campo('affiliateLink', v)} placeholder="https://..." autoCapitalize="none" />

            <View style={estilos.linhaSwitch}>
              <Text style={estilos.label}>Em promoção</Text>
              <Switch value={form.isPromo} onValueChange={v => campo('isPromo', v)} />
            </View>
            <View style={estilos.linhaSwitch}>
              <Text style={estilos.label}>Frete grátis</Text>
              <Switch value={form.freeShipping} onValueChange={v => campo('freeShipping', v)} />
            </View>

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
    maxHeight: '92%',
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
  secaoVitrine: {
    fontSize: 13,
    fontFamily: 'Roboto_700Bold',
    color: '#1B5E35',
    marginTop: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
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
