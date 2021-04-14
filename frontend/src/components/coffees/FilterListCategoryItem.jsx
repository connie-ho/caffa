import {useState} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox'

export default function FilterListCategory(props) {
  
  const {
    classes, 
    item, 
    filters, 
    setFilters, 
    handleFilters,
    category
  } = props;

  const [checked, setChecked] = useState(false);

  const handleChange = (event, value) => {

    const currIndex = filters.indexOf(value) //checks if filter is already applied
    const newFilters = [...filters];
    
    if (currIndex === -1){
      newFilters.push(value) // if not already in array, add
    } else {
      newFilters.splice(currIndex, 1) // remove if in the array
    }

    setFilters(newFilters)
    setChecked(event.target.checked);
    handleFilters(newFilters, category);
  };
  return (
    <ListItem button className={classes.nested}>
      <Checkbox
        checked={checked}
        onChange={(e)=> {handleChange(e,item.id)}}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <ListItemText primary={item.type} />
    </ListItem>

  )
}
