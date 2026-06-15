import { MessageCircle } from 'lucide-react';
import { FaShoppingCart } from 'react-icons/fa';

const Topo = () => (
  <header className="header">
    <div className="header-logo-wrapper">
      <div className="header-logo-icon">
        <FaShoppingCart size={20} />
      </div>
      <div className="header-logo-text">
        <span className="header-title">Mercadinho do Bom Preço</span>
        <span className="header-subtitle">Ofertas & Descontos</span>
      </div>
    </div>
    <nav className="header-nav">
      <a href="https://wa.me/5571996786862?text=Olá,%20converse%20conosco%20e%20retire%20suas%20dúvidas!" className="header-link">
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
    </nav>
  </header>
);

export default Topo;