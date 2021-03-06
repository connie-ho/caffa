import { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CoffeeCarousel from "../home/Carousel/CoffeeCarousel.jsx";
import EditorPick from "../home/EditorsPicks";
import Aos from "aos";
import "aos/dist/aos.css";

const kevinDescription = "You won't want to miss out on this epic espresso.";

const justinDescription = "Keep it simple, like I always say!";

const connieDescription =
  "Super versatile and quick to make. Enjoy it as  vietnamese coffee, or whip it with sugar to make dalgona coffee!";
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "4.0rem",
    margin: "0px 20px 0px 20px ",
  },
  header: {
    fontSize: "2.5rem",
    margin: "0 0.5em",
  },
  subtitle: {
    fontSize: "1.5rem",
    margin: "0 1rem",
  },
  paragraph: {
    fontSize: "1.5rem",
    margin: "0px 16px 0px 16px",
  },
  titleContainer: {
    margin: "5rem 0rem 11rem 0rem",
  },
}));

const TopPicks = (props) => {
  useEffect(() => {
    Aos.init({});
  }, []);

  const { homeCoffees } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={false} sm={1} />
      <Grid item xs={12} sm={10}>
        <Grid
          container
          direction="column"
          style={{ margin: "5rem 0rem 11rem 0rem" }}
        >
          <Typography variant="h2" className={classes.title}>
            Caffa
          </Typography>
          <Typography variant="h4" className={classes.paragraph}>
            Great coffee is a simple joy. Finding the perfect one should be just
            as simple.
          </Typography>
        </Grid>
        <div data-aos="fade" data-aos-once="true">
          <Grid container direction="column">
            <Typography variant="h2" className={classes.header} gutterBottom>
              Editor Picks
            </Typography>
            <Typography variant="h4" className={classes.subtitle} gutterBottom>
              What gets us up in the mornings.
            </Typography>
            <Grid container direction="row">
              <Grid
                container
                justify="center"
                xs={12}
                sm={6}
                lg={4}
                style={{ paddingBottom: "1em", paddingTop: "1em" }}
              >
                <EditorPick
                  userid={2}
                  description={connieDescription}
                  number={22}
                  img="https://avatars.githubusercontent.com/u/66891817?v=4"
                />
              </Grid>
              <Grid
                container
                justify="center"
                xs={12}
                sm={6}
                lg={4}
                style={{ paddingBottom: "1em", paddingTop: "1em" }}
              >
                <EditorPick
                  userid={3}
                  number={20}
                  description={justinDescription}
                  img="https://avatars.githubusercontent.com/u/73570663?v=4"
                />
              </Grid>
              <Grid
                container
                justify="center"
                xs={12}
                sm={6}
                lg={4}
                style={{ paddingBottom: "1em", paddingTop: "1em" }}
              >
                <EditorPick
                  userid={1}
                  number={21}
                  description={kevinDescription}
                  img="https://avatars.githubusercontent.com/u/31554101?v=4"
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div data-aos="fade" data-aos-once="true">
          <Typography variant="h2" className={classes.header} gutterBottom>
            Top Favorites
          </Typography>
          <Typography variant="h4" className={classes.subtitle}>
            Only the best of the best! Chosen by you.
          </Typography>
          <CoffeeCarousel homeCoffees={homeCoffees} type="favorite">
            {" "}
          </CoffeeCarousel>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div data-aos="fade" data-aos-offset="650" data-aos-once="true">
          <Typography variant="h2" className={classes.header} gutterBottom>
            Top Reviewed
          </Typography>
          <Typography variant="h4" className={classes.subtitle}>
            The latest and greatest! Hottest coffees of all time.
          </Typography>
          <CoffeeCarousel homeCoffees={homeCoffees} type="rating">
            {" "}
          </CoffeeCarousel>
        </div>
      </Grid>
      <Grid item xs={false} sm={1} />
    </Grid>
  );
};

export default TopPicks;
