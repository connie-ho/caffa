import { React, useState, useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import DataContext from "../../contexts/DataContext";
import InputBase from "@material-ui/core/InputBase";

export default function SearchBar(props) {
  const { state } = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const [value, setValue] = useState("");
  const useStyles = makeStyles((theme) => ({
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    autoComplete: {
      border: "1px solid #d3d3d3",
      borderRadius: "2rem",

      [theme.breakpoints.up("xs")]: {
        width: "30ch",
      },
      [theme.breakpoints.up("sm")]: {
        width: "90ch",
      },
    },
  }));

  const classes = useStyles();

  return (
    <Autocomplete
      id="Search Bar"
      options={coffees}
      className={classes.autoComplete}
      getOptionLabel={(option) => `${option.brand} ${option.name}`}
      //set autocomplete to only open on input
      open={autoCompleteOpen}
      onInputChange={(event, value, reason) => {
        switch (reason) {
          case "input":
            setAutoCompleteOpen(!!value);
            break;
          case "reset":
          case "clear":
            setAutoCompleteOpen(false);
            break;
          default:
            break;
        }
      }}
      onBlur={() => {
        setAutoCompleteOpen(false);
      }}
      onFocus={() => {
        if (value) {
          setAutoCompleteOpen(true);
        }
      }}
      noOptionsText="We can't find your coffee! Try our image search!"
      renderInput={(params) => {
        const { InputLabelProps, InputProps, ...rest } = params;
        return (
          <InputBase
            placeholder="Search…"
            value={value}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            {...params.InputProps}
            {...rest}
          />
        );
      }}
      renderOption={(option) => {
        return (
          <>
            <span
              style={{ cursor: "pointer", backgroundColor: "transparent" }}
              onClick={() => {
                window.location.href = `/coffees/${option.id}`;
              }}
              onKeyDown={() => {
                window.location.href = `/coffees/${option.id}`;
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={option.image_url}
                  height={100}
                  width={100}
                  style={{ marginRight: "1em" }}
                  alt={option.name}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <p>{option.brand}</p>
                  <p style={{ marginTop: "-10px" }}>{option.name}</p>
                </div>
              </div>
            </span>
          </>
        );
      }}
    />
  );
}
