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
  const [loadingBatch, setLoadingBatch] = useState(true);
  const observerRef = useRef();
  const productIds = useRef(new Set()); // Track loaded product IDs

  const loadNextBatch = useCallback(async () => {
    if (nextIndex >= products.length) return;

    setLoadingBatch(true);

    // Slice the next batch of products
    const nextBatch = products.slice(nextIndex, nextIndex + BATCH_SIZE);
    const newProducts = [];

    // Filter out already visible products to avoid duplicates
    for (let product of nextBatch) {
      if (!productIds.current.has(product.id)) {
        newProducts.push(product);
        productIds.current.add(product.id); // Mark product as loaded
      }
    }

    // Preload images for new products only
    const imageUrls = newProducts
      .filter((p) => p.image_url)
      .map((p) => `${p.image_url}?f_auto,q_auto,w_600`);
    await Promise.all(imageUrls.map(preloadImage));

    // Add the new products to the visible list
    setVisibleProducts((prev) => [...prev, ...newProducts]);
    setNextIndex((prev) => prev + BATCH_SIZE);
    setLoadingBatch(false);
  }, [nextIndex, products]);

  useEffect(() => {
    // Reset if products change
    setVisibleProducts([]);
    setNextIndex(0);
    productIds.current.clear(); // Clear the product ID set when products change
    loadNextBatch();
  }, [products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingBatch) {
          loadNextBatch();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadNextBatch, loadingBatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: 2,
      }}
    >
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
                sx={{ objectFit: "contain", height: 350, width: 400 }}
              />
            ) : (
              <div
                style={{
                  height: "250px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "#999" }}>No Image</p>
              </div>
            )}
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                {product.price === 0
                  ? "0 - Contact for price"
                  : `$${product.price}`}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {/* Infinite Scroll Trigger */}
        <div ref={observerRef} style={{ height: 1 }} />

        {loadingBatch && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              my: 4,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCatalog;
