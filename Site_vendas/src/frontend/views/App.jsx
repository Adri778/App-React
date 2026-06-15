import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import '../css/App.css';

import { Dados_Slide } from '../../backend/models/data/dados_slideshow';
import Topo from './components/Topo';
import SlideShow from './components/SlideShow';
import Filtro from './components/Filtro';
import Cartao from './components/cartao';
import Footer from './components/Rodape';

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // 1. Criamos os estados para guardar os dados que virão da internet
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState(["Todos", "Eletrônicos", "Casa e Decoração", "Beleza", "Promoções"]);
  const [carregando, setCarregando] = useState(true);

  // 2. O "Controller" que busca os dados no Banco de Dados
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resposta = await fetch('http://localhost:3000/produtos');
        const dadosCadastrados = await resposta.json();

        const mapeados = dadosCadastrados.map(p => ({
          ...p,
          name: p.nome,
          price: parseFloat(p.preco),
          originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
          category: p.categoria,
        }));

        setProdutos(mapeados);
      } catch (erro) {
        console.error("Erro ao carregar os produtos:", erro);
      } finally {
        setCarregando(false); // Terminou de carregar
      }
    }

    carregarProdutos();
  }, []);

  // 3. O filtro continua funcionando perfeitamente com os dados novos
  const filteredProducts = produtos.filter((product) => {
    if (activeCategory === "Todos") return true;
    if (activeCategory === "Promoções") return product.isPromo;
    return product.category === activeCategory;
  });

  return (
    <div className="app-container">
      <Topo />
      <SlideShow slides={Dados_Slide} />

      <main className="main-content">
        <div className="main-header">
          <h2 className="main-title">Descobertas do Dia</h2>
          <p className="main-subtitle">
            Selecionei as melhores ofertas e produtos mais bem avaliados para si!
          </p>
        </div>

        <Filtro
          categoriesList={categorias}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Feedback visual enquanto os dados estão sendo baixados */}
        {carregando ? (
          <div className="loading-state" style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Carregando as melhores ofertas...</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Cartao key={product.id} {...product} />
              ))
            ) : (
              <div className="empty-state">
                <ShoppingBag size={48} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
                <p>Nenhum achadinho encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}