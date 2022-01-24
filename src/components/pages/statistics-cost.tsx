import _ from "lodash";
import  { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import Statistics from "../common/statistics";
import courseData from '../../config/courseData.json'




export const StatisticsCost: FC = () => {
  const storeValue = useContext(CoursesContext);

  
    return <Statistics intervals={courseData.costDivider} field={"cost"}
    data={storeValue.courses} unit='ILS' inputLabelName='Cost Interval'></Statistics>
    
   }
export default StatisticsCost