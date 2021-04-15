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

    const currIndex = filters[category].indexOf(value) //checks if filter is already applied
    const newCategory = [...filters[category]]; // initalize new state

    if (currIndex === -1){
      newCategory.push(value) // if not already in array, add
    } else {
      newCategory.splice(currIndex, 1) // remove if in the array
    }

    const newFilter = {
      ...filters, 
      [category]: newCategory
    }

    setFilters(prev => newFilter)
    setChecked(event.target.checked);
    handleFilters(newFilter);
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
