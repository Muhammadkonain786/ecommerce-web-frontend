export default function Brands({ brands = [] }) {
  return (
    <div className="brands-banner">
      <div className="brands-container">
        {brands.map((brand) => (
          <span key={brand.id} className={`brand-item ${brand.className}`}>
            {brand.name}
          </span>
        ))}
      </div>
    </div>
  );
}