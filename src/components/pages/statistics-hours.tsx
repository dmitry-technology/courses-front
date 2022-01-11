import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import _ from "lodash";
import React, { FC, useContext } from "react";
import { CourseType } from "../../models/course-type";
import CoursesContext from "../../store/context";


const intervalDivider: number[] = [
  10, 20, 30, 50, 100
];

export const StatisticsHours: FC = () => {
  const storeValue = useContext(CoursesContext);

  const [interval=10, setInterval] = React.useState<number>(0);

  function getListElements() {
    let arr: CourseType[] = storeValue.courses;
    let objCnt = _.countBy(arr, e => {
      return Math.floor(e.hours / interval) * interval;
    });

    let res = Object.entries(objCnt).map(([key, value]) => {
      let minInterval = key;
      let maxInterval = +key + +key - 1;
      let amount = value;
      return { minInterval: minInterval, maxInterval: maxInterval, amount: amount}
    });
    
    if(!!res[0].maxInterval == false){
      return <ListItem></ListItem>
    }
    return res.map(element => {
      return <ListItem>
        <ListItemText>min={element.minInterval}   max={element.maxInterval} amount={element.amount} </ListItemText>
      </ListItem>
    })


  }

  const handleChange = (event: any) => {
    setInterval(event.target.value);

  };

  return <div>
    <Typography variant="h3">
      Statistics Hourse
    </Typography>;

    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-name-label">Interval</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value="1000"
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
      >
        {intervalDivider.map((element) => (
          <MenuItem
            key={element}
            value={element}
          >
            {element}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <List>
      {getListElements()}
    </List>

  </div>
}

