 import React, { useState, useEffect } from 'react';
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
   Typography,
   Select,
   MenuItem,
   CircularProgress,
 } from '@mui/material';
 import { Edit } from '@mui/icons-material';
 import axios from 'axios';
 import { APIURL } from 'src/Url'; // Make sure to set your API URL correctly.

 const AllOrders = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
   const [newStatus, setNewStatus] = useState('');
   const [statusLoading, setStatusLoading] = useState(false);

    const fetchOrders = async () => {
     setLoading(true);
     try {
       const response = await axios.get(`${APIURL}api/admin/getAllOrders`);
       setOrders(response.data.data);
     } catch (error) {
       console.error('Error fetching orders:', error);
     } finally {
       setLoading(false);
     }
   };

    useEffect(() => {
     fetchOrders();
   }, []);

   const handleStatusChange = async () => {
     setStatusLoading(true);
     try {
       await axios.put(`${APIURL}api/admin/orderStatus`, {
         orderId: selectedOrder._id,
         status: newStatus,
       });
       fetchOrders();
       setOpenUpdateDialog(false);
     } catch (error) {
       console.error('Error updating order status:', error);
     } finally {
       setStatusLoading(false);
     }
   };

   const handleOpenUpdateDialog = (order) => {
     setSelectedOrder(order);
     setNewStatus(order.status);
     setOpenUpdateDialog(true);
   };

   const handleCloseUpdateDialog = () => {
     setOpenUpdateDialog(false);
     setSelectedOrder(null);
     setNewStatus('');
   };

   return (
     <Container maxWidth="lg">
       <Typography variant="h4" gutterBottom>
         All Orders
       </Typography>
       {loading ? (
         <CircularProgress />
       ) : (
         <TableContainer component={Paper}>
           <Table>
             <TableHead>
               <TableRow>
                 <TableCell>User</TableCell>
                 <TableCell>Products</TableCell>
                 <TableCell>Total Amount</TableCell>
                 <TableCell>Payment Method</TableCell>
                 <TableCell>Shipping Address</TableCell>
                 <TableCell>Status</TableCell>
                 <TableCell>Order Date</TableCell>
                 <TableCell>Actions</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {orders.map((order) => (
                 <TableRow key={order._id}>
                   <TableCell>
                     {order.user.name} ({order.user.email})
                   </TableCell>
                   <TableCell>
                     {order.products.map((prod) => (
                       <div key={prod.product._id}>
                         {prod.product.name} (x{prod.quantity}) - Size: {prod.size} - ₹{prod.price}
                       </div>
                     ))}
                   </TableCell>
                   <TableCell>₹{order.totalAmount}</TableCell>
                   <TableCell>{order.paymentMethod}</TableCell>
                   <TableCell>{order.shippingAddress}</TableCell>
                   <TableCell>{order.status}</TableCell>
                   <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                   <TableCell>
                     <IconButton color="primary" onClick={() => handleOpenUpdateDialog(order)}>
                       <Edit />
                     </IconButton>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
       )}

       {/* Update Order Status Dialog */}
       <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
         <DialogTitle>Update Order Status</DialogTitle>
         <DialogContent>
           <Grid container spacing={2}>
             <Grid item xs={12}>
               <Typography variant="subtitle1">Order ID: {selectedOrder?._id}</Typography>
               <Typography variant="subtitle1">
                 User: {selectedOrder?.user.name} ({selectedOrder?.user.email})
               </Typography>
               <Typography variant="subtitle2">
                 Shipping Address: {selectedOrder?.shippingAddress}
               </Typography>
               <Typography variant="subtitle2">
                 Payment Method: {selectedOrder?.paymentMethod}
               </Typography>
               <Typography variant="subtitle2">
                 Total Amount: ${selectedOrder?.totalAmount}
               </Typography>
             </Grid>
             <Grid item xs={12}>
               <Select fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                 <MenuItem value="Pending">Pending</MenuItem>
                 <MenuItem value="Shipped">Shipped</MenuItem>
                 <MenuItem value="Delivered">Delivered</MenuItem>
               </Select>
             </Grid>
           </Grid>
         </DialogContent>
         <DialogActions>
           <Button
             onClick={handleStatusChange}
             color="primary"
             variant="contained"
             disabled={statusLoading}
           >
             {statusLoading ? <CircularProgress size={24} color="inherit" /> : 'Update Status'}
           </Button>
           <Button onClick={handleCloseUpdateDialog} color="secondary">
             Cancel
           </Button>
         </DialogActions>
       </Dialog>
     </Container>
   );
 };

 export default AllOrders;
