import React from 'react';
// import {useParams} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 500,

  },
});

function CoffeeListItem(props) {
  const classes = useStyles();
  // const params = useParams();
  const {coffee} = props;
  let {avgRating} = props;

  if (!avgRating) {
    avgRating = 'No Ratings Yet!'
  }


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={coffee.image_url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {coffee.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h4">
            {coffee.region}
          </Typography>
          <Typography gutterBottom variant="h5" component="h4">
            {avgRating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {coffee.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default CoffeeListItem;