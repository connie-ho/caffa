import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterListCategory from './FilterListCategory';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function FilterList(props) {
  const classes = useStyles();

  const {categories, filters, setFilters, handleFilters} = props;

  const categoryList = Object.keys(categories).map((cat,i) => {
    return (
      <FilterListCategory
        key={i}
        name={categories[cat].name}
        category={cat} 
        classes={classes}
        items={categories[cat].items}
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
        <ListSubheader component="div" id="nested-list-subheader">
          Filters
        </ListSubheader>
      }
      className={classes.root}
    >
       {categoryList}
    </List>
      
  );
}
