import {useState} from 'react';
import SortListItem from './SortListItem';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
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
  
  const {
    sortOptions,
    handleSort
  } = props;
  
  const classes = useStyles();

  const [sortOption, setSortOption] = useState(1);

  const handleChange = (event, sortOption) => {
    handleSort(sortOption)
    setSortOption(event.target.value);
  };

  const sortList = Object.keys(sortOptions).map(option => {
    return (
    <SortListItem 
      key={option}
      name={sortOptions[option]}
      // handleSort={handleSort}
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
      <FormControl component="fieldset">
        <RadioGroup aria-label="sorting" name="sorting1" value={sortOption} onChange={handleChange}>
          {sortList}
        </RadioGroup>
    </FormControl>
    </List>
  );
}
