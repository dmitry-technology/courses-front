import { Box, Button, Typography } from "@mui/material";
import { FC, Fragment, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { PATH_LOGIN } from "../../config/routes-config";
import { authService } from "../../config/servicesConfig";
import DialogConfirm from "../common/dialog";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CoursesContext from "../../store/context";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../redux/store";
import { UserData } from "../../models/common/user-data";



export const Logout: FC = () => {
  const storeValue = useContext(CoursesContext);
  const userData: UserData = useSelector(userDataSelector);

  const [flNavigate, setFlNavigate] = useState<boolean>(false);
  const [flDialog, setFlDialog] = useState<boolean>(false);
  async function logout() {
    const res = await authService.logout();
     if (!!res) {
      setFlNavigate(true);
    }
    return res;
  }

  return <Fragment>
    <Box sx={{display:'flex',flexDirection:'column', alignItems:'center'}}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> <LockOutlinedIcon /></Avatar>
      <Button variant="outlined" onClick={() => setFlDialog(true)}>Sign out</Button>
      <Typography>{userData.displayName}</Typography>
    </Box>
    <DialogConfirm visible={flDialog} title={"Sign out"} message={`Do you really want to leave? ${userData.displayName}`} onClose={function (status: boolean): void {
      if (status) logout();
      setFlDialog(false);
    }} />
    {flNavigate && <Navigate to={PATH_LOGIN} />}

  </Fragment>
}