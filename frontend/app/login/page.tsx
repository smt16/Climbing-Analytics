'use client'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { post } from '@/src/http.service';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingButton, Alert } from '@mui/lab';
import { AppBar } from '@mui/material';

export default function login() {
  const [loading, setLoading] = useState(false);
  const [invalidDetails, setInvalidDetails] = useState(false);
  const router = useRouter();

  const handleSetInvalidDetails = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    setInvalidDetails(false);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    await post('/auth/login', loginData)
      .then(res => {
        sessionStorage.setItem('user', JSON.stringify(res?.data));
        setLoading(false);
        router.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        setInvalidDetails(true);
        setLoading(false);
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position='static' style={{ display: 'flex', justifyContent: 'left' }}>
        <Typography variant='h2' marginLeft={'2vw'}>Climbing Analytics</Typography>
      </AppBar>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleSetInvalidDetails}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {invalidDetails &&
            <Alert severity="error">Invalid username or password</Alert>
          }
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
