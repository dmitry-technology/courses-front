import { Typography, Box, Button, TextField, MenuItem, FormGroup, FormLabel, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio } from "@mui/material";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CoursesContext from "../../store/context";
import { emptyCourse } from '../../util/random-courses';
import { StoreType } from "../../models/course-store-type";
import _ from "lodash";
import Course from "../../models/course";
import { InputType, classSelector, INPUT_INTERVAL, INPUT_SELECTOR, INPUT_DATE, INPUT_RADIO, INPUT_CHECK, InputSelector, InputInterval, FormField } from "../../models/common/form-type";


export const FormGetObject: FC<{ inputConfig: FormField[], obj: any }> = (props) => {
  /**inputs config for form */
  const inputs: FormField[] = props.inputConfig;
  const [object, setObject] = useState(props.obj);
  const [error, setError] = useState(getErrorObjectEmpty(props.obj));
  console.log(object);
  console.log(error);






  function getInputElements() {
    return inputs.map(config => {
      const { field, label, input } = config;
      switch (input.constructor.name) {
        case INPUT_INTERVAL:
          return getInputIntervalElement(field, label, input);
        case INPUT_SELECTOR:
          return getInputSelectorElement(field, label, input);
        case INPUT_DATE:
          return getInputDateElement(field, label, input);
        case INPUT_RADIO:
          return getInputRadioElement(field, label, input);
        case INPUT_CHECK:
          return getInputCheckElement(field, label, input);
        default:
          return <Box></Box>
      }
    });
  }
  function getInputDateElement(field: string, label: string, input: InputType) {
    return (
      <Box key={field} sx={{ width: '80%', display: 'flex' }}>
        <FormControl sx={{ mt: 1, flexGrow: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker 
             label={label}
              value={object[field].getFullYear() === 1970 ? null : object[field]}
              onChange={(e) => handlerDate(e, field, input)}
              minDate={new Date(`01/01/${input.value.min}`)}
              maxDate={new Date(`12/31/${input.value.max}`)}
              renderInput={(params) => (
                <TextField {...params}
                  // helperText={error[field]}
                  // error={!!error[field]}
                  required />)}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    )
  }

  function getInputRadioElement(field: string, label: string, input: InputType) {
    return (
      <Box key={field} sx={{ width: '80%', display: 'flex' }}>
        <FormControl
          sx={{ mt: 1, flexGrow: 1 }}
        >
          <FormLabel id="filled-Type">Types</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(e) => handlerRadio(e, field, input)}
          >
            {input.value.map((option: any) => {
              return <FormControlLabel key={option} value={option} control={<Radio checked={object[field] === option ? true : false} />} label={option} />
            })
            }
          </RadioGroup>
        </FormControl>
      </Box>

    )
  }

  function getInputCheckElement(field: string, label: string, input: InputType) {
    return (
      <Box key={field} sx={{ width: '80%', display: 'flex' }}>
        <FormControl sx={{ mt: 1, flexGrow: 1 }} component="fieldset" variant="standard">
          <FormLabel id="filled-Day" component="legend">Day evening</FormLabel>
          <FormGroup>
            {input.value.map((option: any) => {
              return <FormControlLabel
                onChange={(e) => handlerCheck(e, field, input)}
                control={
                  <Checkbox name={option}
                  // checked={isChecked(option)} 
                  />
                }
                label={option}
              />
            })}
          </FormGroup>
        </FormControl>
      </Box>
    )
  }

  function getInputSelectorElement(field: string, label: string, input: InputType) {
    return (
      <Box key={field} sx={{ width: '80%', display: 'flex' }}>
        <TextField
          sx={{ mt: 1, flexGrow: 1 }}
          id={label}
          value={object[field]}
          label={label}
          variant="outlined"
          onChange={(e) => handlerSelector(e, field, input)}
          error={!!error[field]}
          helperText={error[field]}
          select>
          {input.value.map((option: any) => {
            return <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          })
          }
        </TextField>
      </Box>
    )
  }
  function getInputIntervalElement(field: string, label: string, input: InputType) {
    return (
      <Box key={field} sx={{ width: '80%', display: 'flex' }}>
        <TextField
          sx={{ mt: 1, flexGrow: 1 }}
          id="filled-Hours"
          value={object[field] !== 0 ? object[field] : ''}
          label={label}
          variant="outlined"
          onChange={(e) => handlerInterval(e, field, input)}
          error={!!error[field]}
          helperText={error[field]}
        />
      </Box>
    )
  }

  /***************************Handler ******************************/
  const handlerDate = (event: any, field: string, input: InputType) => {
    let currentValue = new Date(event);
    const currentYear = currentValue.getFullYear();
    const year = currentYear < input.value.min || currentYear > input.value.max ? `value should be from ${input.value.min} to ${input.value.max}` : "";
    error[field] = year;
    setError({ ...error });
    object[field] = currentValue;
    setObject({ ...object })
  }

  const handlerRadio = (event: any, field: string, input: InputType) => {
    object[field] = event.target.value;
    setObject({ ...object })
  }

  const handlerCheck = (event: any, field: string, input: InputType) => {
    const value = event.target.name;
    const index = object[field].findIndex((item: any) => item === value);
    index === -1 ? object[field].push(value) : object[field].splice(index, 1)
    setObject({ ...object });
  }

  const handlerSelector =  (event: any, field: string, input: InputType) => {
    object[field] = event.target.value;
    setObject({ ...object });
  }

  const handlerInterval =  (event: any, field: string, input: InputType) => {
    object[field] = event.target.value;
    setObject({ ...object });
  }
  /********************************************************************* */

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '90vw', alignItems: 'center' }}>
      {getInputElements()}
    </Box>
  )
};




