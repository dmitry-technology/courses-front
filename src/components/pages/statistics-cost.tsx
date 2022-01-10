import { Typography } from "@mui/material";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";

export const StatisticsCost: FC = () => {
  const storeValue = useContext(CoursesContext);
    return <Typography variant="h3">
    Cost statisitcs works:
     number of digitl in counter is {storeValue.count}
  </Typography>
}