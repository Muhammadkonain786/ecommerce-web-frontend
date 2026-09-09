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
          fetch('https://ecommerce-web-backend-production-3020.up.railway.app/api/brands'),
          fetch('https://ecommerce-web-backend-production-3020.up.railway.app/api/products/new-arrivals'),
          fetch('https://ecommerce-web-backend-production-3020.up.railway.app/api/products/top-selling'),
          fetch('https://ecommerce-web-backend-production-3020.up.railway.app/api/categories/styles'),
          fetch('https://ecommerce-web-backend-production-3020.up.railway.app/api/reviews')
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