import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: 0,
    padding: ".25em 2em",
    width: 250,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
}));

export default function SortListItem(props) {
  const classes = useStyles();

  const { name } = props;

  return (
    <FormControlLabel
      className={classes.root}
      value={name}
      control={<Radio color="primary" />}
      label={name}
    />
  );
}
