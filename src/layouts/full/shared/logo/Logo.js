 import { Link } from 'react-router-dom';
 import logo from 'src/assets/images/logos/cursor.png';
 import { Box, styled } from '@mui/material';

 const LinkStyled = styled(Link)(() => ({
   height: '90px',
   width: '200px',
   overflow: 'hidden',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   textDecoration: 'none',
   marginTop: '20px',
   marginBottom: '10px',
   marginLeft: '-10px',
 }));

 const Logo = () => {
   return (
     <LinkStyled to="/">
       <img
         src={logo}
         alt="Logo"
         height={70}
         width={70} // Set width equal to height to make it a perfect circle
         style={{
           borderRadius: '50%', // Make the logo circular
           objectFit: 'cover', // Ensures the image scales properly within the circle
         }}
       />
       <span
         style={{
           marginTop: '25px',
           fontSize: '32px',
           color: 'black',
           fontWeight: 'bold',
           textDecoration: 'none',
         }}
       ></span>
     </LinkStyled>
   );
 };
 // const Logo = () => {
 //   return (
 //     <Box
 //       sx={{
 //         fontWeight: '900',
 //         fontSize: '35px',
 //         justifyContent: 'center',
 //         display: 'flex',
 //         color: '#FFE06B',
 //         mb:'10px'
 //       }}
 //     >
 //       LOGIN
 //     </Box>
 //   )
 // };

 export default Logo;
