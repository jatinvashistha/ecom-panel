 import React, { useState } from 'react';
 import axios from 'axios';
 import { TextField, Button, Typography, Box, Grid, Container, Avatar } from '@mui/material';
 import { APIURL } from 'src/Url';

 const AddProduct = () => {
   const [productData, setProductData] = useState({
     name: '',
     description: '',
     price: '',
     rating: '',
     sizes: [],
   });
   const [image, setImage] = useState(null);
   const [preview, setPreview] = useState(null);
   const [sizeFields, setSizeFields] = useState([{ size: '', quantity: '' }]);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');

   const handleInputChange = (e) => {
     const { name, value } = e.target;
     setProductData({ ...productData, [name]: value });
   };

   const handleSizeChange = (index, e) => {
     const { name, value } = e.target;
     const newSizes = [...sizeFields];
     newSizes[index][name] = value;
     setSizeFields(newSizes);
   };

   const addSizeField = () => {
     setSizeFields([...sizeFields, { size: '', quantity: '' }]);
   };

   const removeSizeField = (index) => {
     const newSizes = sizeFields.filter((_, i) => i !== index);
     setSizeFields(newSizes);
   };

   const handleImageUpload = (e) => {
     const file = e.target.files[0];
     setImage(file);
     setPreview(URL.createObjectURL(file));  
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     setMessage('');

     try {
       const formData = new FormData();
       formData.append('name', productData.name);
       formData.append('description', productData.description);
       formData.append('price', productData.price);
       formData.append('rating', productData.rating);
       formData.append('sizes', JSON.stringify(sizeFields));
       formData.append('image', image);

       const response = await axios.post(`${APIURL}api/admin/addProduct`, formData, {
         headers: { 'Content-Type': 'multipart/form-data' },
       });

       setMessage(response.data.message);
        setProductData({
         name: '',
         description: '',
         price: '',
         rating: '',
         sizes: [],
       });
       setSizeFields([{ size: '', quantity: '' }]);
       setImage(null);
       setPreview(null);
     } catch (error) {
       setMessage(error.response?.data?.message || 'An error occurred');
     } finally {
       setLoading(false);
     }
   };

   return (
     <Container maxWidth="md">
       <Typography variant="h4" gutterBottom>
         Add Product
       </Typography>
       <form onSubmit={handleSubmit}>
         <Box mb={2}>
           <TextField
             fullWidth
             label="Product Name"
             name="name"
             value={productData.name}
             onChange={handleInputChange}
             required
           />
         </Box>
         <Box mb={2}>
           <TextField
             fullWidth
             label="Description"
             name="description"
             value={productData.description}
             onChange={handleInputChange}
             multiline
             rows={4}
             required
           />
         </Box>
         <Box mb={2}>
           <TextField
             fullWidth
             label="Price"
             name="price"
             type="number"
             value={productData.price}
             onChange={handleInputChange}
             required
           />
         </Box>
         <Box mb={2}>
           <TextField
             fullWidth
             label="Rating"
             name="rating"
             type="number"
             value={productData.rating}
             onChange={handleInputChange}
             inputProps={{ min: 0, max: 5 }}
             required
           />
         </Box>
         <Typography variant="h6" gutterBottom>
           Sizes
         </Typography>
         {sizeFields.map((field, index) => (
           <Grid container spacing={2} key={index} alignItems="center">
             <Grid item xs={5}>
               <TextField
                 fullWidth
                 label="Size"
                 name="size"
                 value={field.size}
                 onChange={(e) => handleSizeChange(index, e)}
                 required
               />
             </Grid>
             <Grid item xs={5}>
               <TextField
                 fullWidth
                 label="Quantity"
                 name="quantity"
                 type="number"
                 value={field.quantity}
                 onChange={(e) => handleSizeChange(index, e)}
                 required
               />
             </Grid>
             <Grid item xs={2}>
               {index > 0 && (
                 <Button color="error" onClick={() => removeSizeField(index)}>
                   Remove
                 </Button>
               )}
             </Grid>
           </Grid>
         ))}
         <Button onClick={addSizeField} variant="outlined" style={{ marginTop: '10px' }}>
           Add Size
         </Button>
         <Box mb={2} mt={2}>
           <input type="file" accept="image/*" onChange={handleImageUpload} required />
         </Box>
         {preview && (
           <Box mb={2}>
             <Avatar
               alt="Selected Image"
               src={preview}
               variant="rounded"
               style={{ width: 100, height: 100 }}
             />
           </Box>
         )}
         <Button type="submit" variant="contained" color="primary" disabled={loading}>
           {loading ? 'Adding...' : 'Add Product'}
         </Button>
       </form>
       {message && (
         <Typography color={message.includes('success') ? 'green' : 'error'} mt={2}>
           {message}
         </Typography>
       )}
     </Container>
   );
 };

 export default AddProduct;
