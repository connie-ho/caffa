import {useState} from 'react';
import SortListItem from './SortListItem';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SortList(props) {
  
  const {sortOptions} = props;
  
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const sortList = Object.keys(sortOptions).map(option => {
    return (
    <SortListItem 
      key={option}
      name={sortOptions[option]}
    />)
  })

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Sort By
        </ListSubheader>
      }
      className={classes.root}
    >
      {sortList}
    </List>
  );
}
