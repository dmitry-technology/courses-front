import { Box, Paper } from "@mui/material";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import CoursesContext from "../../store/context";
import { Delete } from "@mui/icons-material"
import { UserData } from "../../models/common/user-data";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import Course from "../../models/course";
import DialogConfirm from "../common/dialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalInfo from "../common/modal-info";


function getRows(courses: Course[]): GridRowsProp {
  return courses.map(course => course);
}

export const Courses: FC = () => {

  const storeValue = useContext(CoursesContext);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textModal, setTextModal] = useState<string[]>([]);
  const [idCourse, setIdCourse] = useState(-1);

  const [colums, setColums] = useState<GridColDef[]>(getColums(storeValue.userData));
  const rows = useMemo(() => getRows(storeValue.courses), [storeValue]);
  useEffect(() => setColums(getColums(storeValue.userData)), [storeValue]);


  function openDialog(id: GridRowId) {
    setIdCourse(+id);
    setdialogVisible(true);
  }

  function getColums(userData: UserData): any[] {
    const col: any = [
      { field: "courseName", headerName: "Course Name", flex: 150, align: 'center', headerAlign: 'center' },
      { field: "lecturerName", headerName: "Lecturer", editable: userData.isAdmin, align: 'center', headerAlign: 'center' },
      { field: "hours", headerName: "Hours", type: "number", editable: userData.isAdmin, align: 'center', headerAlign: 'center' },
      { field: "cost", headerName: "Cost", type: "number", editable: userData.isAdmin, align: 'center', headerAlign: 'center' },
      { field: "openDate", headerName: "Openning Date", type: "date", editable: userData.isAdmin, align: 'center', headerAlign: 'center', flex: 200 },
      userData.isAdmin &&  {
          field: 'actions', type: 'actions', flex: 80,
          getActions: (params: GridRowParams) =>
            [<GridActionsCellItem
              icon={<Delete />}
              label="Delete"
              onClick={() => openDialog(params.id)}
            />,
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Show Details"
              onClick={() => showDetails(params.id)}
            />
            ]
        },
        !userData.isAdmin && {
          field: 'actions', type: 'actions', flex: 80,
          getActions: (params: GridRowParams) =>
            [ <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Show Details"
              onClick={() => showDetails(params.id)}
            />
            ]
        }
    ];
    return col;
  }

  function handleRemove(status: boolean): void {
    if (status) {
      storeValue.removeFn!(idCourse);
    }
    setdialogVisible(false);
  }

  function showDetails(id: GridRowId) {
    const course = storeValue.courses.find(e => e.id === +id);
    if (!!course) {
      const {courseName, lecturerName, hours, cost, type, dayEvening, openDate } = { ...course };
      const array: string[] = (`Course Name: ${courseName}_Lecturer: ${lecturerName}_Amount hours: ${hours}_Amount cost: ${cost}_Type course:${type}_Times of Day: ${dayEvening}_Date start: ${openDate}`)
      .split('_');
      setTextModal(array);
      setModalVisible(true);
    } else {
      setTextModal(["Not found"])
      setModalVisible(true);
    }
  }



  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Paper sx={{ width: '80vw', height: '80vh' }}>
      <DataGrid columns={colums} rows={rows} />
    </Paper>
    <ModalInfo title={"Detailed information about the courses"} message={textModal} visible={modalVisible} callBack={() => setModalVisible(false)} />
    <DialogConfirm visible={dialogVisible} title={"Course remove"} message={`are you want to remove course with ID ${idCourse}`} onClose={handleRemove} />
  </Box>
}




