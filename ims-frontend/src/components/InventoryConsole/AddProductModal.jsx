import { TextField, Button, Autocomplete, Box, Typography } from '@mui/material';
import styles from './InventoryConsole.module.css';
import { useEffect, useState } from 'react';
import APIService from '../../services/APIService';

const AddProductModal = ({ type, updateMessage, updateShowAddCategory, addProductToDB }) => {
  const productAttributes = [
    { id: 'name', value: 'Product Name' },
    { id: 'description', value: 'Description' },
    { id: 'price', value: 'Price per unit' },
    { id: 'total_qty', value: 'Total in hand quantity' }
  ];

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [captureProduct, setCaptureProduct] = useState({
    name: '', description: '', price: '', total_qty: '', category: []
  });
  const [category, setCategory] = useState('');
  const [showMsg, setShowMsg] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const addProductData = (key, value) => {
    setShowMsg('');
    setCaptureProduct(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const fetchCategories = () => {
    APIService().retrieveCategories()
      .then(data => {
        if (data?.success) {
          setCategoryList(data?.categories);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (type === 'product') {
      fetchCategories();
    }
  }, [type]);

  const saveProduct = async () => {
    setLoading(true);
    const requiredFields = ['name', 'description', 'price', 'total_qty'];
    const hasEmptyFields = requiredFields.some(key => !captureProduct[key]) || captureProduct.category.length === 0;

    if (hasEmptyFields || imageFiles.length === 0) {
      setShowMsg('Please fill in all the details and upload images.');
      setTimeout(() => setShowMsg(''), 2000);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', captureProduct.name);
    formData.append('description', captureProduct.description);
    formData.append('price', captureProduct.price);
    formData.append('total_qty', captureProduct.total_qty);
    formData.append('categories', JSON.stringify(captureProduct.category)); // Array of {id, name}

    Array.from(imageFiles).forEach(file => {
      formData.append('images', file); // Django expects multiple files with same key
    });

    addProductToDB(formData)
  };

  const saveCategory = () => {
    if (category === '') {
      setShowMsg('Please fill in all the details');
      setTimeout(() => setShowMsg(''), 1000);
      return;
    }
    APIService().saveCategory(category).then((data) => {
      if (data.success) {
        setShowMsg('Category added successfully');
        setTimeout(() => {
          setShowMsg('');
          setCategory('');
        }, 1000);
      } else {
        setShowMsg('Category already exists!');
        setTimeout(() => setShowMsg(''), 1000);
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  const renderProductForm = () => (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        width: '100%',
        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      <Box sx={{ flex: '1 1 calc(50% - 8px)' }}>
        <Typography variant="body2" gutterBottom>Categories</Typography>
        <Autocomplete
          multiple
          value={captureProduct.category}
          onChange={(e, value) => addProductData('category', value)}
          options={categoryList}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Select Categories" fullWidth />}
        />
      </Box>

      {productAttributes.map((item) => (
        <Box key={item.id} sx={{ flex: '1 1 calc(50% - 8px)' }}>
          <Typography variant="body2" gutterBottom>{item.value}</Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={item.id === 'price' || item.id === 'total_qty' ? 'number' : 'text'}
            onChange={(e) => addProductData(item.id, e.target.value)}
            value={captureProduct[item.id]}
          />
        </Box>
      ))}

      <Box sx={{ flex: '1 1 calc(50% - 8px)' }}>
        <Typography variant="body2" gutterBottom>Images</Typography>
        <TextField
          fullWidth
          variant="outlined"
          type="file"
          inputProps={{ multiple: true }}
          onChange={(e) => setImageFiles(e.target.files)}
        />
      </Box>

      <Box sx={{ flex: '1 1 100%', textAlign: 'right' }}>
        <Button variant="contained" onClick={saveProduct}>
          Save
        </Button>
      </Box>
    </Box>
  );

  const renderCategoryForm = () => (
    <>
      <div className={styles.modal_item} key="category">
        <div className={styles.modal_item_label}>Category</div>
        <div className={styles.modal_item_input}>
          <TextField
            variant="outlined"
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
      </div>
      <Button variant="contained" onClick={saveCategory}>
        Save
      </Button>
    </>
  );

  return (
    <>
      {loading && <div className='loader-overlay'><div className='loader' /></div>}
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        {showMsg && <div className={styles.message}>{showMsg}</div>}
        {type === 'product' ? renderProductForm() : renderCategoryForm()}
      </div>
    </>
  );
};

export default AddProductModal;
