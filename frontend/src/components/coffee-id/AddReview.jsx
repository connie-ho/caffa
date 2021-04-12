import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function AddReview() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(value)
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="size-large"
          size="large"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}        
        />
        {value !== null && <Box ml={2}>{hover !== -1 ? hover : null}</Box>}
      </Box>
    </div>
  );
}
