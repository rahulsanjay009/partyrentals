// HomePage.jsx
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ResponsiveMenu from './ResponsiveMenu';
import ContactUs from '../../ContactUs/ContactUs';
import useCategories from '../../../utils/useCategories';

const HomePage = () => {
    const { categories } = useCategories();

    return (
        <Box sx={{ height: '100vh', overflowY: 'auto' }}>
            <ResponsiveMenu categories={categories} />
            <Outlet />
            <ContactUs />
        </Box>
    );
};

export default HomePage;
