import React, { useEffect, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Chip, CircularProgress, Container, Divider } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Post(props) {

  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const refreshComments = () => {
    fetch("/api/comments/getall?postId=" + postId)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCommentList(result);
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComments()
    }
  }, [commentList])

  const { title, text, userId, userName, postId } = props;

  return (
    <Card sx={{ width: 800 }} style={{ margin: 20 }} elevation={3}>
      <CardHeader
        avatar={
          <Link to={`/users/${userId}`} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>

            <Chip
              avatar={<Avatar sx={{ color: "black", bgcolor: "#64dd17" }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>}
              label={userName}
              variant="outlined"
            />

          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike} aria-label="add to favorites">
          <FavoriteBorderIcon style={liked ? { color: "#64dd17" } : null} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ChatBubbleOutlineIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <Divider textAlign="left">Comments</Divider>

        <Container fixed >
          {error ? "error" : isLoaded ?
            commentList.map(comment => (
              <Comment text={comment.text} userId={1} userName={"username"}></Comment>
            )) : <CircularProgress color="inherit" />
          }

          <CommentForm userId={1} postId={postId}></CommentForm>
        </Container>
      </Collapse>
    </Card>
  )
}

