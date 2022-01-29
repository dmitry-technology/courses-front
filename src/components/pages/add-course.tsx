import { Typography, Box, Button, Paper } from "@mui/material";
import { FC, useContext } from "react";
import { StoreType } from "../../models/course-store-type";
import FormGetObject from "../form-get-course";
import courseData from "../../config/courseData.json"



export const AddCourse: FC = () => {
  return <Paper sx={{flexGrow:1, mt:2}}  elevation={5}>
    <FormGetObject config={courseData} />
  </Paper>

}


