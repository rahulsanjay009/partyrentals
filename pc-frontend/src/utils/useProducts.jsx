import { useEffect, useState } from 'react';
import APIService from '../services/APIService';

const useProducts = (categoryName = 'ALL') => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    setProductsLoading(true)
    if(categoryName == 'Home'){
      setProductsLoading(false)
      return
    }

    APIService()
      .fetchProducts(categoryName)
      .then(res => {
        if(res.success){
            setProducts(res?.products);            
            setStatusMessage("Fetched Succesfully");
        }
        else{
            setStatusMessage(res?.error)
        }
        setProductsLoading(false);
      })
      .catch(err => {
        console.error(err);        
      }).finally(() => {
        setProductsLoading(false)
        setTimeout(()=>{
            setStatusMessage('')
        },5000)
      });
  }, [categoryName]);

  return { products, productsLoading, statusMessage };
};

export default useProducts;
