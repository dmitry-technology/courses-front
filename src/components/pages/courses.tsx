import { Box, Paper, styled, useTheme } from "@mui/material";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import CoursesContext from "../../store/context";
import { Delete } from "@mui/icons-material"
import { UserData } from "../../models/common/user-data";
import { DataGrid, GridActionsCellItem, GridCallbackDetails, GridCellEditCommitParams, GridColDef, GridRowId, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import Course from "../../models/course";
import DialogConfirm from "../common/dialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalInfo from "../common/modal-info";
import { useMediaQuery } from "react-responsive";
import mediaQuery from "../../config/media-query.json"
import courseData from "../../config/courseData.json"

const { mobile, laptop, desktop } = { ...mediaQuery };


function getRows(courses: Course[]): GridRowsProp {
  return courses.map(course => course);
}

type Update = {
  old: Course;
  new: Course;
}

const styleError = {
  bgcolor: 'rgb(126,10,15, 0.1)',
  color: '#750f0f'
}

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
  const [currentMedia, setcurrentMedia] = useState("");

  const storeValue = useContext(CoursesContext);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogUpdate, setDialogUpdate] = useState(false);
  const courseUpdate = useRef<Update>({} as Update);
  const currentCourses = useRef<Course[]>(storeValue.courses);
  const [isUpdate, setisUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const textModal = useRef<string[]>(['']);
  const [idCourse, setIdCourse] = useState(-1);
  const [colums, setColums] = useState<GridColDef[]>(getColums(storeValue.userData));
  const rows = useMemo(() => getRows(storeValue.courses), [storeValue]);
  useEffect(() => setColums(getColums(storeValue.userData)), [storeValue, currentMedia]);


  useMediaQuery({ minWidth: 1100 }, undefined, () => setcurrentMedia("desktop"));
  useMediaQuery({ minWidth: 600 }, undefined, () => setcurrentMedia("laptop"));
  useMediaQuery({ minWidth: 480 }, undefined, () => setcurrentMedia("mobile"));


  function openDialog(id: GridRowId) {
    setIdCourse(+id);
    setdialogVisible(true);
  }

  function getColums(userData: UserData): any[] {
    const col: any[] = [
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
              onClick={() => openDialog(params.id)}
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

    switch (currentMedia) {
      case "mobile":
        return col.filter(e => e.field === "courseName" || e.field === "lecturerName");
      case "laptop":
        return col.filter(e => e.field === "courseName" || e.field === "lecturerName" || e.field === "openDate");
      case "desktop":
        return col;
      default:
        return col;
    }
  }

  function handleRemove(status: boolean): void {
    if (status) {
      storeValue.removeFn!(idCourse);
    }
    setdialogVisible(false);
  }

  function handleUpdate(status: boolean): void {
    if (!status) {
      storeValue.updateFn(courseUpdate.current.old.id, courseUpdate.current.old);
    }
    setDialogUpdate(false);
  }

  function showDetails(id: GridRowId) {
    const course = storeValue.courses.find(e => e.id === +id);
    if (!!course) {
      const { courseName, lecturerName, hours, cost, type, dayEvening, openDate } = { ...course };
      textModal.current = (`Course Name: ${courseName}_Lecturer: ${lecturerName}_Amount hours: ${hours}_Amount cost: ${cost}_Type course: ${type}_Times of Day: ${dayEvening}_Date start: ${openDate.toISOString().substring(0, 10)}`)
        .split('_');
    } else {
      textModal.current = ["Not found"];
    }
    setModalVisible(true);
  }

  function onEdit(params: GridCellEditCommitParams) {
    currentCourses.current = storeValue.courses;
    courseUpdate.current.old = storeValue.courses.find(e => e.id === +params.id) as Course;
    courseUpdate.current.new = { ...courseUpdate.current.old };
    (courseUpdate.current.new as any)[params.field] = params.value;
    storeValue.updateFn(courseUpdate.current.old.id, courseUpdate.current.new);
    setDialogUpdate(true);
  }

  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Paper sx={{ width: '80vw', height: '80vh' }}>
      <StyledBox>
        <DataGrid columns={colums} rows={rows} onCellEditCommit={onEdit} />
      </StyledBox>

    </Paper>
    <ModalInfo title={"Detailed information about the courses"} message={textModal.current} visible={modalVisible} callBack={() => setModalVisible(false)} />
    <DialogConfirm visible={dialogUpdate} title={"Update course"} message={`are you want to update course?`} onClose={handleUpdate} />
    <DialogConfirm visible={dialogVisible} title={"Course remove"} message={`are you want to remove course with ID ${idCourse}`} onClose={handleRemove} />
  </Box>
}




