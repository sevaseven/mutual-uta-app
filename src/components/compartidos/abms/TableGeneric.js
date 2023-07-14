import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  makeStyles,
  TableContainer
} from "@material-ui/core";
import {
  getComparator,
  getValueObject,
  stableSort,
} from "../../../helpers/tables";

const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

const TableGeneric = React.forwardRef((props, ref) => {
  const { data, columns, sizeTableCells, withoutPagination, tituloSinResultado, align = "left", rowStyle = {}, colTitleStyle = {}, tituloSinResultadoStyle = {}, rowPerPage = 20 } = props;
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [data]);

  return (
    <>
      <TableContainer>
        <Table ref={ref}>
          <TableHead>
            <TableRow>
              {columns.map((c, index) => {
                if (c.sort) {
                  return (
                    <TableCell
                      key={index}
                      sortDirection={orderBy === c.id ? order : false}
                      align={align}
                      style={{
                        minWidth: c.minWidth || 'auto',
                        ...colTitleStyle
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === c.id}
                        direction={orderBy === c.id ? order : "asc"}
                        onClick={() => handleRequestSort(c.id)}
                      >
                        {c.label}
                        {orderBy === c.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={index}
                    align={align}
                    style={{
                      minWidth: c.minWidth || 'auto',
                      ...colTitleStyle
                    }}
                  >
                    {c.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(orderBy ? stableSort(data, getComparator(order, orderBy)) : data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <TableRow hover key={index}>
                    {columns.map((c, index) => {
                      return (
                        <TableCell
                          align={align}
                          key={index}
                          style={{
                            width: `${sizeTableCells
                              ? sizeTableCells[index]
                              : ""
                              }`,
                            ...rowStyle
                          }}
                        >
                          {c.customBody
                            ? c.customBody(item)
                            : getValueObject(c.id, item)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {data.length === 0 && (
          <div style={{ ...tituloSinResultadoStyle ,textAlign: "center", marginTop: "1rem" }}>
            {tituloSinResultado ? tituloSinResultado : 'No hay resultados para su búsqueda'}
          </div>
        )}
      </TableContainer>

      {withoutPagination ||
        <TablePagination
          component="div"
          className="paginador"
          count={data.length}
          rowsPerPageOptions={[20, 50, 100]}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />}
    </>
  );
});

export default TableGeneric;