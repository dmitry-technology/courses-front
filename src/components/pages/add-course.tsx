import { Typography, Box, Button } from "@mui/material";
import { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import { createRandomCourse } from '../../util/random-courses';
import { StoreType } from "../../models/course-store-type";
import FormGetObject from "../form-get-course";
import courseData from "../../config/courseData.json"



export const AddCourse: FC = () => {
  const storeValue = useContext<StoreType>(CoursesContext);
  function onclick() {
    storeValue.addFn!(createRandomCourse());
  }
  return <Box>
    <Typography variant="h3">Add Course</Typography>
    <Button onClick={onclick}>Add course</Button>
    <FormGetObject config={courseData} />
  </Box>

}

type Course = {
  id: number;
  courseName: string;
  lecturerName: string;
  hours: number;
  cost: number;
  type: string;
  dayEvening: string[];
  openDate: Date;
}

