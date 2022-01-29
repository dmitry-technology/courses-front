import { Box, Paper, styled } from "@mui/material";
import { FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import CoursesContext from "../../store/context";
import { Delete } from "@mui/icons-material"
import { UserData } from "../../models/common/user-data";
import { DataGrid, GridActionsCellItem, GridCellEditCommitParams, GridColDef, GridRowId, GridRowParams, GridRowsProp, GridValueFormatterParams } from "@mui/x-data-grid";
import Course from "../../models/course";
import DialogConfirm from "../common/dialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalInfo from "../common/modal-info";
import { useMediaQuery } from "react-responsive";
import { CourseFields, getCoursesFields } from "../../config/media-query"
import courseData from "../../config/courseData.json"
import { ConfirmationData, emptyConfirmationData } from "../../models/common/confirmation-type";

const StyledBox = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  '& .MuiDataGrid-cell--editing': {
    backgroundColor: 'rgb(255,215,115, 0.19)',
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
}));

export const Courses: FC = () => {
  /* context */
  const storeValue = useContext(CoursesContext);
  /* dialog confirmation */
  const confirmationData = useRef<ConfirmationData>(emptyConfirmationData);
  const [dialogVisible, setdialogVisible] = useState(false);
  /* dialog modal */
  const textModal = useRef<string[]>(['']);
  const [modalVisible, setModalVisible] = useState(false);
  /* media-query */
  const isMobile = useMediaQuery({ maxWidth: 600, orientation: 'portrait' });
  const isLaptop = useMediaQuery({ maxWidth: 900 });
  const mode = useMemo(() => getMode(), [isMobile, isLaptop]);
  /* colums */
  const [colums, setColums] = useState<GridColDef[]>([]);
  const callbackMode = useCallback(() => 
        setColums(getFilteredColumns(getCoursesFields().get(mode) as CourseFields[])), [storeValue, mode]);
  /* rows */
  const rows = useMemo(() => getRows(storeValue.courses), [storeValue, dialogVisible]);

  useEffect(() => {
    callbackMode();
  }, [callbackMode])

  function getMode(): string {
    if (isMobile) {
      return 'isMobile';
    }
    if (isLaptop) {
      return 'isLaptop'
    }
    return 'isDesktop';
  }
  function getFilteredColumns(fields: CourseFields[]): any[] {
    return getColums(storeValue.userData).filter(column => fields.includes(column.field as any));
  }
  function getColums(userData: UserData): any[] {
    return [
      {
        field: "courseName", headerName: "Course Name", flex: 150, align: 'center', headerAlign: 'center'
      },
      {
        field: "lecturerName", headerName: "Lecturer", editable: userData.isAdmin, align: 'center', headerAlign: 'center',
        type: 'singleSelect',
        valueOptions: courseData.lecturers,
        preProcessEditCellProps: (params: any) => {
          const courseName = params.props.value
          const hasError = courseData.courseName.includes(courseName);
          return { ...params.props, error: hasError };
        }
      },
      {
        field: "hours", headerName: "Hours", type: "number", editable: userData.isAdmin, align: 'center', headerAlign: 'center',
        preProcessEditCellProps: (params: any) => {
          const hours = +params.props.value
          const hasError = hours < courseData.minHours || hours > courseData.maxHours;
          return { ...params.props, error: hasError };
        }
      },
      {
        field: "cost", headerName: "Cost", type: "number", editable: userData.isAdmin, align: 'center', headerAlign: 'center',
        preProcessEditCellProps: (params: any) => {
          const cost = +params.props.value
          const hasError = cost < courseData.minCost || cost > courseData.maxCost;
          return { ...params.props, error: hasError };
        },
        valueFormatter: (params: GridValueFormatterParams) => {
          return `${params.value} \u20AA`;
        }
      },
      {
        field: "openDate", headerName: "Openning Date", type: "date", editable: userData.isAdmin, align: 'center', headerAlign: 'center', flex: 200,
        preProcessEditCellProps: (params: any) => {
          const date = params.props.value;
          console.log((date as Date).getFullYear());
          const hasError = +(date as Date).getFullYear() < courseData.minYear || +(date as Date).getFullYear() > courseData.maxYear;
          return { ...params.props, error: hasError };
        }
      },
      {
        field: 'actions', type: 'actions', flex: 80,
        getActions: (params: GridRowParams) => {
          const adminAct = [
            <GridActionsCellItem
              icon={<Delete />}
              label="Delete"
              onClick={() => onRemove(params.id)}
            />
          ];
          const userAct = [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Show Details"
              onClick={() => showDetails(params.id)}
            />
          ];
          return userData.isAdmin ? userAct.concat(adminAct) : userAct;
        }
      }
    ];
  }
  function getRows(courses: Course[]): GridRowsProp {
    return courses.map(course => course);
  }
  function findCourseById(id: number): Course | undefined {
    return storeValue.courses.find(e => e.id === id);
  }
  function getInfo(course: Course): string[] {
    const res: string[] = [
        `Course ID  : ${course.id}`,
        `Course Name: ${course.courseName}`,
        `Lecturer   : ${course.lecturerName}`,
        `Hours      : ${course.hours}`,
        `Cost : ${course.cost}`,
        `Openning Date : ${course.openDate.toLocaleDateString()}`,
        `Course Type : ${course.type}`,
        `Timing  : ${course.dayEvening.join(';')}`
    ];
    return res;
}
  
  /* Handle */
  function handleRemove(id: number, status: boolean): void {
    if (status) {
      storeValue.removeFn(id);
    }
    setdialogVisible(false);
  }
  function handleUpdate(course: Course, status: boolean): void {
    if (status) {
      storeValue.updateFn(course.id, course);
    }
    setdialogVisible(false);
  }
  function showDetails(id: GridRowId) {
    const course = storeValue.courses.find(e => e.id === +id);
    if (!!course) {
      textModal.current = getInfo(course);
    } else {
      textModal.current = ["Not found"];
    }
    setModalVisible(true);
  }
  function onEdit(params: GridCellEditCommitParams) {
    const id: number = +params.id;
    const oldCourse = findCourseById(id);
    const newCourse = { ...oldCourse, [params.field]: params.value };
    if (oldCourse !== newCourse) {
      confirmationData.current.title = `update course`;
      confirmationData.current.message = `Do you want update course ID ${oldCourse?.id} old value ${(oldCourse as any)[params.field]} new value ${params.value}`;
      confirmationData.current.handle = handleUpdate.bind(undefined, newCourse as Course);
      setdialogVisible(true);
    }
  }
  function onRemove(id: GridRowId) {
    const course = findCourseById(+id);
    if (!!course) {
      confirmationData.current.title = `remove course`;
      confirmationData.current.message = `Do you want remove course ID ${course?.id}`;
      confirmationData.current.handle = handleRemove.bind(undefined, +id);
      setdialogVisible(true);
    }
  }

  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Paper sx={{ width: { xs: '100vw', sm: '80vw' }, height: '80vh', marginTop: '2vh' }}>
      <StyledBox>
        <DataGrid columns={colums} rows={rows} onCellEditCommit={onEdit} />
      </StyledBox>

    </Paper>
    <ModalInfo title={"Detailed information about the courses"} message={textModal.current} visible={modalVisible} callBack={() => setModalVisible(false)} />
    <DialogConfirm visible={dialogVisible} title={confirmationData.current.title} message={confirmationData.current.message} onClose={confirmationData.current.handle} />

  </Box>
}




