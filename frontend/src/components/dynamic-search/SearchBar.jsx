import {React, useState, useContext} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fade, useTheme, makeStyles } from "@material-ui/core/styles";
import DataContext from '../../contexts/DataContext';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

export default function SearchBar(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees)
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false)
  const [value,setValue] = useState('')
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
    getOptionLabel={(option) => option.name }
    style={{ width: 600 }}
    //set autocomplete to only open on input
    open={autoCompleteOpen}
    onInputChange={(event, value, reason) => {
      switch(reason) {
        case 'input':
          setAutoCompleteOpen(!!value);
          break;
        case 'reset':
        case 'clear':
          setAutoCompleteOpen(false);
          break;
        default:
          console.log(reason);
      };        
    }}
    onBlur={() => {setAutoCompleteOpen(false)}}
    onFocus={() => { if (value) {
      setAutoCompleteOpen(true)
    }}}
    noOptionsText="We can't find your coffee! Try our image search!"
    renderInput={(params) => {
    const { InputLabelProps, InputProps, ...rest } = params;
    return <InputBase 
    placeholder="Search…"
    value={value}
    setValue={(e) => {setValue(e.current.value)}}
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
            style={{ cursor: "pointer", backgroundColor:'transparent' }}
            onClick={() => {
              window.location.href = `/coffees/${option.id}`
            }}> 
            <img src= {option.image_url} height={100} width={100} />
            {option.name}
        </span>
        </>
      )
    }}
  />
  )


}

