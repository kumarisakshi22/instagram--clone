import React,{useState,useEffect} from 'react'

import "../CSS/Createpost.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Createpost() {
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("")
    const notifyA=(msg)=>toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
    const navigate = useNavigate();
    useEffect(() => {

        if (url) {
            fetch("http://localhost:5000/createPost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
                
            },
            body: JSON.stringify({
                body,
                pic : url
            })
        }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        notifyA(data.error)
                        
                    } else {
                        notifyB("succesfully posted")
                        navigate("/")
            }})
            .catch(err => console.log(err))
        
        
    }
        
        
    
    }, [url])
    

    //posting image to cloudinary
    const postDetails = () => {
        console.log(body, image)
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name", "instaclone2210")
        fetch("https://api.cloudinary.com/v1_1/instaclone2210/image/upload",
            {
                method: "post",
                body:data
            }
        ).then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))
        
        //saving post mongodb
        fetch("http://localhost:5000/createPost", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
                
            },
            body: JSON.stringify({
                body,
                pic : url
            })
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        
        
    }
    const loadfile = (event) => {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        
        }
    };
  return (
    <div className='createPost'>
          <div className="post-header">
              <h4 style={{margin:"3px auto"}}>Create New Post</h4>
              <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
              
          </div>
          <div className="main-div">
              <img id='output' src='https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png'/>
              <input type='file' accept='image/*' onChange={(event) => { loadfile(event); setImage(event.target.files[0])}}/>
              
          </div>
          <div className="details">
              <div className="card-header">
                  <div className="card-pic">
                      <img src="https://media.istockphoto.com/id/1184090513/photo/portrait-of-young-beautiful-woman-with-cheerful-expression.jpg?s=612x612&w=is&k=20&c=txA7zCwmF3ziVy5EnL5qtQ9TneIMmjTV3EFcr3PPCLg=" alt=""/>
                  </div>
                  <h5>Sakshi</h5>

              </div>
              <textarea value={body} onChange={(e) => {
                  setBody(e.target.value)
              }}type = 'text' placeholder = 'write a caption' ></textarea>
          </div>
    </div>
  )
}
