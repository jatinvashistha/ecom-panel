import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
function Logout() {
    const navigate = useNavigate();

    const logout =() =>{
        alert("log out clicked")
        localStorage.clear();
        window.location.reload();
        navigate('/');

    }

    useEffect(() => {
        logout();
    }, []);

  return (
    
    <div>
        
    </div>
  )
}

export default Logout