import { Typography, Box, Button, Paper } from "@mui/material";
import { FC, useContext } from "react";
import { StoreType } from "../../models/course-store-type";
import FormGetObject from "../form-get-course";
// import FormGetObject from "../common/form";
import courseData from "../../config/courseData.json"
import { InputType, InputInterval, InputSelector, InputRadio, InputCheck, InputDate, FormField, formConfig } from "../../models/common/form-type";
import { emptyCourse } from "../../util/random-courses";
import { addCourseAction } from "../../redux/actions";
import { useDispatch } from "react-redux";


// export function createCourse(id:number, courseName:string, lecturerName:string, hours:number, cost:number, type:string, dayEvening:string[], openDate:Date): Course {

// export const AddCourse: FC = () => {
  
  
//   return <Paper sx={{flexGrow:1, mt:2}}  elevation={5}>
//     <FormGetObject inputConfig={formConfig} obj={emptyCourse()} />
//   </Paper>

// }

export const AddCourse: FC = () => {
  const dispatch = useDispatch();
  return <Paper sx={{flexGrow:1, mt:2}}  elevation={5}>
    <FormGetObject 
    addCourseFn={(course) => dispatch(addCourseAction(course))}
    config={courseData} />
  </Paper>

}


