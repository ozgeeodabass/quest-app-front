import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { InputAdornment } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function Post(props) {
    const { userId, userName, refreshPosts } = props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        fetch("/api/posts/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }


    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    };

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    };

    return (
        <Card sx={{ width: 800 }} style={{ margin: 20 }}>

            <div>
                <Accordion defaultChecked>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography color="#757575">What's going on {userName}...</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardHeader
                            avatar={
                                <Link to={`/users/${userId}`} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>

                                    <Avatar sx={{ color: "black", bgcolor: "#64dd17" }} aria-label="recipe">
                                        {userName.charAt(0).toUpperCase()}
                                    </Avatar>

                                </Link>
                            }
                            title={<OutlinedInput id="outlined-adorment-amount" multiline placeholder="Title" inputProps={{ maxLenght: 25 }} fullWidth
                                value={title}
                                onChange={(i) => handleTitle(i.target.value)}>
                            </OutlinedInput>}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {<OutlinedInput id="outlined-adorment-amount" multiline placeholder="Text" inputProps={{ maxLenght: 250 }} fullWidth
                                    value={text}
                                    onChange={(i) => handleText(i.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Button endIcon={<SendIcon />} color="success" onClick={handleSubmit}>
                                            </Button>
                                        </InputAdornment>
                                    }>
                                </OutlinedInput>}
                            </Typography>

                            <Snackbar open={isSent} autoHideDuration={6000} onClose={handleClose}>
                                <Alert
                                    onClose={handleClose}
                                    severity="success"
                                    sx={{ width: '100%' }}
                                >
                                    Post is successfully created!
                                </Alert>
                            </Snackbar>
                        </CardContent>
                    </AccordionDetails>
                </Accordion>
            </div>

        </Card>
    )
}

