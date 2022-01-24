import { Container, Grid, InputLabel, Select, Box, MenuItem, FormControl, Paper, OutlinedInput } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { FC, useMemo, useState } from 'react';
import { getStatistics } from '../../util/common/statistics-utils';
import Graph from './graph';
type StatisticsProps = {
    intervals: number[];
    field: string;
    data: object[];
    inputLabelName?: string;
    unit?: string;

}
const columns: GridColDef[] = [
    { field: 'minInterval', headerName: 'From', flex: 150 },
    { field: 'maxInterval', headerName: 'To', flex: 150 },
    { field: 'amount', headerName: 'Amount', flex: 150 }
];

const Statistics: FC<StatisticsProps> = (props) => {
    const { intervals, field, data, unit, inputLabelName } = props;

    const [interval, setInterval] = useState<number>(intervals[0]);
    const rows = useMemo(() => getRows(), [data, interval]);
    function getRows(): GridRowsProp {
        console.log("rows running");
        console.log(data)
        const res = getStatistics(data, interval, field);
        return res.map((e, i) => ({
            id: i, ...e
        }));

    }
    const handleChange = (event: any) => {
        setInterval(event.target.value);

    };

    return <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} >
                <Box sx={{ display: 'flex', flexDirection: 'column',
                 justifyContent: 'space-between', flexGrow: 1 }}>
                    <FormControl >
                        <InputLabel sx={{ fontSize: {
                            xs: '1.5rem',
                            lg: '2rem'
                        } }} id="demo-multiple-name-label">{inputLabelName || 'Interval'}</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={interval}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" sx={{ textAlign:'center', fontSize: {
                                xs: '1.3rem',
                                sm: '1rem',
                                lg: '1.5rem'
                            } }}/>}

                        >
                            {intervals.map((element) => (
                                <MenuItem
                                    key={element}
                                    value={element}
                                    
                                >
                                    {element} {unit || ''}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: {
                            xs: '25vh',
                            sm: '40vh',
                            lg: '60vh'
                        },
                    }}
                >
                    <Graph value={rows as any} />
                </Paper>
                    
                </Box>

            </Grid>
            <Grid item xs={12} sm={6} sx={{ height: {
                xs: '40vh',
                sm: '70vh',
                lg: '75vh'
            } }}>
                        <DataGrid rows={rows} columns={columns}/> 
                    </Grid>

        </Grid>
    </Container>
}
export default Statistics;