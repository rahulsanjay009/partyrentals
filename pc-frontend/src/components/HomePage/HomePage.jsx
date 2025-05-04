import ResponsiveMenu from './ResponsiveMenu';
import useCategories from '../../utils/useCategories';
import ProductCatalog from '../ProductCatalog/ProductCatalog';
import useProducts from '../../utils/useProducts';
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';

const HomePage = () => {
    const {categories, loading, message} = useCategories();
    const [category,setCategory] = useState('ALL')
    const {products} = useProducts(category);
    const [searchText, setSearchText] = useState("");

    const filteredProducts = searchText.trim() ==="" ? products : products.filter(product =>
        product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
          <ResponsiveMenu categories = {categories} selectCategory={setCategory}/>
          <main style={{ 
                padding:'10px',
                height: '80vh',        // Set a scrollable height
                overflowY: 'auto',     // Enable vertical scrolling                 
              }}>
            <Box sx={{display:'flex', gap:2, paddingLeft:'1rem',paddingRight:'1rem', alignItems:'center'}}>
                <Typography sx={{textWrap:'nowrap'}}> {category} </Typography>
                <ProductSearchBar selectSearchText={setSearchText}/>
                <Button variant='contained'><SearchIcon/></Button>
            </Box>
            
            <ProductCatalog products={filteredProducts}/>
          </main>
          
        </>
    );
}

export default HomePage;