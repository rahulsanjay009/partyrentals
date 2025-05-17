import { useState } from 'react';
import { Box } from '@mui/material';
import ProductSearchBar from '../../ProductSearchBar/ProductSearchBar';
import ProductCatalog from '../../ProductCatalog/ProductCatalog';
import useProducts from '../../../utils/useProducts';
import { useParams } from 'react-router-dom';
import ContactUs from '../../ContactUs/ContactUs';

const ProductCatalogPage = () => {
    const { category } = useParams();
    const decodedCategory = decodeURIComponent(category || 'Home');
    const { products, productsLoading } = useProducts(decodedCategory);
    const [searchText, setSearchText] = useState('');

    const filteredProducts = searchText.trim()
        ? products.filter(
            (product) =>
                product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchText.toLowerCase())
        )
        : products;

    return (
        <>        
        {/* { productsLoading && <div className='loader-overlay'> <div className='loader'> </div> </div>} */}
            <Box sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center', position: 'relative' }}>
                <ProductSearchBar selectSearchText={setSearchText} />
            </Box>
            <Box sx={{width: "100%", mb: 2}}>
                <ProductCatalog products={filteredProducts} />
            </Box>
        </>
    );
};

export default ProductCatalogPage;
