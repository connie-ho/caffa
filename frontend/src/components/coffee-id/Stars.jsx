import React, {useState, useContext} from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function Stars(props) {

  const {handleStarClick, rating, setRating} = props;
  const [hover, setHover] = useState(rating);

  return (
    <div>
      <Box  component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="size-large"
          size="large"
          value={rating}
          precision={0.5}
          onChange={(event, newRating) => {
            setRating(prev => newRating);
          }}
          onChangeActive={(event, newHover) => {
            setHover(prev => newHover);
          }}  
          onClick={handleStarClick}    
        />
        {/* {value !== null && <Box ml={2}>{hover !== -1 ? hover : null}</Box>} */}
      </Box>
    </div>
  );
}
