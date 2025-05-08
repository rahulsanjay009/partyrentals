import { useEffect, useState } from 'react';
import styles from './InventoryConsole.module.css'
import AddIcon from '@mui/icons-material/Add';
import {TableCell, TableContainer, TableHead, TableRow, Paper, Table, TableBody, Button, TextField, Snackbar, Box} from '@mui/material';
import APIService from '../../services/APIService';
import SearchFilterAddInventory from './SearchFilterAddInventory';
import AddProductModal from './AddProductModal';

const InventoryConsole = () => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [originalProducts,setOriginalProducts] = useState([])
    const [showAddProductModal,setShowAddProductModal] = useState(false)
    const [showAddCategory,setShowAddCategory] = useState(false);
    const [message, setMessage] = useState('')
    const [loader,setLoader] = useState(false)

    useEffect(()=>{
        setLoader(true)
        fetchProducts()
    },[])
    const fetchProducts = () => {
        APIService().fetchProducts().then((res) => {
            if(res.success){
                setProducts(res?.products);
                setOriginalProducts(res?.products)
            }
        }).catch((err) => console.log(err)).finally(()=>{
            setLoader(false);
        })
    }
    const addProductModal = (value) => {
        setShowAddProductModal(value)        
    }
    const retrieveAvailability = (fromDate, toDate) => {
        setLoader(true)
        APIService().fetchAvailability(fromDate,toDate).then((res) => {
            if(res?.success){
                const availabilityDict =  res?.availableProducts.reduce((acc, item) => {
                    acc[item.product_id] = item.available_qty;
                    return acc;
                }, {});
                const updatedProducts = products.map(product => {
                    const availableQty = availabilityDict[product.id] || 0;  // Default to 0 if no availability is found
                    return { ...product, available_qty: availableQty < 0? 0 : availableQty };
                });
                setProducts(updatedProducts) 
                setMessage('Availability retrieved')         
            }
            else{
                setMessage(res.error)
            }
        }).catch((err) => console.log(err)).finally(()=>{setLoader(false)})
    }

    const handleEditProduct = (product) => {
        setEditingProduct({ ...product }); 
    };
    
    // Save edited product
    const saveEditedProduct = (updatedProduct) => {
        setLoader(true);
        
        const formData = new FormData();
        formData.append('id', updatedProduct.id);
        formData.append('name', updatedProduct.name);
        formData.append('description', updatedProduct.description || '');
        formData.append('price', updatedProduct.price);
        formData.append('total_qty', updatedProduct.total_qty);
        formData.append('category', updatedProduct.category);
    
        if (updatedProduct.imageFile) {
            formData.append('image', updatedProduct.imageFile);  // Must match backend key
        }
    
        APIService().editProduct(formData)
            .then((res) => {
                if (res.success) {
                    updatedProduct.image_url = res.image_url
                    const updatedProducts = products.map((product) =>
                        product.id === updatedProduct.id ? updatedProduct : product
                    );
                    setProducts(updatedProducts);
                    setEditingProduct(null);
                    setMessage('Item details saved...');
                } else {
                    setMessage(res.error);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setLoader(false));
    };
    
    
    // Delete product handler
    const handleDeleteProduct = (productId) => {
        setLoader(true)
        APIService().deleteProduct(productId).then((res) => {
        if (res.success) {
            // Remove the deleted product from the list
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
            setMessage('Item Deleted')
        } else {
            setMessage(res?.error)
        }
        }).catch((err) =>  console.log(err)).finally(()=>{setLoader(false)});
    };
    
    const filterProducts = (filteredProducts) =>{
        // console.log(filteredProducts.length)
        if(filteredProducts.length == 0)
            setProducts(originalProducts)
        else   
            setProducts(originalProducts.filter((product) => filteredProducts.some((item) => item?.id === product?.id)))
    }
    return (
        <div className=''>
            <SearchFilterAddInventory addProductModal={addProductModal} retrieveAvailability={retrieveAvailability} products={originalProducts} filteredProducts={filterProducts}/>
            
            {showAddProductModal && (
            <div className={styles.modal} onClick={() => setShowAddProductModal(false)}>
                <AddProductModal type='product' updateMessage={setMessage} updateShowAddCategory={setShowAddProductModal}/>
            </div>)}
            
            {showAddCategory && (
            <div className={styles.modal} onClick={() => setShowAddCategory(false)}>
                <AddProductModal type='category' updateMessage={setMessage} updateShowAddCategory={setShowAddCategory}/>
            </div>)}

            <Snackbar
                          open={message!==''}
                          autoHideDuration={5000}
                          onClose={() => setMessage('')}
                          message={message}                        
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        />
            <div className={styles.inventory_layout}>            
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}}>                    
                        <TableHead>
                            <TableRow>
                                <TableCell size='medium'> S.NO </TableCell>
                                <TableCell  size='medium' > Product </TableCell>
                                <TableCell  size='medium' className={styles.category_cell}>     
                                    Category 
                                    <Button onClick={() => setShowAddCategory(true)}><AddIcon className={styles.plus_icon}/> </Button>
                                </TableCell>   
                                <TableCell size='medium' > Image </TableCell>         
                                <TableCell size='medium' > Price per unit </TableCell>
                                <TableCell size='medium' > Total Qty </TableCell>
                                <TableCell size='medium' > Available Qty </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.map((item, idx) => (
                                <TableRow key={item.id}>
                                <TableCell> {idx + 1} </TableCell>
                                <TableCell sx={{maxWidth:'250px'}}>
                                    {editingProduct?.id === item.id ? (
                                    <TextField
                                        value={editingProduct?.name}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                    />
                                    ) : (
                                    item.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingProduct?.id === item.id ? (
                                    <TextField
                                        value={editingProduct?.category}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                    />
                                    ) : (
                                    item.category
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingProduct?.id === item.id ? (
                                        <>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setEditingProduct({ 
                                                    ...editingProduct, 
                                                    imageFile: e.target.files[0] 
                                                })}
                                                style={{marginBottom:'5px'}}
                                            /> 
                                            {editingProduct?.image_url && <img src={editingProduct.image_url} alt="" width={50} />}
                                        </>
                                    ) : (
                                        <img src={`${item.image_url}`} alt={''} height='75' width='75'/>
                                    )}
                                </TableCell>


                                <TableCell>
                                    {editingProduct?.id === item.id ? (
                                    <TextField
                                        value={editingProduct?.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                    />
                                    ) : (
                                    item.price
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingProduct?.id === item.id ? (
                                    <TextField
                                        value={editingProduct?.total_qty}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, total_qty: e.target.value })}
                                    />
                                    ) : (
                                    item.total_qty
                                    )}
                                </TableCell>
                                <TableCell>
                                    {
                                        item.available_qty
                                    }
                                </TableCell>
                                <TableCell>
                                    <Box display={'flex'} gap={'15px'}>
                                    {editingProduct?.id === item.id ? (
                                        <>
                                            <Button onClick={() => saveEditedProduct(editingProduct)}>Save</Button>
                                            <Button onClick={() => setEditingProduct(null)}>Cancel</Button>
                                        </>                                    
                                    ) : (
                                        <>
                                            <Button onClick={() => handleEditProduct(item)}>Edit</Button>
                                            <Button onClick={() => handleDeleteProduct(item.id)}>Delete</Button>
                                        </>
                                    
                                    )}
                                    
                                    </Box>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>

                    </Table>
                </TableContainer>
            </div>
            { loader && <div className='loader-overlay'> <div className='loader'> </div> </div>}
        </div>
    )
}

export default InventoryConsole;