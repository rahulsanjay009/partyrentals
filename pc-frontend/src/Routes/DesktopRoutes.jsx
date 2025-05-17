import { Route, Routes } from 'react-router-dom';
import HomePage from '../components/HomePage/WebHome/HomePage';
import HomeLanding from '../components/HomePage/WebHome/HomeLanding';
import AboutUs from '../components/ContactUs/AboutUs';
import ProductCatalogPage from '../components/HomePage/WebHome/ProductCatalogPage';
import DisplayProduct from '../components/ProductCatalog/DisplayProduct';

const DesktopRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />}>
            <Route index element={<HomeLanding />} />
            <Route path="Home" element={<HomeLanding />} />
            <Route path="about" element={<AboutUs />} />
            <Route path=":category" element={<ProductCatalogPage />} />
            <Route path='product' element={<DisplayProduct/>} />
        </Route>
    </Routes>
);

export default DesktopRoutes;
