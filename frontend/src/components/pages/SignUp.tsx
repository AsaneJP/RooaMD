import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Link, Typography } from '@mui/material'

export const SignUp = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      repassword: data.get('repassword'),
      allow: data.get('allow'),
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email" />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repassword"
            label="RePassword"
            type="password"
            id="repassword"
            autoComplete="new-password"
          />
          <FormControlLabel
            control={<Checkbox id="allow" name="allow" value="allow" color="primary" />}
            label="利用規約に同意します"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            新規登録
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography>
                <Link underline="always" href="/signin">
                  ログイン
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
