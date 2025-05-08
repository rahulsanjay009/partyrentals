import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ProductSearchBar from '../../ProductSearchBar/ProductSearchBar';
import ProductCatalog from '../../ProductCatalog/ProductCatalog';
import useProducts from '../../../utils/useProducts';
import { useParams } from 'react-router-dom';

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
            <Box sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center' }}>
                <ProductSearchBar selectSearchText={setSearchText} />
            </Box>
            {productsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress color="success" />
                </Box>
            ) : (
                <ProductCatalog products={filteredProducts} />
            )}
        </>
    );
};

export default ProductCatalogPage;
