import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import FilterListCategory from './FilterListCategory';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    height: '100%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subheader: {
    fontSize: '1.25rem'
  }
}));

export default function FilterList(props) {
  const classes = useStyles();

  const {
    categories, 
    filters, 
    setFilters,
    handleFilters} = props;

  const categoryList = Object.keys(categories).map((cat,i) => {
    return (
      <FilterListCategory
        key={i}
        name={categories[cat].name}
        category={cat} 
        classes={classes}
        items={Object.values(categories[cat].items)}
        filters={filters}
        setFilters={setFilters}
        handleFilters={handleFilters}
      />
    )
  })

  return (

    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader 
        className={classes.subheader}
        component="div" 
        id="nested-list-subheader">
          Filter By
        </ListSubheader>
      }
      className={classes.root}
    >
       {categoryList}
    </List>
      
  );
}
