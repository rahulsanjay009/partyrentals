import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCatalog = ({ products }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center content horizontally
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',                    
                    justifyContent: 'center', // ensures cards are centered in wrap                    
                }}
            >
                {products.map((product) => (
                    <Card
                        key={product.id}
                        sx={{ width: 300, m: 1, boxShadow: 3, borderRadius: 2, background: 'linear-gradient(45DEG,#EEEEEE,#FAF8F9,#FFFFFF)' }}
                    >                        
                    {product.image_url ? 
                            (                                                
                            <CardMedia
                                component="img"
                                image={product.image_url}
                                alt={product.name}
                                // sx={{ height: 300, width: 600 }}
                            />
                            ) : (
                                <div style={{ height: '250px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <p style={{ color: '#999' }}>No Image</p>
                                </div>
                            )}
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.category}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                ${product.price == 0? 0 + " contact for price":product.price}
                            </Typography>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">View</Button>
                            <Button size="small">Add to Cart</Button>
                        </CardActions> */}
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ProductCatalog;
