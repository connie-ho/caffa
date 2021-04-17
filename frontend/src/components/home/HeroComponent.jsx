import {React, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import heroImage from '../../images/heroComponent5.png'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  
  container:{
    display: 'flex',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex:'-1',
    objectFit:'cover'
  },
  imageContainer: {
    position: 'relative',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden'
  },
  image :{
    display:'block',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '70%',
    transform:`translate(0em,-6em)`
  },
  title: {
    display: 'inline-block',
    position: 'absolute',
    top: '55%',
    margin: '10,10',
    color: 'Black',
    textAlign: 'center',
    height: '0',
    right:'57%',
    zIndex:1,

    [theme.breakpoints.up('md')]: {
    
    display: 'inline-block',
    position: 'absolute',
    top: '53%',
    margin: '10,10',
    color: 'Black',
    textAlign: 'center',
    height: '0',
    right:'69%',
    zIndex:1,
  }
  },
  subtitle: {
    display: 'inline-block',
    position: 'absolute',
    top: '63%',
    color: 'black',
    right:'-5%',
    fontSize:'25px',
    width:'100vw',
    [theme.breakpoints.up('md')]:{
    display: 'inline-block',
    position: 'absolute',
    top: '65%',
    color: 'black',
    textAlign: 'center',
    right:'16.5%',
    fontSize:'30px'
    }
  },
}));

 export default function HeroComponent() {

  const classes = useStyles();

  return (
    <Grid container direction="row"
    justify="center"
    alignItems="center"
    className={classes.container}>
      <Grid item xs={12} container className={classes.imageContainer}>
        <img src= {heroImage} className = {classes.image}  />
        <Grid item>
        <Typography variant='h1' className={classes.title}>Caffa</Typography>
        <Typography variant='h2' className={classes.subtitle}>Bringing you energy whenever, wherever.</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
} <Grid item xs={12}></Grid>