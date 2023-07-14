import { makeStyles, TableCell, TableSortLabel } from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  // Fully visible for active icons
  activeSortIcon: {
    opacity: 1,
  },
  // Half visible for inactive icons
  inactiveSortIcon: {
    opacity: 0.3,
  },
}));

const TableHeader = ({ key, property, children }) => {
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();

  return (
    <TableCell
      key={key}
      sortDirection={query.get('sortCol') === property ? query.get('sortDir') : false}
    >
      <TableSortLabel
        active={query.get('sortCol') === property}
        direction={query.get('sortCol') === property ? query.get('sortDir') : 'asc'}
        onClick={(event) => {
          const isAsc = query.get('sortCol') === property && query.get('sortDir') === 'asc';
          query.set('sortCol', property);
          query.set('sortDir', isAsc ? 'desc' : 'asc');
          history.push(`?${query.toString()}`);
        }}
        classes={{
          // Override with the active class if this is the selected column or inactive otherwise
          icon: ((query.get('sortCol') === property) ? classes.activeSortIcon : classes.inactiveSortIcon)
        }}
      >
        {children}
        {query.get('sortCol') === property ? (
          <span className={classes.visuallyHidden}>
            {query.get('sortDir') === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
}

export default TableHeader
