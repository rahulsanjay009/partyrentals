import { TextField, Button, Autocomplete, Box, Typography } from '@mui/material';
import styles from './InventoryConsole.module.css';
import { useEffect, useState } from 'react';
import APIService from '../../services/APIService';

const AddProductModal = ({ type, updateMessage, updateShowAddCategory }) => {
    const productAttributes = [
        { id: 'name', value: 'Product Name' },
        { id: 'description', value: 'Description' },
        { id: 'price', value: 'Price per unit' },
        { id: 'total_qty', value: 'Total in hand quantity' }
    ];

    const [image, setImage] = useState(null);
    const [captureProduct, setCaptureProduct] = useState({
        name: '', description: '', price: '', total_qty: '', category: ''
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
        APIService().fetchCategories().then((data) => {
            if (data?.success) {
                setCategoryList(data?.categories);
            }
        }).catch((err) => console.log(err));
    };

    useEffect(() => {
        if (type === 'product') {
            fetchCategories();
        }
    }, [type]);

    const saveProduct = async () => {
        // Check if any product field is empty
        const requiredFields = ['name', 'description', 'price', 'total_qty', 'category'];
        const hasEmptyFields = requiredFields.some(key => !captureProduct[key]);
    
        if (hasEmptyFields || !image) {
            setShowMsg('Please fill in all the details and upload an image.');
            setTimeout(() => setShowMsg(''), 2000);
            return;
        }

        const formData = new FormData();
        formData.append('name', captureProduct.name);
        formData.append('description', captureProduct.description);
        formData.append('price', captureProduct.price);
        formData.append('total_qty', captureProduct.total_qty);
        formData.append('category', captureProduct.category);
        formData.append('image', image);  // This sends the image file itself

        APIService().saveProduct(formData)
            .then(res => {                

                if (res.success) {
                    updateMessage('Product added successfully');
                    setCaptureProduct({
                        name: '', description: '', price: '', total_qty: '', category: ''
                    });
                    setImage(null);
                    updateShowAddCategory(false);
                } else {
                    setShowMsg('Product with the name already exists!!!');

                }
            })
            .catch((err) => {
                console.error(err);
                setShowMsg('An error occurred. Please try again.');
            })
            .finally(() => {
                setTimeout(() => setShowMsg(''), 2000);
                
            });

        
    };

    const saveCategory = () => {
        if (category === '') {
            setShowMsg('Please fill in all the details');
            setTimeout(() => {
                setShowMsg('');
            }, 1000);
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
                setTimeout(() => {
                    setShowMsg('');
                }, 1000);
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
            {/* Category Field + Price (Row 1) */}
            <Box sx={{ flex: '1 1 calc(50% - 8px)' }}>
                <Typography variant="body2" gutterBottom>
                    Category
                </Typography>
                <Autocomplete
                    value={captureProduct.category}
                    onChange={(e, value) => addProductData('category', value)}
                    disablePortal
                    options={categoryList}
                    renderInput={(params) => <TextField {...params} label="Select Category" fullWidth />}
                />
            </Box>

            {/* Dynamic Fields (Remaining Attributes) */}
            {productAttributes.map((item) => (
                <Box key={item.id} sx={{ flex: '1 1 calc(50% - 8px)' }}>
                    <Typography variant="body2" gutterBottom>
                        {item.value}
                    </Typography>
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
                <Typography variant="body2" gutterBottom>
                    Image
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Box>

            {/* Save Button (Row 3) */}
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
                <div className={styles.modal_item_label}>
                    Category
                </div>
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
        <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
            {showMsg && <div className={styles.message}>{showMsg}</div>}
            {type === 'product' ? renderProductForm() : renderCategoryForm()}
        </div>
    );
};

export default AddProductModal;
