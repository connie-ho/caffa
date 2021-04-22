import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
    maxHeight: "10rem",
    overflow: "auto",
  },
  textField: {
    "& .MuiChip-root": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
}));

export default function RegionSearch(props) {
  const classes = useStyles();
  const { filters, setFilters, handleFilters, regions } = props;
  const category = "region";

  const handleChange = (event, value) => {
    const newCategory = [];
    for (const val of value) {
      newCategory.push(val.id);
    }

    const newFilter = {
      ...filters,
      [category]: newCategory,
    };
    setFilters((prev) => newFilter);
    handleFilters(newFilter);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={regions}
        getOptionLabel={(option) => option.type}
        getOptionSelected={(option, value) => option.type === value.type}
        defaultValue={[]}
        filterSelectedOptions={true}
        onChange={(event, value) => handleChange(event, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Regions"
            className={classes.textField}
          />
        )}
      />
    </div>
  );
}
