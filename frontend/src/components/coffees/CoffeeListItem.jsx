import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import bean from '../../images/31080.png'

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 400,
    borderRadius:'2%',
    transition: "transform 0.15s ease-in-out",
    "&:hover": { 
    transform: "scale3d(1.05, 1.05, 1)", 
    background: 'transparent'},
  },
  media: {
    height: 275,
    backgroundSize: 'contain'
    
  },
  cardContent: {
    height: 175,
  },
  description: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical"
  },
});

function CoffeeListItem(props) {
  const classes = useStyles();
  // const params = useParams();
  const {coffee} = props;

  return (
    <Card className={classes.root} variant='outlined'>
      <CardActionArea >
      <Link to={`/coffees/${coffee.id}`}>
        
        <CardMedia
          className={classes.media}
          image={coffee.image_url}
        />
        <CardContent className={classes.cardContent}>
        <Typography variant="h6" style={{ fontSize:'1rem'  }} component="h6">
            {coffee.brand}
          </Typography>
          <Typography variant="h2" style={{ fontSize:'1.3rem'  }} component="h2">
            {coffee.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" style={{ fontSize:'1.0em', padding:'10 10', color:'#646264'}} component="h3">
            {coffee.region} | {coffee.avg_rating? coffee.avg_rating: 'No Ratings Yet!'} {coffee.avg_rating && <img src={bean} style={{ height:'15px', width:'15px'}} /> }
          </Typography>
        </CardContent>
      </Link>
      </CardActionArea>
    </Card>
  );
}

export default CoffeeListItem;