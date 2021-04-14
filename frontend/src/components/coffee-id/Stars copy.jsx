import React, {useState, useContext} from 'react';
import ReviewContext from '../../contexts/ReviewContext';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function Stars(props) {
  const {value, setValue} = useContext(ReviewContext);

  const [hover, setHover] = useState(value)
  const {handleClickOpen, rating} = props;

  return (
    <div>
      <Box  component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="size-large"
          size="large"
          value={value? value: rating}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(prev => newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(prev => newHover);
          }}  
          onClick={()=>{
            value? handleClickOpen(value): setValue(value)
          }}    
        />
        {/* {value !== null && <Box ml={2}>{hover !== -1 ? hover : null}</Box>} */}
      </Box>
    </div>
  );
}
