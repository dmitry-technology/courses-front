import { Typography, Box, Button, TextField, MenuItem, FormGroup, FormLabel, FormControlLabel, Checkbox, FormControl, RadioGroup, Radio } from "@mui/material";
import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CoursesContext from "../../store/context";
import { emptyCourse } from '../../util/random-courses';
import { StoreType } from "../../models/course-store-type";
import _ from "lodash";
import Course from "../../models/Course";
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


export default FormGetObject
function getErrorObjectEmpty(obj: any): any {
  //TODO
}

