import { Button, TextField } from '@mui/material'
import React, { FC, useState, useEffect } from 'react'
import { LoginData } from './login-data'
type LoginFormProps = {
    loginFn: (loginData: LoginData) => Promise<boolean>;
    passwordValidationFn: (password: string) => string;
}
const emptyLoginData: LoginData = { email: "", password: "" }
const LoginForm: FC<LoginFormProps> = (props) => {


    const { loginFn, passwordValidationFn } = props;
    const [loginData, setLoginData] = useState<LoginData>(emptyLoginData);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [flValid, setflValid] = useState<boolean>(false);

    useEffect(() => {
        setflValid(!!loginData.email && !passwordValidationFn(loginData.password));
    }, [loginData]);

    async function onSubmit(event: any) {
        event.preventDefault();
        const res: boolean = await loginFn(loginData);
        if (!res) {
            alert("Wrong credentials");
        } else {
            alert("Login Successed")
        }
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



    return (
        <form onSubmit={onSubmit} onReset={() => setLoginData(emptyLoginData)}>
            <TextField placeholder="Username/Email" type={"text"} required
                onChange={usernameHandler} />
            <TextField placeholder="password" type={"password"} required
                onChange={passwordHandler}
                error={!!errorMessage}
                helperText={errorMessage} />
            <Button type="submit" disabled={!flValid}>Submit</Button>
            <Button type="reset">Reset</Button>
        </form>
    )
}

export default LoginForm
