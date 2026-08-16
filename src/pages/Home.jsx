import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import NewArrivals from '../components/NewArrivals';
import BrowseStyle from '../components/BrowseStyle';
import HappyCustomers from '../components/HappyCustomers';

export default function HomePage() {
  const [brands, setBrands] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [styles, setStyles] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {            
      try {
        const [resBrands, resNew, resTop, resStyles, resReviews] = await Promise.all([
          fetch('http://localhost:5000/api/brands'),
          fetch('http://localhost:5000/api/products/new-arrivals'),
          fetch('http://localhost:5000/api/products/top-selling'),
          fetch('http://localhost:5000/api/categories/styles'),
          fetch('http://localhost:5000/api/reviews')
        ]);

        setBrands(await resBrands.json());
        setNewArrivals(await resNew.json());
        setTopSelling(await resTop.json());
        setStyles(await resStyles.json());
        setReviews(await resReviews.json());
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <Brands brands={brands} />
      <NewArrivals title="NEW ARRIVALS" products={newArrivals} />
      <NewArrivals title="TOP SELLING" products={topSelling} showDivider={true} />
      <BrowseStyle categories={styles} />
      <HappyCustomers reviews={reviews} />
    </>
  );
}