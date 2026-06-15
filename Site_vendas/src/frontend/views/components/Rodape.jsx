import { FaShoppingCart } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo">
      <div className="footer-logo-icon">
        <FaShoppingCart size={14} />
      </div>
      <span className="footer-logo-text">Mercadinho do Bom Preço</span>
    </div>
    <p className="footer-desc">Varias promoções diárias.</p>
    <p className="footer-disclaimer">
      Os preços e a disponibilidade podem sofrer alterações. Boa compra e volte sempre!
    </p>
    <p className="footer-disclaimer">© Todos os direitos reservados por MBP - LTDA</p>
  </footer>
);

export default Footer;