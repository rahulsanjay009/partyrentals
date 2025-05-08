import { Box, Typography, CardContent } from '@mui/material';
import StyledCard from './StyledCard';
import CardCarousel from '../../Carousel/CardCarousel';
import useEvents from '../../../utils/useEvents';
import useCategories from '../../../utils/useCategories';
import { useNavigate, useLocation } from 'react-router-dom';

const HomeLanding = () => {
    const {events,eventsLoading} = useEvents()
    const {categories, loading} = useCategories()
    const navigate = useNavigate();
    const handleClick = (category) => {
        const route = category === 'Home' ? '/' : `/${encodeURIComponent(category)}`;
        navigate(route);
    }
    return (
    <Box>
        <StyledCard sx={{ padding: '15px' }}>
            <CardContent sx={{ padding: '15px' }}>
                <Typography fontSize={'46px'}>
                    It's Your Day, Make It Memorable.
                </Typography>
                <br />
                <Typography fontSize={'20px'}>
                Srikrishna Party Rentals LLC is an event rental and event decoration services company located in Cordelia Ln, Tracy, CA 95377, United States. Our professional team can help you plan an amazing event Party Rentals that meets all of your needs. We provide everything from party rental supplies to custom decoration services. Our goal is to make every event memorable for you.
                </Typography>
            </CardContent>
        </StyledCard>
        <Box display="flex" flexWrap="wrap" justifyContent="start" className="categories_cards">
            {/* ALL Card */}
            <Box onClick={() => handleClick('/ALL')} sx={'cardStyle'}>
                <img
                src="https://thumbs.dreamstime.com/b/event-supplies-flat-glyph-icons-party-equipment-stage-constructions-visual-projector-stanchion-flipchart-marquee-signs-115703883.jpg"
                alt="All"
                width={100}
                height={100}
                />
                <Typography variant="body1" mt={1}>
                All
                </Typography>
            </Box>

            {/* Category Cards */}
            {categories.map((cat) => (
                <Box
                key={cat.id || cat.name}
                onClick={() => handleClick(cat.name)}
                sx={'cardStyle'}
                >
                <img
                    src={
                    cat.image_url
                        ? cat.image_url
                        : 'https://res.cloudinary.com/dmm4awbwm/image/upload/v1746672352/rlrckqhdnfdnvohwt4xb.png'
                    }
                    alt={cat.name}
                    width={100}
                    height={100}
                />
                <Typography variant="body2" fontWeight={300} fontSize={14} mt={1}>
                    {cat.name}
                </Typography>
                </Box>
            ))}
            </Box>
        <CardCarousel events={events}/>
    </Box>
)};

export default HomeLanding;
