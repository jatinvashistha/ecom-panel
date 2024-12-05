 import React, { useEffect, useState } from 'react';
 import {
   Box,
   Button,
   Container,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Grid,
   IconButton,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
   Avatar,
 } from '@mui/material';
 import { Edit, Delete } from '@mui/icons-material';
 import axios from 'axios';
 import { APIURL } from 'src/Url';

 const AllProduct = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
   const [formData, setFormData] = useState({
     name: '',
     description: '',
     price: '',
     rating: '',
     sizes: [{ size: '', quantity: '' }],
     image: null,  
   });
   const [previewImage, setPreviewImage] = useState(null);  

   const fetchProducts = async () => {
     setLoading(true);
     try {
       const response = await axios.get(`${APIURL}api/admin/getAllProducts`);
       setProducts(response.data.data);
     } catch (error) {
       console.error('Error fetching products:', error);
     } finally {
       setLoading(false);
     }
   };

   useEffect(() => {
     fetchProducts();
   }, []);

   const handleUpdateClick = (product) => {
     setSelectedProduct(product);
     setFormData({
       name: product.name,
       description: product.description,
       price: product.price,
       rating: product.rating,
       sizes: product.sizes,
       image: null,  
     });
     setPreviewImage(null);  
     setOpenUpdateDialog(true);
   };

   const handleUpdateProduct = async () => {
     try {
       const formDataObj = new FormData();
       formDataObj.append('name', formData.name);
       formDataObj.append('description', formData.description);
       formDataObj.append('price', formData.price);
       formDataObj.append('rating', formData.rating);
       formDataObj.append('sizes', JSON.stringify(formData.sizes));
       if (formData.image) {
         formDataObj.append('image', formData.image);
       }

       await axios.put(`${APIURL}api/admin/updateProduct/${selectedProduct._id}`, formDataObj);
       fetchProducts();
       setOpenUpdateDialog(false);
     } catch (error) {
       console.error('Error updating product:', error);
     }
   };

   const handleDeleteClick = (product) => {
     setSelectedProduct(product);
     setOpenDeleteDialog(true);
   };

   const handleDeleteProduct = async () => {
     try {
       await axios.delete(`${APIURL}api/admin/deleteProduct/${selectedProduct._id}`);
       fetchProducts();
       setOpenDeleteDialog(false);
     } catch (error) {
       console.error('Error deleting product:', error);
     }
   };

   const handleFormChange = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };

   const handleSizeChange = (index, field, value) => {
     const updatedSizes = [...formData.sizes];
     updatedSizes[index][field] = value;
     setFormData({ ...formData, sizes: updatedSizes });
   };

   const addSizeField = () => {
     setFormData({
       ...formData,
       sizes: [...formData.sizes, { size: '', quantity: '' }],
     });
   };

   const removeSizeField = (index) => {
     const updatedSizes = formData.sizes.filter((_, i) => i !== index);
     setFormData({ ...formData, sizes: updatedSizes });
   };

   const handleImageUpload = (e) => {
     const file = e.target.files[0];
     if (file) {
       setFormData({ ...formData, image: file });  
       setPreviewImage(URL.createObjectURL(file));  
     }
   };

   return (
     <Container maxWidth="lg">
       <Typography variant="h4" gutterBottom>
         All Products
       </Typography>
       <TableContainer component={Paper}>
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>Image</TableCell>
               <TableCell>Name</TableCell>
               <TableCell>Description</TableCell>
               <TableCell>Price</TableCell>
               <TableCell>Rating</TableCell>
               <TableCell>Actions</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {products.map((product) => (
               <TableRow key={product._id}>
                 <TableCell>
                   <Avatar variant="rounded" src={product.image} alt={product.name} />
                 </TableCell>
                 <TableCell>{product.name}</TableCell>
                 <TableCell>{product.description}</TableCell>
                 <TableCell>₹{product.price}</TableCell>
                 <TableCell>{product.rating}</TableCell>
                 <TableCell>
                   <IconButton onClick={() => handleUpdateClick(product)}>
                     <Edit />
                   </IconButton>
                   <IconButton onClick={() => handleDeleteClick(product)}>
                     <Delete />
                   </IconButton>
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>

       {/* Update Dialog */}
       <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
         <DialogTitle>Update Product</DialogTitle>
         <DialogContent>
           <Grid container spacing={2}>
             <Grid item xs={12}>
               <TextField
                 fullWidth
                 label="Name"
                 name="name"
                 value={formData.name}
                 onChange={handleFormChange}
               />
             </Grid>
             <Grid item xs={12}>
               <TextField
                 fullWidth
                 label="Description"
                 name="description"
                 value={formData.description}
                 onChange={handleFormChange}
               />
             </Grid>
             <Grid item xs={6}>
               <TextField
                 fullWidth
                 label="Price"
                 name="price"
                 value={formData.price}
                 onChange={handleFormChange}
               />
             </Grid>
             <Grid item xs={6}>
               <TextField
                 fullWidth
                 label="Rating"
                 name="rating"
                 value={formData.rating}
                 onChange={handleFormChange}
               />
             </Grid>
             <Grid item xs={12}>
               <Typography variant="subtitle1">Sizes</Typography>
               {formData.sizes.map((size, index) => (
                 <Box key={index} display="flex" alignItems="center" gap={2} my={1}>
                   <TextField
                     label="Size"
                     value={size.size}
                     onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                   />
                   <TextField
                     label="Quantity"
                     type="number"
                     value={size.quantity}
                     onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                   />
                   <Button color="error" onClick={() => removeSizeField(index)}>
                     Remove
                   </Button>
                 </Box>
               ))}
               <Button onClick={addSizeField}>Add Size</Button>
             </Grid>
             <Grid item xs={12}>
               <Typography variant="subtitle1">Image</Typography>
               <Box display="flex" gap={2} alignItems="center">
                 {/* Existing Image */}

                 {/* Preview of New Image */}
                 {previewImage && (
                   <Avatar
                     variant="rounded"
                     src={previewImage}
                     alt="Selected"
                     sx={{ width: 100, height: 100 }}
                   />
                 )}
               </Box>
               <Button variant="outlined" component="label">
                 Upload New Image
                 <input type="file" hidden onChange={handleImageUpload} />
               </Button>
             </Grid>
           </Grid>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleUpdateProduct} color="primary" variant="contained">
             Update
           </Button>
           <Button onClick={() => setOpenUpdateDialog(false)} color="secondary">
             Cancel
           </Button>
         </DialogActions>
       </Dialog>

       {/* Delete Dialog */}
       <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
         <DialogTitle>Confirm Delete</DialogTitle>
         <DialogContent>
           Are you sure you want to delete the product <b>{selectedProduct?.name}</b>?
         </DialogContent>
         <DialogActions>
           <Button onClick={handleDeleteProduct} color="error" variant="contained">
             Delete
           </Button>
           <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
             Cancel
           </Button>
         </DialogActions>
       </Dialog>
     </Container>
   );
 };

 export default AllProduct;
