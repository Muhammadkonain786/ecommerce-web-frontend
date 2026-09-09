import { Routes, Route } from 'react-router-dom';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage'; 

export default function AppRoutes() {
  return (
    <>
      <TopBanner />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/category/:styleName" element={<CategoryPage />} />
      </Routes>

      <Newsletter />
      <Footer />
    </>
  );
}