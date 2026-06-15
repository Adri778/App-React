const Filtro = ({ categoriesList, activeCategory, setActiveCategory }) => (
  <div className="category-filter">
    {categoriesList.map((cat) => (
      <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`filter-btn ${activeCategory === cat ? 'active' : 'inactive'}`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default Filtro;