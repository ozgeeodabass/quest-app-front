import { Button, Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

export default function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const sendRequest = (path) => {
        fetch("/auth" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => result)
            .catch((err) => console.log(err))
    }

    const handleRegister = () => {
        sendRequest("register")
        setUsername("")
        setPassword("")
    }

    const handleLogin = () => {
        sendRequest("login")
        setUsername("")
        setPassword("")
    }


    return (

        <Container style={{ marginTop: 20 }}>
            <div>

                <FormControl style={{ margin: 10, width: 400 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-usernme"
                        type={'username'}
                        onChange={((i) => handleUsername(i.target.value))}
                        endAdornment={
                            <InputAdornment position="end">
                                <PersonOutlineRoundedIcon />
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

            </div>
            <div>
                <FormControl style={{ margin: 10, width: 400 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={'password'}
                        onChange={((i) => handlePassword(i.target.value))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </div>
            <div>
                <Button style={{ backgroundColor: "#64dd17", margin: 10 }} variant="contained" onClick={() => handleRegister}>Kayıt Ol</Button>
                <FormHelperText style={{ textAlign: 'center' }}>Zaten bir hesabın var mı?</FormHelperText>
                <Button style={{ backgroundColor: "#64dd17", margin: 10 }} variant="contained" onClick={() => handleLogin}>Giriş Yap</Button>
            </div>
        </Container>


    )
}
