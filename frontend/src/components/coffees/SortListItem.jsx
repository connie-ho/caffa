import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function SortListItem(props) {

  const {
    key, 
    name, 
  } = props;

  

  return (
    <FormControlLabel 
      value={name} 
      control={<Radio />} 
      label={name}
    />
  )

}