/*
const FormGetObject: FC<{ config: any }> = (props) => {

  
  
  const storeValue = useContext<StoreType>(CoursesContext);
  const [flValid, setflValid] = useState<boolean>(false);
  const [course, setCourse] = useState<Course>(emptyCourse());
  const [error, setError] = useState({ cost: '', hours: '', year: '', coursename: '', lecturesname: '' });
  const { minCost, maxCost, minHours, maxHours, minYear, maxYear, courseName, lecturers, types, timing } = props.config;

  useEffect(validate, [course]);

  function validate() {
    const courseNameValid: boolean = courseName.includes(course.courseName);
    const lecturersNameValid: boolean = lecturers.includes(course.lecturerName);
    const hourseValid: boolean = (course.hours >= minHours && course.hours <= maxHours)
    const costValid: boolean = (course.cost >= minCost && course.cost <= maxCost)
    const startYearValid: boolean = (course.openDate.getFullYear() >= minYear && course.openDate.getFullYear() <= maxYear);
    const courseTypeValid: boolean = types.includes(course.type);
    const courseTimnigValid: boolean = validateTiming();
    const flag = courseNameValid && lecturersNameValid && hourseValid && costValid && startYearValid && courseTypeValid && courseTimnigValid;
    setflValid(flag);
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
      const cost = currentValue < minCost || currentValue > maxCost ? `value should be from ${minCost} to ${maxCost}` : "";
      setError({ ...error, cost: cost });
      course.cost = currentValue;
      setCourse({ ...course, cost: currentValue })
    }
    const fieldHandlerHours = (event: any) => {
      let currentValue = event.target.value;
      const hours = currentValue < minHours || currentValue > maxHours ? `value should be from ${minHours} to ${maxHours}` : "";
      setError({ ...error, hours });
      setCourse({ ...course, hours: currentValue });
    }

    const handlerCourseName = (event: any) => {
      setCourse({ ...course, courseName: event.target.value })
    }
    const handlerLecture = (event: any) => {
      setCourse({ ...course, lecturerName: event.target.value })
    }
    const handlerRadioType = (event: any) => {
      setCourse({ ...course, type: event.target.value })
    }
    const handlerChangeDay = (event: any) => {
      let value = event.target.name;
      const index = course.dayEvening.findIndex(item => item === value);
      index === -1 ? course.dayEvening.push(value) : course.dayEvening.splice(index, 1)
      setCourse({ ...course })
    }

    const handlerDate = (event: any) => {
      let currentValue = new Date(event);

      const currentYear = currentValue.getFullYear();
      const year = currentYear < minYear || currentYear > maxYear ? `value should be from ${minYear} to ${maxYear}` : "";
      setError({ ...error, year: year });
      setCourse({ ...course, openDate: currentValue })
    }

    return [
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, width: '90vw'
      }}>
        <TextField
          sx={{ m: 2, flexGrow: 1, minWidth: 150 }}
          id="filled-Course" value={course.courseName} label="Course name" variant="outlined" onChange={handlerCourseName} error={!!error.coursename} helperText={error.coursename} select>
          {courseName.map((option: any) => {
            return <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          })
          }
        </TextField>

        <TextField
          sx={{ m: 2, flexGrow: 1, minWidth: 150 }}
          id="filled-Lecture" value={course.lecturerName} label="Lecture name" variant="outlined" onChange={handlerLecture} error={!!error.lecturesname} helperText={error.lecturesname} select>
          {lecturers.map((option: any) => {
            return <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          })
          }
        </TextField>

        <TextField sx={{ m: 2, flexGrow: 1 }}
          id="filled-Hours" value={course.hours !== 0 ? course.hours : ''} label="Hours" variant="outlined" onChange={fieldHandlerHours} error={!!error.hours} helperText={error.hours} />

        <TextField
          sx={{ m: 2, flexGrow: 1 }}
          id="filled-Cost" value={course.cost !== 0 ? course.cost : ''} label="Cost" variant="outlined" onChange={fieldHandlerCost} error={!!error.cost} helperText={error.cost} />

        <Box sx={{ m: 2, flexGrow: 1 }}>
          <FormControl >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker label="Course start date"
                value={course.openDate.getFullYear() === 1970 ? null : course.openDate}
                onChange={handlerDate}
                minDate={new Date(`01/01/${minYear}`)}
                maxDate={new Date(`12/31/${maxYear}`)}
                renderInput={(params) => (
                  <TextField {...params} helperText={error.year} error={!!error.year} required />)}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Box>,


      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, width: '90vw'
      }}>
        <FormControl sx={{ m: 2, minWidth: 300 }}>
          <FormLabel id="filled-Type">Types</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={handlerRadioType}
          >
            {types.map((option: any) => {
              return <FormControlLabel value={option} control={<Radio checked={ course.type === option ? true : false } />} label={option} />
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
                  <Checkbox name={option} checked={isChecked(option)} />
                }
                label={option}
              />
            })}
          </FormGroup>
        </FormControl>
      </Box>

    ]
  }

  function isChecked(value: string): boolean {
    return course.dayEvening.indexOf(value) >= 0;
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
    setCourse(emptyCourse());
  }


  return <Box component="form" onSubmit={handlerSubmit} onReset={handlerReset}
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Box>{getTextField()}</Box>
    <Box>
      <Button type="submit" disabled={!flValid}>Add</Button>
      <Button type="reset">Reset form</Button>
    </Box>
  </Box>
}

*/

export default FormGetObject
function getErrorObjectEmpty(obj: any): any {
  //TODO
}

