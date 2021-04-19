import {useState} from 'react';
import SortListItem from './SortListItem';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '0.5em',
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subheader: {
    fontSize: '1.25rem'
  },
}));

export default function SortList(props) {
  
  const {
    sortOptions,
    handleSort
  } = props;
  
  const classes = useStyles();

  const [sortOption, setSortOption] = useState('Recommended');

  const handleChange = (event, sortOption) => {
    handleSort(sortOption)
    setSortOption(event.target.value);
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
        <ListSubheader component="div" id="nested-list-subheader" className={classes.subheader}>
          Sort By
        </ListSubheader>
      }
      className={classes.root}
    >
      <FormControl component="fieldset">
        <RadioGroup 
        className={classes.radio}
        aria-label="sorting" 
        name="sorting1" value={sortOption} 
        onChange={handleChange}>
          {sortList}
        </RadioGroup>
    </FormControl>
    </List>
  );
}
