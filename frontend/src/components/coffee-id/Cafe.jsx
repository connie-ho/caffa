import {useEffect, useState} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import MapContainer from './MapContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import bean from '../../images/31080.png';

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
    backgroundColor: theme.palette.background.secondary,
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
  },
  loading: {
    margin: '2rem auto',
  }
}));

function Cafe(props) {

  const {coffee, cafeData, setCafeData} = props;
  // const [cafeData, setCafeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const getCafeData = async () => {

      const query = coffee.brand.toLowerCase().split(' ').join('+')
      const cafeDetails = await axios.get(`/api/cafes/?brand=${query}`)
      setCafeData((prev)=>(cafeDetails.data))
    }

    getCafeData()
    setLoading(false)
  }, [coffee, setCafeData])

  const classes = useStyles();

  return (
    <div className={classes.section}>
      {loading && 
      (<div className={classes.loading}>
        <CircularProgress color="primary" style={{position: 'center'}} /> 
      </div>)}
    {cafeData && 
    (<>
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
            Rating: {cafeData.rating}  <img src={bean} style={{ height:'15px', width:'15px'}} alt="bean"/>
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
      </>)}
    </div>

  )
}

export default Cafe
