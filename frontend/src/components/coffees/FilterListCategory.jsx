import React from 'react';
import FilterListCategoryItem from './FilterListCategoryItem';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function FilterListCategory(props) {
  
  const {
    classes, 
    name, 
    items, 
    filters, 
    setFilters, 
    handleFilters,
    category
  } = props;
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const categoryItems = items.map((item,i) => {
    return(
      <FilterListCategoryItem
        key={item.id}
        classes={classes}
        item={item}
        category={category}
        filters={filters}
        setFilters={setFilters}
        handleFilters={handleFilters}
      />
    )
  })

 
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={name}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categoryItems}
        </List>
      </Collapse>
    </>
  )
}
