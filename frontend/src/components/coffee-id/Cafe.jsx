import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import MapContainer from './MapContainer';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection:'row',
    padding: '5rem 10rem',
    paddingTop: 0
  },
  root: {
    minWidth: '40%',
    marginRight: '1em',
  },
  media: {
    height: 300,
  },
  map: {
  }
});

function Cafe(props) {

  const {coffee} = props;
  const [cafeData, setCafeData] = useState(null);

  useEffect(()=>{

    const getCafeData = async () => {

      const query = coffee.brand.toLowerCase().split(' ').join('+')
      const cafeDetails = await axios.get(`/api/cafes/?brand=${query}`)
      setCafeData((prev)=>(cafeDetails.data))
    }

    getCafeData()

  }, [coffee])

  console.log(cafeData)
  const classes = useStyles();

  return (
    cafeData && 
    <div className={classes.section}>
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
            Rating: {cafeData.rating}
          </Typography>
        <Link href={cafeData.url}>
          See More Details On Yelp
         </Link>
        </CardContent>
    </Card>
    <MapContainer
      className={classes.map} 
      name={cafeData.name}
      latitude={cafeData.coordinates.latitude}
      longitude={cafeData.coordinates.longitude}
      distance={Math.round(cafeData.distance/1000 * 10) / 10}
    />
    </div>

  )
}

export default Cafe
