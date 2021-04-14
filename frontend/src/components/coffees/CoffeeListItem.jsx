import React from 'react';
import {Link} from 'react-router-dom';

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
    height: 300,
    width: 300,
    marginLeft:"auto",
    marginRight:"auto"

  },
  cardContent: {
    maxWidth:600
  },
  description: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  }
});

function CoffeeListItem(props) {
  const classes = useStyles();
  // const params = useParams();
  const {coffee} = props;
  let {avgRating} = props;

  if (!avgRating) {
    avgRating = 'No Ratings Yet!'
  } else {
    avgRating += ' Stars'
  }

  return (
    <Card className={classes.root}>
      <Link to={`/coffees/${coffee.id}`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={coffee.image_url}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {coffee.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h3">
            {coffee.region}
          </Typography>
          <Typography gutterBottom variant="h5" component="h4">
            {avgRating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
            {coffee.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <Button size="small" color="secondary">
          <Link to={`/coffees/${coffee.id}`}>Details</Link>
          </Button>
      </CardActions>
      </Link>
    </Card>
  );
}

export default CoffeeListItem;