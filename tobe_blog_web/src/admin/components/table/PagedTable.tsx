import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { ChangeEvent } from 'react';
import Loading from '../../../components/loading/Loading';
import { IColumn, IOperation } from '../../../global/types';
import { getButtonByOperationName } from './TobeButton';

interface PagedTableProps {
  openLoading?: boolean;
  readonly columns: IColumn[];
  rows: any[] | [];
  totalCount: number | 0;
  size: number | 10;
  current: number | 0;
  operations?: IOperation[];
  handleChangeCurrent: (event: unknown, newPage: number) => void;
  handleChangeSize: (event: ChangeEvent<HTMLInputElement>) => void;
  sx?: any;
}

export default function PagedTable(props: PagedTableProps) {
  return (
    <Paper
      sx={{
        ...{
          width: '100%',
          overflowX: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, md: 3 },
          borderRadius: 4,
        },
        ...props.sx,
      }}
    >
      <Loading open={props.openLoading} />
      <TableContainer>
        <Table
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              {props.columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map(row => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {props.columns.map(column => {
                    if (column.id !== 'operation') {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          {props.operations?.map(
                            (operation, index) =>
                              !operation?.hide?.call(null, row) && getButtonByOperationName(operation.name, () => operation.onClick(row.id), `${operation.name}_${index}`)
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.totalCount}
        rowsPerPage={props.size}
        page={props.current}
        onPageChange={props.handleChangeCurrent}
        onRowsPerPageChange={props.handleChangeSize}
      />
    </Paper>
  );
}
