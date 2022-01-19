import { Typography, Box, Button, TextField, MenuItem, FormGroup, FormLabel, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio } from "@mui/material";
import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import CoursesContext from "../store/context";
import { createRandomCourse } from '../util/random-courses';
import { StoreType } from "../models/course-store-type";
import _ from "lodash";
import Course from "../models/course";


const FormGetObject: FC<{ config: any }> = (props) => {

  const storeValue = useContext<StoreType>(CoursesContext);
  let [flValid, setflValid] = useState<boolean>(false);

  const [error, setError] = useState({cost:'',hours:'',year:'',coursename:'',lecturesname:''});
  const [course, setCourse] = useState<Course>({
    id:0,
    courseName:"",  
    lecturerName:"",
    hours:0,
    cost:0,
    type:"",
    dayEvening:[],
    openDate:new Date()
  });


  const {minCost, maxCost, minHours, maxHours, minYear, maxYear, courseName, lecturers, types, timing} = props.config;

  useEffect(() => {
    validate();

  }, [error, course]);

  

  function validate() {
    const courseNameValid: boolean = courseName.includes(course.courseName);
    const lecturersNameValid: boolean = lecturers.includes(course.lecturerName);
    const hourseValid: boolean = (course.hours >= minHours && course.hours <= maxHours)
    const costValid: boolean = (course.cost >= minCost && course.cost <= maxCost)
    const startYearValid: boolean = (course.openDate.getFullYear() >= minYear && course.openDate.getFullYear() <= maxYear);
    const courseTypeValid: boolean = types.includes(course.type);
    const courseTimnigValid: boolean = validateTiming();
    flValid = courseNameValid && lecturersNameValid && hourseValid && costValid && startYearValid && courseTypeValid && courseTimnigValid;
    setflValid(flValid);
}

function validateTiming(): boolean {
  let res = false;
      course.dayEvening.forEach(element => {
          res = timing.includes(element) ? true : false;
      })
  return res;
}




  function getTextField() {

    const fieldHandlerCost = (event: any) => {
      let currentValue = event.target.value;
      error.cost = currentValue < minCost || currentValue > maxCost ? `value should be from ${minCost} to ${maxCost}` : "";
      setError({...error});
      if (!error.cost) {
        course.cost = currentValue;
        setCourse({...course})
      }
    }
    const fieldHandlerHours = (event: any) => {
      let currentValue = event.target.value;
      error.hours = currentValue < minHours || currentValue > maxHours ? `value should be from ${minHours} to ${maxHours}` : "";
      setError({...error});
      if (!error.hours) {
        course.hours = currentValue;
        setCourse({...course})
      }
    }

    const handlerCourseName = (event:any) => {
      course.courseName = event.target.value;
        setCourse({...course})
    }
    const handlerLecture = (event:any) => {
      course.lecturerName = event.target.value;
        setCourse({...course})
    }
    const handlerRadioType = (event:any) => {
      course.type = event.target.value;
      setCourse({...course})
    }
    const handlerChangeDay = (event:any) => {
      let value = event.target.name;
      const index = course.dayEvening.findIndex(item => item === value);
        index === -1 ? course.dayEvening.push(value) : course.dayEvening.splice(index, 1)
        setCourse({...course})  
    }

    const handlerDate = (event:any) => {
      let currentValue = new Date(event.target.value);
      const year = currentValue.getFullYear();
      error.year = year < minHours || year > maxHours ? `value should be from ${minYear} to ${maxYear}` : "";
      setError({...error});
      if (!error.year) {
        course.openDate = currentValue;
        setCourse({...course})
      }
    }

    return [
      <TextField sx={{ m: 2, minWidth: 300 }} id="filled-Course" label="Course name" variant="outlined" onChange={handlerCourseName} error={!!error.coursename} helperText={error.coursename} select>
        {courseName.map((option: any) => {
          return <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        })
        }
      </TextField>,

      <TextField sx={{ m: 2, minWidth: 300 }} id="filled-Lecture" label="Lecture name" variant="outlined" onChange={handlerLecture} error={!!error.lecturesname} helperText={error.lecturesname} select>
        {lecturers.map((option: any) => {
          return <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        })
        }
      </TextField>,

      <TextField sx={{ m: 2, minWidth: 300 }} id="filled-Hours" label="Hours" variant="outlined" onChange={fieldHandlerHours} error={!!error.hours} helperText={error.hours} />,
     
      <TextField sx={{ m: 2, minWidth: 300 }} id="filled-Cost" label="Cost" variant="outlined" onChange={fieldHandlerCost} error={!!error.cost} helperText={error.cost} />,
      
      <FormControl sx={{ m: 2, minWidth: 300 }}>
        <FormLabel id="filled-Type">Types</FormLabel>
        <RadioGroup 
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          onChange={handlerRadioType}
        >
          {types.map((option: any) => {
            return <FormControlLabel value={option} control={<Radio />} label={option} />
          })
          }
        </RadioGroup>
      </FormControl>,

      <FormControl sx={{ m: 2, minWidth: 300 }} component="fieldset" variant="standard">
        <FormLabel id="filled-Day" component="legend">Day evening</FormLabel>
        <FormGroup>
          {timing.map((option: any) => {
            return <FormControlLabel onChange={handlerChangeDay}
              control={
                <Checkbox  name={option} />
              }
              label={option}
            />
          })
          }
        </FormGroup>
      </FormControl>,

      <TextField
        sx={{ m: 2, minWidth: 300 }}
        id="filled-Date"
        label="Open date"
        type="date"
        defaultValue="2022-01-24"
        onChange={handlerDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
    ]
  }

  function handlerSubmit(event: any) {
    event.preventDefault();
    storeValue.addFn!(course);
    resetForm();
    
  }
  function handlerReset(event: any) {
    event.preventDefault();
    console.log("reset");
    resetForm();
  }

  function resetForm() {
    course.cost = 0
    course.courseName = ''
    course.dayEvening = []
    course.hours = 0
    course.id = 0
    course.lecturerName = ''
    course.openDate = new Date()
    course.type = ''
    setCourse({...course})
}


  return <Box>
    <form  onSubmit={handlerSubmit} onReset={handlerReset}>
      {getTextField()}
      <Button type="submit" disabled={!flValid}>Add</Button>
      <Button type="reset">Reset form</Button>
    </form>
  </Box>
}



export default FormGetObject
