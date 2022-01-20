import { Box, Checkbox, Typography } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import { authService } from "../../config/servicesConfig";
import { LoginData } from "../../models/common/login-data";
import LoginForm from "../../models/common/login-form";
import courseData from "../../config/courseData.json"
import { Navigate } from "react-router-dom";
import { PATH_COURSES } from "../../config/routes-config";

export const Login: FC = () => {
  const [flNavigae, setflNavigate] = useState<boolean>(false);
  async function loginFn(loginData: LoginData): Promise<boolean>{
    const res = await authService.login(loginData);
    if (res){
      setflNavigate(true);
    }
    return res
  }
    return <Fragment>
    <LoginForm loginFn={loginFn} passwordValidationFn={function (password: string): string {
        return password.length < courseData.passwordLength ? 
        `length of password can't be less than ${courseData.passwordLength}` : "";
      } }>
    </LoginForm>
    {flNavigae && <Navigate to={PATH_COURSES}/>}
    </Fragment>
}