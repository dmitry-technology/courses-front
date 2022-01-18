import { Box, Button, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { PATH_LOGIN } from "../../config/routes-config";
import { authService } from "../../config/servicesConfig";



export const Logout: FC = () => {
  const [flNavigate, setFlNavigate] = useState<boolean>(false);
  async function logout() {
    const res = await authService.logout();
    if (res) {
      setFlNavigate(true);
    }
    return res;
  }

  return <Fragment>
    <Typography variant="body1" component="h2">
      Logout
    </Typography>
    <Button onClick={logout}>Confirm Log Out</Button>
    {flNavigate && <Navigate to={PATH_LOGIN} />}
  </Fragment>
}