import _ from "lodash";
import { Course } from "../models/course";

    
    
export function getStatistics(courses:Course[], interval: number, isCost:boolean) {
    let variant = isCost ? "cost" : "hours";
    let objCnt = _.countBy(courses, e => {
      return Math.floor((e as any)[variant] / interval) * interval;
    });

    return Object.entries(objCnt).map(([key, value]) => {
      let minInterval = key;
      let maxInterval = +key + +key - 1;
      let amount = value;
      return { minInterval: minInterval, maxInterval: maxInterval, amount: amount}
    });

}