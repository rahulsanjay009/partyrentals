import { useEffect, useState } from 'react';
import APIService from '../services/APIService';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    APIService()
      .fetchCategories()
      .then(res => {
        if(res.success){
            setCategories(res?.categories);            
            setStatusMessage("Fetched Succesfully");
        }
        else{
            setStatusMessage(res?.error)
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      }).finally(() => {
        setLoading(false)
        setTimeout(()=>{
            setStatusMessage('')
        },5000)
      });
  }, []);

  return { categories, loading, statusMessage };
};

export default useCategories;
