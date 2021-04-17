import {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Cafe(props) {

  const {coffee} = props;
  const [cafeData, setCafeData] = useState(null);

  useEffect(()=>{

    const getCafeData = async () => {

      const params={
        query: coffee.brand
      }

      const query = coffee.brand.toLowerCase().split(' ').join('+')
      const cafeDetails = await axios.get(`/api/cafes/`, {params})
      setCafeData((prev)=>(cafeDetails.data))
    }

    getCafeData()

  }, [coffee])

  console.log(cafeData)
  const classes = useStyles();

  return (
    cafeData && 
    <Link href={cafeData.url}>
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={cafeData.image_url}
        title={cafeData.name}
        />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {cafeData.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {cafeData.location.city}
          {cafeData.rating}
        </Typography>
      </CardContent>
  </Card>
    </Link>

  )
}

export default Cafe
