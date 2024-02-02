import { Avatar, CardContent, Chip, InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';


export default function Comment(props) {

    const { text, userId, userName } = props;
    return (
        <CardContent>
            <OutlinedInput
                disabled
                id="outlined-adorment-amount"
                multiline
                fullWidth
                value={ text }
                startAdornment={
                    <InputAdornment position='start'>
                        <Link to={`/users/${userId}`} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>

                            <Chip variant="outlined"
                                avatar={<Avatar sx={{ color: "black", bgcolor: "#64dd17" }} aria-label="recipe">
                                    {userName.charAt(0).toUpperCase()}
                                </Avatar>}
                                label={userName}
                            />

                        </Link>
                    </InputAdornment>
                }
                style={{color:"black", backgroundColor:"#e8f5e9"}}>

            </OutlinedInput>
        </CardContent>
    )
}
