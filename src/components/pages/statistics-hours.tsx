import courseData from '../../config/courseData.json'
import { FC, useContext, useEffect, useState } from "react";
import CoursesContext from "../../store/context";
import Statistics from "../common/statistics"; 
import { useSelector } from 'react-redux';
import { coursesSelector } from '../../redux/store';




export const StatisticsHours: FC = () => {
const courses = useSelector(coursesSelector);  
return <Statistics intervals={courseData.hoursDivider} field={"hours"}
 data={courses} unit='h' inputLabelName='Hours Interval'></Statistics>
 
}
export default StatisticsHours