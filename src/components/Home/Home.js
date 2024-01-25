import React, { useState, useEffect } from "react";
import Post from '../Post/Post'
import Container from '@mui/material/Container';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';


export default function Home() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
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
  }, [])

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

        {postList.map(post => (
          <Post title={post.title} text={post.text} userId={post.userId} userName={post.userName}></Post>
        ))}

      </Container>


    );
  }


}
