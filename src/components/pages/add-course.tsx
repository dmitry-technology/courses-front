import { Typography, Box, Button } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import { createRandomCourse } from '../../util/random';


export const AddCourse: FC = () => {
  const storeValue = useContext(CoursesContext);
    return <Box sx={{display: "flex", flexDirection: "column"}}>
      <Typography variant="h3">
        Add Course
      </Typography>
      <Button  onClick={()=>(storeValue.addFn && storeValue.addFn(createRandomCourse()))}>Add count</Button>
    </Box>

}