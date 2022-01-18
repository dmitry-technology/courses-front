import { Typography, Box, Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import {Delete} from "@mui/icons-material"


export const Courses: FC = () => {
  const storeValue = useContext(CoursesContext);

  return <Box sx={{display: "flex", flexDirection: "column"}}>
    <Typography variant="h3">courses</Typography>
    <List>
    {storeValue.courses.map((element, index)=> {
       return   <ListItem key={index}>
              {storeValue.userData.isAdmin && <ListItemButton onClick={() => (storeValue.removeFn && storeValue.removeFn(element.id))}><Delete/> </ListItemButton>}
              <ListItemText primary={JSON.stringify(element)}/>
           
        </ListItem>
    })}
    </List>
  </Box>
}