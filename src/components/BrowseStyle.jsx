import React from 'react';
import { Link } from 'react-router-dom'; // 1. Link ko import karein

export default function BrowseStyle({ categories = [] }) {
  return (
    <section className="browse-style-section">
      <div className="browse-style-container">
        <h2 className="browse-style-title">BROWSE BY DRESS STYLE</h2>

        <div className="style-grid">
          {categories && categories.map((cat) => {
            // Dynamic slug according to title: casual, formal, party, gym
            const slug = cat.title ? cat.title.toLowerCase() : '';

            return (
              <Link 
                key={cat.id} 
                to={`/category/${slug}`} // 2. Click karne par is route par jayega
                className={`style-card ${cat.className || ''} style-card-${slug}`}
                style={{ textDecoration: 'none' }} // Link ki default underline khatam karne ke liye
              >
                <h3 className="style-card-title">{cat.title}</h3>
                <img src={cat.image} alt={cat.title} className="style-card-img" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}