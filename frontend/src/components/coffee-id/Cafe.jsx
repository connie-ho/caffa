import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import MapContainer from './MapContainer';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  section: {
    display: 'flex',
    flexDirection:'row',
    paddingTop: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: '0 auto'
    },

  },
  root: {
    flex: 1,
    minWidth: '40%',
    padding: '1.5em',
    marginRight: '1em',
    borderTop: '1px solid rgb(238,238,238)',
    borderRadius: '1em',
  },
  media: {
    height: 300,
  },
  img: {
    padding: 0,
    margin: 0
  }
}));

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

  const classes = useStyles();

  return (
    cafeData && 
    <div className={classes.section}>
      <Card className={classes.root}>
        <CardMedia
          classes={{
            img: classes.img, 
            root: classes.media
          }}
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
