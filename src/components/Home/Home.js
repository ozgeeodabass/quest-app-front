import React, { useState, useEffect } from "react";
import Post from '../Post/Post'
import PostForm from '../Post/PostForm'
import Container from '@mui/material/Container';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';


export default function Home() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () =>{

    fetch("/api/posts/getall")
    .then(res => res.json())
    .then((result) => {
      setIsLoaded(true);
      setPostList(result);
    },
      (error) => {
        setIsLoaded(true);
        setError(error);
      })
  }

  useEffect(() => {
   refreshPosts()
  }, [postList])

  if (error) {
    return <div>Error!</div>
  } else if (!isLoaded) {
    return <div><HourglassTopIcon /> Loading...</div>
  } else {
    return (
      <Container style={{
        display: "flex", flexWrap: "wrap",
        justifyContent: "center", alignItems: "center", height: "100vh"
      }} fixed>
        <div>
          <PostForm style={{margin:"20"}} userId={1} userName={"Özge"} refreshPosts={refreshPosts}/>

        {postList.map(post => (
          <Post likes ={post.postLikes} postId={post.id} title={post.title} text={post.text} userId={post.userId} userName={post.userName}></Post>
        ))}
        </div>

      </Container>


    );
  }


}
