import {useState, useEffect} from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import {getRegions} from '../../helpers/selectors';
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import classes from './Coffees.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    maxHeight:'10rem', 
    overflow:'auto'
  },

}));


export default function RegionSearch(props) {

  const classes = useStyles();
  const {
    filters, 
    setFilters,
    handleFilters,
    regions
  } = props; 
  const category = 'region';
  
  const handleChange = (event, value) => {
    
    // const currIndex = filters[category].indexOf(optionId) //checks if filter is already applied
    // const newCategory = [...filters[category]]; // initalize new state

    // if (currIndex === -1){
    //   newCategory.push(optionId) // if not already in array, add and remove from the list
    // } else {
    //   newCategory.splice(currIndex, 1) // remove if in the array
    // }

    const newCategory = [];
    for(const val of value){
      newCategory.push(val.id)
    }

    const newFilter = {
      ...filters, 
      [category]: newCategory
    }
    setFilters(prev => newFilter)
    handleFilters(newFilter);
  };


  return (
      <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={regions}
        getOptionLabel={(option) => option.type}
        getOptionSelected={(option, value) => option.type === value.type}
        defaultValue={[]}
        filterSelectedOptions={true}
        renderInput={(params) => (
          <TextField
          {...params}
          variant="outlined"
          placeholder="Regions"
          className={classes.textField}
          />
          )}
        onChange={(event, value) => handleChange(event, value)}
      />
    </div>
  );
}