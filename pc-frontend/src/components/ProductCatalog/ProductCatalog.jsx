import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useCategories from "../../utils/useCategories";
import { WhatsApp } from "@mui/icons-material";

const BATCH_SIZE = 15;

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve;
  });

const ProductCatalog = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [loadingBatch, setLoadingBatch] = useState(false);
  const productIds = useRef(new Set());

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = decodeURIComponent(location.pathname).slice(1); // Remove leading slash
  const { categories, loading } = useCategories();

  const loadNextBatch = useCallback(async () => {
    if (nextIndex >= products.length) return;

    setLoadingBatch(true);
    const nextBatch = products.slice(nextIndex, nextIndex + BATCH_SIZE);
    const newProducts = [];

    for (let product of nextBatch) {
      if (!productIds.current.has(product.id)) {
        newProducts.push(product);
        productIds.current.add(product.id);
      }
    }

    const imageUrls = newProducts
      .filter((p) => p.image_url)
      .map((p) => `${p.image_url}?f_auto,q_auto,w_600`);
    await Promise.all(imageUrls.map(preloadImage));

    setVisibleProducts((prev) => [...prev, ...newProducts]);
    setNextIndex((prev) => prev + BATCH_SIZE);
    setLoadingBatch(false);
  }, [nextIndex, products]);

  useEffect(() => {
    setVisibleProducts([]);
    setNextIndex(0);
    productIds.current.clear();
  }, [products]);

  useEffect(() => {
    if (!loadingBatch && nextIndex < products.length) {
      loadNextBatch();
    }
  }, [loadingBatch, nextIndex, products.length, loadNextBatch]);

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Box
        sx={{
          width: 'auto',
          backgroundColor: "#f8f8f8",
          borderRadius: 2,
          boxShadow: 2,
          m:1,
          p:1,
          position: 'sticky',
          height:'80vh',
          top:50,
        }}
      >
        <Typography variant="body1" padding={1}>
          Browse by
        </Typography>
        <Box sx={{
          width: 'auto',
          height:'75vh',
          overflowY: "auto",
          overflowX:'hidden',
          "&::-webkit-scrollbar": {
            width: "2px", // set desired width
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1", // thumb color
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // track color
          },
        }}>
        {[{name:'ALL'},...categories].map((cat) => {
          const isSelected = cat.name.toLowerCase() === currentPath.toLowerCase();
          return (
            <Box
              key={cat.name}
              sx={{
                m:1,
                px:1,
                borderRadius: 1,
                cursor: "pointer",
                color: isSelected ? "success.dark" : "#253529",
                fontWeight:isSelected?'bold':'400',
                transition: "0.2s",
                "&:hover": {
                  color: "success.dark",
                },
                fontSize:'14px',
                minWidth:'200px'
              }}
              onClick={() => navigate(`/${encodeURIComponent(cat.name)}`)}
            >
              {cat.name}
            </Box>
          );
        })}
        </Box>
      </Box>

      {/* Product Grid */}
      <Box
        sx={{
          width:'100%',
          px: 1,
          "&::-webkit-scrollbar": {
            width: "6px", // set desired width
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4caf50", // thumb color
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // track color
          },
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2, // gap between cards
          justifyContent: 'center', // center cards if fewer than 3
          m: 1,
          p:1
        }}
      >
          {visibleProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                width: 275, // fixed width
                flex: '0 0 auto', // prevent stretching
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  background: "linear-gradient(to bottom, #ffffff, #f9f9f9)"
                }}
              >
                  {product.image_url ? (
                    <Box sx={{ overflow: "hidden", height: 250 }}>
                      <CardMedia
                      
                        component="img"
                        loading="lazy"
                        image={`${encodeURI(product.image_url)}`}
                        alt={product.name}
                        sx={{   
                          height:250,
                          width:300,              
                          objectFit: "contain",
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.2)",
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        height: 250,
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography color="#999">No Image</Typography>
                    </Box>
                  )}
                  <CardContent>
                    <Typography variant="h6" sx={{ textWrap: "wrap", wordBreak: "break-word" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography variant="subtitle1" >
                        {product.price == 0
                          ? "$Contact for price"
                          : `$${product.price}`}
                      </Typography>
                      <IconButton
                        component="a"
                        href={`https://wa.me/16692688087?text=${encodeURIComponent(
                          `Hi, I'm interested in this product:\n\n${product.name}\nCategory: ${product.category}\nPrice: ${
                            product.price === 0 ? "Contact for price" : `$${product.price}`
                          }\n\nImage: ${product.image_url}\n\nIs this available?`
                        )}`}
                        target="_blank"
                        color="inherit"
                      >
                        <WhatsApp />
                      </IconButton>
                    </Box>
                    
                  </CardContent>
              </Card>
            </Box>
          ))}   
          {loadingBatch && (
            <Box component={'div'} width={'350px'} alignSelf={'center'} textAlign={'center'}>
              <CircularProgress />
            </Box>
          )}       
        </Box>

      </Box>
  );
};

export default ProductCatalog;
