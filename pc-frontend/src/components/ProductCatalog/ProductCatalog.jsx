import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";

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
  const productIds = useRef(new Set()); // Avoid duplicates

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

  // Reset on products change
  useEffect(() => {
    setVisibleProducts([]);
    setNextIndex(0);
    productIds.current.clear();
  }, [products]);

  // Automatically load batches as long as there are more to load
  useEffect(() => {
    if (!loadingBatch && nextIndex < products.length) {
      loadNextBatch();
    }
  }, [loadingBatch, nextIndex, products.length, loadNextBatch]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          px: 2,
        }}
      >
        {visibleProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: 300,
              boxShadow: 3,
              borderRadius: 2,
              background: "linear-gradient(45deg,#EEEEEE,#FAF8F9,#FFFFFF)",
            }}
          >
            {product.image_url ? (
              <CardMedia
                component="img"
                loading="lazy"
                image={`${product.image_url}?f_auto,q_auto,w_600`}
                alt={product.name}
                sx={{ objectFit: "contain", height: 350, width: 300 }}
              />
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
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {product.price == 0 ? "$0 - Contact for price" : `$${product.price}`}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {loadingBatch && (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCatalog;
