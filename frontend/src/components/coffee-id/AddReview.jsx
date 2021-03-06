import React, { useState, useContext } from "react";
import ReviewForm from "./ReviewForm";
import Stars from "./Stars";
import ReviewContext from "../../contexts/ReviewContext";
import UserContext from "../../contexts/UserContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// import classes from './Coffee.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    padding: "2em",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "0px solid",
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.secondary,
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
      background: "#e0d4a7",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 1em 0",
    },
  },
}));

export default function AddReview(props) {
  const { coffee, openReviewForm, setOpenReviewForm } = props;

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const { addReview } = useContext(ReviewContext);

  // user logic
  const { user, setOpenLogin } = useContext(UserContext);

  const handleClickOpenReviewForm = () => {
    if (!user) {
      setOpenLogin((prev) => true);
      return;
    }

    if (openReviewForm) {
      setRating((prev) => rating);
    } else {
      setOpenReviewForm(true);
    }
  };

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
    setRating(0);
  };

  const handleAddReview = () => {
    addReview({
      rating,
      description,
      user_id: user.id,
      coffee_id: coffee.id,
    }).then(() => {
      handleCloseReviewForm();
    });
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <h3>How did you like this Coffee?</h3>
        <Stars
          rating={rating}
          setRating={setRating}
          handleStarClick={handleClickOpenReviewForm}
        />
        <ReviewForm
          coffee={coffee}
          rating={rating}
          setRating={setRating}
          openReviewForm={openReviewForm}
          setOpenReviewForm={setOpenReviewForm}
          description={description}
          setDescription={setDescription}
          handleClickOpenReviewForm={handleClickOpenReviewForm}
          handleCloseReviewForm={handleCloseReviewForm}
          handleSubmitReviewForm={handleAddReview}
          handStarClick={setRating}
        />
      </CardContent>
    </Card>
  );
}
