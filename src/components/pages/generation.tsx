import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import courseData from '../../config/courseData.json'
import CoursesContext from '../../store/context';
import { StoreType } from "../../models/course-store-type";
import { createRandomCourse } from '../../util/random-courses';
import Course from '../../models/course';
import { useSelector } from 'react-redux';
import { coursesSelector } from '../../redux/store';



const { maxCountRandomCourses } = courseData;


const Generation: FC = () => {
    const storeValue = useContext<StoreType>(CoursesContext);
    const courses: Course[] = useSelector(coursesSelector);
    let [error, setError] = useState<string>("");
    let [valid, setValid] = useState<boolean>(true);
    let [value, setValue] = useState<number>(0);

    // useEffect(() => {
    //     setValid(!validate(value));
    // }, [value])
    useMemo(() => {
        setValid(!validate(value));
    }, [value]);

    async function onSubmit(event: any) {
        event.preventDefault();
        for (let index = 0; index < value; index++) {
            let course = await storeValue.addFn!(createRandomCourse());

        }
    }

    function handler(event: any) {
        value = event.target.value;
        setValue(value);
        error = validate(value) ? "" : `value should be from 0 to ${maxCountRandomCourses}`;
        setError(error);
    }

    async function onReset(event: any) {
        await courses.forEach(async (e) => await storeValue.removeFn!(e.id));
        alert("clear succeseful");

    }

    function validate(num: number): boolean {
        console.log("validate");
        
        return num > 0 && num <= maxCountRandomCourses;
    }

    return <Container component="main" maxWidth="xs">
        <Box
            sx={{height:'80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            component="form"
            onSubmit={onSubmit}
            onReset={onReset}
        >
            <TextField id="amount-generate" value={value} type='number' error={!!error} helperText={error} onChange={handler} label="Generate" variant="outlined" />
            <Button disabled={valid} type='submit'>Generate</Button>
            <Button type='reset'>Reset</Button>



        </Box>
    </Container>
};

export default Generation;
