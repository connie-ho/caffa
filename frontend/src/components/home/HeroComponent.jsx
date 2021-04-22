import { React } from "react";
import Grid from "@material-ui/core/Grid";
import heroImage from "../../images/cafecropped.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    zIndex: "-1",
    objectFit: "cover",
  },
  imageContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: "100px",
    },
  },
  image: {
    objectFit: "cover",
    width: "100%",
    maxHeight: "60vh",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
  },
  title: {
    fontSize: "4rem",

    [theme.breakpoints.up("md")]: {
      display: "inline-block",
      position: "absolute",
      margin: "10,10",
      color: "Black",
      height: "0",
      zIndex: 1,
    },
  },
  subtitle: {
    [theme.breakpoints.up("md")]: {
      display: "inline-block",
      top: "65%",
      color: "Black",
      textAlign: "center",
      fontSize: "30px",
    },
  },
}));

export default function HeroComponent() {
  const classes = useStyles();

  return (
    <Grid item xs={12} container className={classes.imageContainer}>
      <img src={heroImage} className={classes.image} alt="cafe" />
      <Grid item></Grid>
    </Grid>
  );
}
<Grid item xs={12}></Grid>;
