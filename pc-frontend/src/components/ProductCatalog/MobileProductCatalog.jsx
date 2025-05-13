import { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonRow,
  IonCol,
  IonSpinner,
} from "@ionic/react";
import './ProductCatalog.css';

const BATCH_SIZE = 8;

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve;
  });

const MobileProductCatalog = ({ products = [] }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNextBatch = async () => {
    if (nextIndex >= products.length) return;

    setLoading(true);
    const nextBatch = products.slice(nextIndex, nextIndex + BATCH_SIZE);

    const imageUrls = nextBatch
      .filter(p => p.image_url)
      .map(p => `${p.image_url}?f_auto,q_auto,w_400`);

    await Promise.all(imageUrls.map(preloadImage));

    setVisibleProducts(prev => [...prev, ...nextBatch]);
    setNextIndex(prev => prev + BATCH_SIZE);
    setLoading(false);
  };

  useEffect(() => {
    setVisibleProducts([]);
    setNextIndex(0);
  }, [products]);

  // Start loading on mount or when index changes
  useEffect(() => {
    if (!loading && nextIndex < products.length) {
      loadNextBatch();
    }
  }, [nextIndex, products]);

  return (
    <>
      {visibleProducts.map((product, idx) => (
        <IonCard className="ion_card" key={product?.id || `${product?.name}-${idx}`}>
          {product.image_url ? (
            <IonImg
              className="ion_img"
              src={`${product.image_url}?f_auto,q_auto,w_400`}
              alt={product.name}
              style={{ width: '100%', height: '60vh', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ height: '250px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                {product.price == 0
                  ? "$0 - Contact for price"
                  : `$${product.price}`}
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      ))}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <IonSpinner name="crescent" />
        </div>
      )}
    </>
  );
};

export default MobileProductCatalog;
