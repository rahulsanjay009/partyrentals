import ResponsiveMenu from './ResponsiveMenu';
import useCategories from '../../utils/useCategories';
import ProductCatalog from '../ProductCatalog/ProductCatalog';
import useProducts from '../../utils/useProducts';
import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';

const HomePage = () => {
    const {categories, loading, message} = useCategories();
    const [category,setCategory] = useState('Home')
    const {products} = useProducts(category);
    const [searchText, setSearchText] = useState("");

    const filteredProducts = searchText.trim() ==="" ? products : products.filter(product =>
        product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
          <ResponsiveMenu categories = {categories} selectCategory={setCategory}/>
          {
              ( category == '' || category == 'Home' )?
              <Box>
                  <Card sx={{margin:'10px', padding:'5px', backgroundColor:'#267e2ab3', color:'white'}}>
                    <CardContent>                          
                        <h1> It's Your Day, Make It Memorable. </h1>                                  
                        <p> Srikrishna Party Rentals LLC is an event rental and event decoration services company located in Cordelia Ln, Tracy, CA 95377, United States. Our professional team can help you plan an amazing event Party Rentals that meets all of your needs. We provide everything from party rental supplies to custom decoration services. Our goal is to make every event memorable for you. </p>                                                    
                    </CardContent>
                  </Card>
              </Box> :
              <Box sx={{display:'flex', gap:2, padding:'1rem', alignItems:'center'}}>            
                <ProductSearchBar selectSearchText={setSearchText}/>
                <Button variant='contained' color='success'><SearchIcon/></Button>
              </Box>
            }
          <main style={{ 
                padding:'10px',
                height: '100vh',        // Set a scrollable height
                overflowY: 'auto',     // Enable vertical scrolling                 
              }}>
            
            
            
            {( category != '' && category != 'Home' ) && 
            <ProductCatalog products={filteredProducts}/>}
          </main>
          
        </>
    );
}

export default HomePage;