import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

const WrappedTable = ({rows, columns, tableClass}) => {
    return(
        <TableContainer component={Paper} className={tableClass}>
            <Table sx={{minWidth: 700}}>
                <TableHead>
                    <TableRow>
                        {Array.isArray(columns) && columns.map(d => {
                            return(
                                <TableCell key={d.id}>{d.value}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(rows) && rows.map(d => {
                        return(<TableRow
                            key={d.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            {Array.isArray(d.values) && d.values.map((v, index) => {
                                return (
                                    <TableCell key={index}>{v}</TableCell>
                                )
                            })
                            }
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

WrappedTable.defaultProps = {
    tableClass: '',
    rows: [{
        id: 0,
        value: 'Value'
    }],
    columns: [{
        id: 0,
        value: 'Test'
    }]
};

WrappedTable.propTypes = {
    tableClass: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    rows: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }))
};

export default WrappedTable;
