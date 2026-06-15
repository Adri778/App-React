import { Truck, Star, ExternalLink } from 'lucide-react';

const Cartao = ({ 
  name, 
  image, 
  price, 
  originalPrice, 
  rating, 
  sold, 
  isPromo, 
  freeShipping, 
  affiliateLink 
}) => (
  <div className="product-card">
    <div className="card-tags">
      {isPromo && <span className="tag-promo">Oferta</span>}
      {freeShipping && (
        <span className="tag-frete">
          <Truck size={12} /> Frete Grátis
        </span>
      )}
    </div>

    <div className="card-image-wrapper">
      <img src={image} alt={name} className="card-image" />
    </div>

    <div className="card-info">
      <h3 className="card-title">{name}</h3>
      
      {(rating || sold) && (
        <div className="card-stats">
          {rating && (
            <div className="card-rating">
              <Star size={12} fill="currentColor" />
              <span>{rating}</span>
            </div>
          )}
          {rating && sold && <span>|</span>}
          {sold && <span>{sold} vendidos</span>}
        </div>
      )}

      <div className="card-price-section">
        {originalPrice && (
          <span className="price-original">R$ {originalPrice.toFixed(2).replace('.', ',')}</span>
        )}
        <div className="price-current">
          <span className="price-symbol">R$</span>
          <span className="price-value">{price.toFixed(2).replace('.', ',')}</span>
        </div>

        <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="btn-buy">
          Ver na Loja <ExternalLink size={16} />
        </a>
      </div>
    </div>
  </div>
);

export default Cartao;