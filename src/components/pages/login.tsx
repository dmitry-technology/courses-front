import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { authService } from "../../config/servicesConfig";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../../models/common/login-form";
import courseData from "../../config/courseData.json"
export const Login: FC = () => {
    return <Box>
      <Typography variant="body1" component="h2">
    Login
  </Typography>
    <LoginForm loginFn={function (loginData: LoginData): Promise<boolean> {
        return authService.login(loginData);
      } } passwordValidationFn={function (password: string): string {
        return password.length < courseData.passwordLength ? 
        `length of password can't be less than ${courseData.passwordLength}` : "";
      } }>

    </LoginForm>
    </Box>
}