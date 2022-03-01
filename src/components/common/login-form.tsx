import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import React, { FC, useState, useEffect, ReactNode } from 'react'
import { LoginData } from '../../models/common/login-data'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { providerAuth, AuthType } from '../../config/provider-auth';

type LoginFormProps = {
  loginFn: (loginData: LoginData) => Promise<boolean>;
  passwordValidationFn: (password: string) => string;
  authNetwork?: AuthType[];
}
const emptyLoginData: LoginData = { email: "", password: "" }

const LoginForm: FC<LoginFormProps> = (props) => {
  const theme = createTheme();


  const { loginFn, passwordValidationFn, authNetwork } = props;
  const [loginData, setLoginData] = useState<LoginData>(emptyLoginData);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [flValid, setflValid] = useState<boolean>(false);

  useEffect(() => {
    setflValid(!!loginData.email && !passwordValidationFn(loginData.password));
  }, [loginData]);

  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      const res: boolean = await loginFn(loginData);
      if (!res) {
        alert("Wrong credentials");
      } else {
        alert("Login Successed")
      }
    } catch (err) {
      alert("server is not available!");
    }
  }
  function onSubmProvider(provider:string){
    loginFn({email:provider, password:""})
  }

  function usernameHandler(event: any) {
    loginData.email = event.target.value;
    setLoginData({ ...loginData });
  }

  function passwordHandler(event: any) {
    const password = event.target.value;
    const message = passwordValidationFn(password);
    setErrorMessage(message);
    loginData.password = password;
    setLoginData({ ...loginData });
  }

  function getProviderAuthElements():ReactNode[] {
    return authNetwork!.map((element, index) => <IconButton key={index} value={element.name} onClick={()=>onSubmProvider(element.name)}>{element.icon}</IconButton>);
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
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
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={usernameHandler}
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
              onChange={passwordHandler}
              error={!!errorMessage}
              helperText={errorMessage}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              disabled={!flValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
          <Typography m={1}>or join with</Typography>
          <Box>
              {getProviderAuthElements()}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default LoginForm