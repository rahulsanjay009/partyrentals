import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonImg,
    IonRow,
    IonSpinner,
  } from '@ionic/react';
  import { useEffect, useState, useRef } from 'react';
  import './ProductCatalog.css';
  
  const preloadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = resolve;
    });
  
  const BATCH_SIZE = 8;
  
  const MobileProductCatalog = ({ products = [] }) => {
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [batchIndex, setBatchIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef(null);
  
    const loadNextBatch = async () => {
      if (loading) return;
  
      const nextBatch = products.slice(
        batchIndex * BATCH_SIZE,
        (batchIndex + 1) * BATCH_SIZE
      );
  
      if (nextBatch.length === 0) return;
  
      setLoading(true);
  
      // Preload images
      await Promise.all(
        nextBatch
          .filter((p) => p.image_url)
          .map((p) => preloadImage(p.image_url))
      );
  
      setVisibleProducts((prev) => [...prev, ...nextBatch]);
      setBatchIndex((prev) => prev + 1);
      setLoading(false);
    };
  
    useEffect(() => {
      loadNextBatch();
    }, [products]);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !loading) {
            loadNextBatch();
          }
        },
        { threshold: 1.0 }
      );
  
      if (sentinelRef.current) {
        observer.observe(sentinelRef.current);
      }
  
      return () => {
        if (sentinelRef.current) {
          observer.unobserve(sentinelRef.current);
        }
      };
    }, [visibleProducts, loading]);
  
    return (
      <>
        {visibleProducts.map((product) => (
          <IonCard className="ion_card" key={product?.name}>
            {product.image_url ? (
              <IonImg
                className="ion_img"
                src={product.image_url}
                alt={product.name}
                style={{
                  height: '55vh', // constant height
                  width: '100%', // 100% width to fill container
                  objectFit: 'contain', // ensures the image covers the space
                }}
              />
            ) : (
              <div
                style={{
                  height: '200px',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ color: '#999' }}>No Image</p>
              </div>
            )}
            <IonCardHeader>
              <IonCardSubtitle>{product.category}</IonCardSubtitle>
              <IonCardTitle>{product.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonRow>
                <IonCol>
                  ${product.price === 0 ? '0 - contact for price' : product.price}
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        ))}
  
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}>
            <IonSpinner name="crescent" />
          </div>
        )}
  
        {/* Sentinel for lazy loading */}
        <div ref={sentinelRef} style={{ height: '1px' }}></div>
      </>
    );
  };
  
  export default MobileProductCatalog;
  