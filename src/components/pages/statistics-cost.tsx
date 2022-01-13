import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import _ from "lodash";
import React, { FC, useContext } from "react";
import CoursesContext from "../../store/context";
import { getStatistics } from "../../util/courses-utils";


const intervalDivider: number[] = [
  1000, 2000, 3000, 5000, 10000
];

export const StatisticsCost: FC = () => {
  const storeValue = useContext(CoursesContext);

  const [interval=10, setInterval] = React.useState<number>(0);

  function getListElements() {

    let res = getStatistics(storeValue.courses, interval, true);
   
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
      Statistics Cost
    </Typography>;

    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-name-label">Interval</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={intervalDivider}
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

