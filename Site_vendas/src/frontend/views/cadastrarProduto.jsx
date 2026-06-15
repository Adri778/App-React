import React, { useState } from 'react';
import '../css/App.css'; 

export default function CadastroProduto() {
  const [formData, setFormData] = useState({
    name: '', image: '', description: '', price: '', originalPrice: '',
    category: 'Eletrônicos', isPromo: false, freeShipping: false, affiliateLink: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Salvando produto...');

    //Fetch para cadastrar produto no backend
    const dados = {
      nome: formData.name,
      preco: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      descricao: formData.description,
      categoria: formData.category,
      image: formData.image,
      isPromo: formData.isPromo,
      freeShipping: formData.freeShipping,
      affiliateLink: formData.affiliateLink,
      quantidade: 0,
      estoque_minimo: 5,
    };

    try {
      const resposta = await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error();

      setStatus('Produto cadastrado com sucesso!');
      setFormData({
        name: '', image: '', description: '', price: '', originalPrice: '',
        category: 'Eletrônicos', isPromo: false, freeShipping: false, affiliateLink: ''
      });
    } catch {
      setStatus('Erro ao cadastrar produto. Tente novamente.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-titulo">Novo Produto</h2>
      
      {status && <p style={{ textAlign: 'center', marginBottom: '16px', color: status.includes('sucesso') ? 'green' : '#ee4d2d', fontWeight: 'bold' }}>{status}</p>}

      <form className="cadastro-form" onSubmit={handleSubmit}>
        
        <div className="input-group">
          <label>Nome do Produto</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Ex: Fone Bluetooth..." />
        </div>

        <div className="input-group">
          <label>Link da Imagem</label>
          <input type="url" name="image" value={formData.image} onChange={handleChange} required placeholder="https://..." />
        </div>

        <div className="input-group">
          <label>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Detalhes do produto..."></textarea>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Preço Atual (R$)</label>
            <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required placeholder="0.00" />
          </div>
          <div className="input-group">
            <label>Preço Original (R$)</label>
            <input type="number" step="0.01" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="0.00" />
          </div>
        </div>

        <div className="input-group">
          <label>Categoria</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Casa e Decoração">Casa e Decoração</option>
            <option value="Beleza">Beleza</option>
          </select>
        </div>

        <div className="input-group">
          <label>Link de Afiliado (Shopee/AliExpress)</label>
          <input type="url" name="affiliateLink" value={formData.affiliateLink} onChange={handleChange} required placeholder="https://shopee.com.br/..." />
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" name="isPromo" checked={formData.isPromo} onChange={handleChange} />
            Produto em Promoção
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="freeShipping" checked={formData.freeShipping} onChange={handleChange} />
            Possui Frete Grátis
          </label>
        </div>

        <button type="submit" className="btn-salvar">Cadastrar Produto</button>
      </form>
    </div>
  );
}