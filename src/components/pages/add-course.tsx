import { Typography, Box, Button } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";

export const AddCourse: FC = () => {
  const storeValue = useContext(CoursesContext);
    return <Box sx={{display: "flex", flexDirection: "column"}}>
      <Typography variant="h3">
        Add Course works {storeValue.count}
      </Typography>
      <Button onClick={storeValue.increase}>Add count</Button>
    </Box>

}