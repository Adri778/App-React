  import React, { useEffect, useState } from 'react';
  import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
  import { WebView } from 'react-native-webview';
  import { listarProdutos } from '../servicos/produtoServico';

  const URL_CADASTRO = 'http://192.168.0.96:5174/admin/produtos/novo';

  export default function Produtos({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    const [showWebView, setShowWebView] = useState(false);
    const [loadingWeb, setLoadingWeb] = useState(true);

    // Função isolada para carregar os produtos do banco
    const carregarProdutos = () => {
      listarProdutos()
        .then(setProdutos)
        .catch((err) => console.log("Erro ao buscar produtos:", err));
    };

    // Carrega ao abrir a tela pela primeira vez
    useEffect(() => {
      carregarProdutos();
    }, []);

    // Função para fechar o cadastro e atualizar a lista de produtos na hora
    const fecharCadastro = () => {
      setShowWebView(false);
      carregarProdutos(); // Atualiza a lista para mostrar o produto que acabou de ser criado
    };

    // Se o usuário clicou no "+", renderiza a WebView ocupando a tela inteira
    if (showWebView) {
      return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          {/* Header nativo para a WebView com a identidade verde do seu app */}
          <View style={[styles.header, { paddingTop: 55 }]}>
            <TouchableOpacity onPress={fecharCadastro}>
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>✕ Fechar</Text>
            </TouchableOpacity>
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>Cadastrar Produto</Text>
            <View style={{ width: 60 }} /> {/* Alinhamento do flexbox */}
          </View>

          {/* Indicador de carregamento enquanto o site abre */}
          {loadingWeb && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2E8B4A" />
              <Text style={{ marginTop: 10, color: '#666' }}>Carregando formulário...</Text>
            </View>
          )}

          <WebView 
            source={{ uri: URL_CADASTRO }} 
            style={{ flex: 1 }}
            onLoadStart={() => setLoadingWeb(true)}
            onLoadEnd={() => setLoadingWeb(false)}
            scalesPageToFit={false}
            bounces={false}
          />
        </View>
      );
    }

    // Tela padrão: Lista de Produtos
    return (
      <View style={{ flex: 1, backgroundColor: '#F0F7F2' }}>

        {/* Header da Listagem */}
        <View style={styles.header}>
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
            <View key={item.id} style={styles.cardProduto}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={1}>{item.nome}</Text>
              <Text style={{ color: '#666', marginTop: 3 }}>
                R$ {parseFloat(item.preco).toFixed(2)}  ·  Estoque: {item.quantidade}
              </Text>
              {item.quantidade <= item.estoque_minimo && (
                <Text style={{ color: '#E53935', marginTop: 4 }}>⚠ Estoque baixo</Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Botão de "+" Flutuante - Agora abre a WebView interna */}
        <TouchableOpacity
          onPress={() => setShowWebView(true)}
          style={styles.fab}
        >
          <Text style={{ color: '#FFF', fontSize: 30 }}>+</Text>
        </TouchableOpacity>

      </View>
    );
  }

  // Estilos organizados para manter o código limpo
  const styles = StyleSheet.create({
    header: {
      backgroundColor: '#2E8B4A', 
      paddingTop: 55, 
      padding: 20, 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cardProduto: {
      backgroundColor: '#FFF', 
      borderRadius: 12, 
      padding: 16, 
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2
    },
    fab: {
      position: 'absolute', 
      right: 24, 
      bottom: 32, 
      width: 56, 
      height: 56, 
      borderRadius: 28, 
      backgroundColor: '#2E8B4A', 
      alignItems: 'center', 
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5
    },
    loadingContainer: {
      position: 'absolute',
      top: 115, // Desconta o tamanho do header para o loading não cobrir o botão fechar
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      zIndex: 10
    }
  });