import React, { useEffect, useState } from "react";
import "../CSS/Profile.css";
import PostDetail from "./PostDetail";
import { useParams, useSearchParams } from "react-router-dom";
export default function UserProfile() {

  var picLink = "https://cdn-icons-png.flaticon.com/128/201/201634.png"

  // var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  // const [pic, setPic] = useState([]);
    const { userid } = useParams()
    const [isFollow, setIsFollow] = useState(false)
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("")
  const [changePic, setChangePic] = useState(false)
  const [pic, setPic] = useState([]);

// to follow user
  const followUser = (userId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsFollow(true);
      });
    };
    

     // to unfollow user
  const unfollowUser = (userId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setIsFollow(false);
      });
  };

    
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
        .then((result) => {
          console.log(result)
          setUser(result.user)
            setPosts(result.posts);

            if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setIsFollow(true);
        }
      });
  }, [isFollow]);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            // src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            src={user.Photo ? user.Photo : picLink}
            
            alt=""
          />
        </div>
              <div className="profile-data">
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <h1>{user.name}</h1>
                      <button className="followBtn"
                          onClick={() => {
                              if (isFollow) {
                                  unfollowUser(user._id)
                              } else {
                                  
                                  followUser(user._id)
                              }
                          }}>
                          {isFollow ? "Unfollow":"Follow"}
                      </button>
                  </div>
          <div className="profile-info" style={{ display: "flex" }}>
                      <p>{posts.length} posts</p>
                      <p>{user.followers ? user.followers.length:"0" } followers</p>
                      <p>{user.following ? user.following.length:"0" } following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          margin: "auto",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      <div className="gallery">
        {posts.map((pics) => {
          return <img key={pics._id} src={pics.photo}
            // onClick={() => {
            //   toggleDetails(pics)
            // }}
            className="items"
          ></img>;
        })}
      </div>
      {/* {show &&
        
        <PostDetail item={posts} toggleDetails={toggleDetails}></PostDetail>

      } */}


    </div>
  );
}
