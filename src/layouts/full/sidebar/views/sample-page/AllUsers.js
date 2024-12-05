 import React, { useEffect, useState } from 'react';
 import axios from 'axios';
 import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   CircularProgress,
   Typography,
 } from '@mui/material';
 import { APIURL } from 'src/Url';

 const AllUsers = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');

   useEffect(() => {
     const fetchUsers = async () => {
       try {
         const response = await axios.get(`${APIURL}api/admin/users`);  
         setUsers(response.data?.data?.users || []);  
       } catch (err) {
         setError(err.response?.data?.message || 'Error fetching users');
       } finally {
         setLoading(false);
       }
     };

     fetchUsers();
   }, []);

   return (
     <div style={{ padding: '20px' }}>
       <Typography variant="h4" gutterBottom>
         All Users
       </Typography>
       {loading ? (
         <CircularProgress />
       ) : error ? (
         <Typography color="error">{error}</Typography>
       ) : (
         <TableContainer component={Paper}>
           <Table>
             <TableHead>
               <TableRow>
                 <TableCell>ID</TableCell>
                 <TableCell>Name</TableCell>
                 <TableCell>Email</TableCell>
                 <TableCell>Role</TableCell>
                 <TableCell>Created At</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {users.map((user) => (
                 <TableRow key={user._id}>
                   <TableCell>{user._id}</TableCell>
                   <TableCell>{user.name}</TableCell>
                   <TableCell>{user.email}</TableCell>
                   <TableCell>{user.role}</TableCell>
                   <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </TableContainer>
       )}
     </div>
   );
 };

 export default AllUsers;
