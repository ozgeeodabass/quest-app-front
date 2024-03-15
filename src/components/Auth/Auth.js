import { Button, Container, FormControl, FormHelperText, TextField } from '@mui/material'
import React from 'react'

export default function Auth() {
    return (
        <div>
            <Container>
                        <FormControl style={{margin:30}}>
                            <TextField style={{ marginBottom: 20 }} id="outlined-basic" label="Kullanıcı Adı" variant="outlined" />
                            <TextField style={{ marginBottom: 20 }} id="outlined-basic" label="Şifre" variant="outlined" />

                            <Button style={{ backgroundColor: "#64dd17" }} variant="contained">Kayıt Ol</Button>
                            <FormHelperText style={{marginLeft:40}}>Zaten bir hesabın var mı?</FormHelperText>
                            <Button style={{ backgroundColor: "#64dd17" }} variant="contained">Giriş Yap</Button>

                        </FormControl>
               

            </Container>
        </div>


    )
}
