import React,{useContext}  from 'react'
import instagram from "../IMG/instagram.png"
import "../CSS/Navbar.css"
import { Link } from 'react-router-dom'
import Signin from './Signin'
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom'
export default function Navbar({ login }) {
  const navigate=useNavigate()
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt")
    if (login || token) {
      return [
        <>
          
           <Link to="/profile">
        <li>Profile</li>

          </Link>
          
        <Link to="/createPost">
        Create post

          </Link>
          <Link style={{marginLeft:"20px"}} to="/followingpost"> My following
          </Link>
          <Link to={""}>
            <button className='primaryBtn'
              onClick={() => setModalOpen(true)}>Log Out</button>
          </Link>
        </>
      ]
      
    } else {
      return [
        <>
          <Link to="/signup">
        <li>SignUp</li>

        </Link>
        <Link to="/signin">
        <li>SignIn</li>

        </Link>
        
        </>
      ]
      
    }
  }

  return (
    <div className='navbar'>
      <img src={instagram} alt=" "  onClick={()=>{navigate("/")}}/>
      <ul className='nav-menu'>
        {loginStatus()}
       
        
       

      </ul>
    </div>
  )
}
