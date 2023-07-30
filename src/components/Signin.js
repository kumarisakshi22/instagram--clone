import React,{useState,useContext} from 'react'
import "../CSS/Signin.css"
import logo from "../IMG/logo.png"
import { Link ,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';

export default function Signin() {
  const {setuserLogin }=useContext(LoginContext)
  const navigate  = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
const notifyA=(msg)=>toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const postData = () => {
        if (!emailRegex.test(email)) {
            notifyA("invalid emial")
            return
        } 
        
        // Sending data to server
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       
        email: email,
        password: password

      })
    }).then(res => res.json())
        
        .then(data => {
            if(data.error){

                notifyA(data.error)
            } else {
              notifyB("Signed in Succesfully")
              console.log(data);
              localStorage.setItem("jwt", data.token)
              localStorage.setItem("user",JSON.stringify(data.user) )
              setuserLogin(true)
                navigate("/")
            }
            console.log(data)
        })
        
    }













  return (

    <div className='signIn'>
          <div>
              <div className='loginForm'>
                <img className="signUpLogo" src={logo}  alt="" />
                       <div><input type="email" name=" email" id="email" placeholder='email' onChange={(e) => { setEmail(e.target.value) }}/>
                </div>
          <div>
                    <input type ="password" name ="password" id="password" placeholder='password' onChange={(e) => { setPassword(e.target.value) }}/>

            
                </div>
                <input type="submit" id="login-btn" value="SignIn" onClick={()=>{postData()}}></input>
                {/* <div><input type="email" name="email" placeholder='email'></input></div> */}
              </div>
              <div className='loginform2'>
                  Don't have an account?
                  <Link to="/signup">
                  <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
                  
                  </Link>
            </div>
          </div>
          
          </div>
  )
}





// import React, { useState } from 'react'
// import "./Signin.css"
// import logo from "../IMG/logo.png"
// import { Link } from 'react-router-dom'
// const Signin = () => {
//   return (
//       <div className='signIn'>
//           <div>
//               <div className='loginForm'>
//                 <img className="signUpLogo" src={logo}  alt="" />
//                 <div><input type="email" name="email" id =" email" placeholder='email'></input></div>
//                 <div><input type="Password" name="password" placeholder='password'></input></div>
//                 <input type="submit" id="login-btn" value="SignIn"></input>
//                 {/* <div><input type="email" name="email" placeholder='email'></input></div> */}
//               </div>
//               <div className='loginform2'>
//                   Don't have an account?
//                   <Link to="/signup">
//                   <span style={{color:"blue",cursor:"pointer"}}>Sign Up</span>
                  
//                   </Link>
//             </div>
//           </div>
          
//           </div>
      

      
//   )
// }

// export default Signin;




