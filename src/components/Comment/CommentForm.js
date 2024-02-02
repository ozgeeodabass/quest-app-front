import { Button, CardContent, InputAdornment, OutlinedInput, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react'

export default function CommentForm(props) {

    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);
    const { userId, postId } = props;

    const saveComment = () => {
        fetch("/api/comments/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    };

    const handleSubmit = () => {
        saveComment();
        setText("");
    };


    return (
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {<OutlinedInput id="outlined-adorment-amount" multiline placeholder="Write your comment.." inputProps={{ maxLenght: 250 }} fullWidth
                    value={text}
                    onChange={(i) => handleText(i.target.value)}
                    endAdornment={
                        <InputAdornment
                            position="end">
                            <Button endIcon={<SendIcon />} color="success"
                                onClick={handleSubmit}>
                            </Button>
                        </InputAdornment>
                    }>
                </OutlinedInput>}
            </Typography>
        </CardContent>
    )
}
