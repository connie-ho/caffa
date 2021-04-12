import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function Stars(props) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(value)
  const {handleClickOpen} = props;

  return (
    <div>
      <Box  component="fieldset" mb={3} borderColor="transparent">
        <h1>How did you like this Coffee?</h1>
        <Rating
          name="size-large"
          size="large"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}  
          onClick={()=>{handleClickOpen(value)}}    
        />
        {value !== null && <Box ml={2}>{hover !== -1 ? hover : null}</Box>}
      </Box>
    </div>
  );
}
