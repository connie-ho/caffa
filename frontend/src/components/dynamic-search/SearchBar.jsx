import {React, useState, useContext} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fade, useTheme, makeStyles } from "@material-ui/core/styles";
import DataContext from '../../contexts/DataContext';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

export default function SearchBar(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees)

  const useStyles = makeStyles((theme) => ({ 
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      }
    }
  }))

  const classes = useStyles();


  return (
    <Autocomplete
    id="Search Bar"
    options={coffees}
    freeSolo
    getOptionLabel={(option) => option.name }
    style={{ width: 600 }}
    noOptionsText="We can't find your coffee!"
    renderInput={(params) => {
    const { InputLabelProps, InputProps, ...rest } = params;
    return <InputBase 
    placeholder="Search…"
    classes={{
      root: classes.inputRoot,
      input: classes.inputInput,
    }}
      {...params.InputProps} {...rest} />;
    }}
    renderOption={option => {
      return(
        <>
         <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.location.href = `/coffees/${option.id}`
            }}>
            <IconButton color="secondary">
            <img src= {option.image_url} height={100} width={100} />
            </IconButton>
            {option.name}
        </span>
        </>
      )
    }}
  />
  )


}

