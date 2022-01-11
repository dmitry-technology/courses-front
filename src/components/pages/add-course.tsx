import { Typography, Box, Button } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import { createRandomCourse } from '../../util/random-courses';


export const AddCourse: FC = () => {
  const storeValue = useContext(CoursesContext);
    return <Box sx={{display: "flex", flexDirection: "column"}}>
      <Typography variant="h3">
        Add Course
      </Typography>
      <Button  onClick={()=>(storeValue.addFn!(createRandomCourse()))}>Add course</Button>
    </Box>

}