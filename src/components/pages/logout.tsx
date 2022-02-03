import { FC, Fragment, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PATH_COURSES, PATH_LOGIN } from "../../config/routes-config";
import { authService } from "../../config/servicesConfig";
import DialogConfirm from "../common/dialog";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../redux/store";
import { UserData } from "../../models/common/user-data";



export const Logout: FC = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => { setVisible(true) }, []);

  const userData: UserData = useSelector(userDataSelector);

  async function logout() {
    return await authService.logout();
  }

  return (
    <Fragment>
      <DialogConfirm visible={visible} title={"Sign out"} message={`Do you really want to leave? ${userData.displayName}`}
        onClose={(status: boolean) => {
          if (status) logout();
          setVisible(false);
        }} />
      {!visible && <Navigate to={PATH_COURSES} />}
    </Fragment>
  )
}