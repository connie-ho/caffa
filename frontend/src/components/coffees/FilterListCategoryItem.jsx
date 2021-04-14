import {useState} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox'

export default function FilterListCategory(props) {
  
  const {
    classes, 
    item, 
    filterItems, 
    setFilterItems, 
    handleFilters,
    category
  } = props;

  const [checked, setChecked] = useState(false);

  const handleChange = (event, value) => {

    const currIndex = filterItems.indexOf(value) //checks if filter is already applied
    const newFilterItems = [...filterItems];
    
    if (currIndex === -1){
      newFilterItems.push(value) // if not already in array, add
    } else {
      newFilterItems.splice(currIndex, 1) // remove if in the array
    }

    setFilterItems(newFilterItems)
    setChecked(event.target.checked);
    handleFilters(newFilterItems, category);
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
