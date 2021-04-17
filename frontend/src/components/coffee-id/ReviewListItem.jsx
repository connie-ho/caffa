import React, {useContext, useState} from 'react';
import UserContext from '../../contexts/UserContext';
import ReviewContext from '../../contexts/ReviewContext';

import DeleteReview from './DeleteReview';
import EditReview from './EditReview';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import bean from '../../images/31080.png';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    border: '0px solid',
    borderRadius: '1rem',
    fontSize: '1.25em',
    marginBottom: '1em'
  },
  image:{
    width: '2em',
    height: '2em',
    border: '0px solid',
    borderRadius: '50%',
    marginRight: '0.5em'
  },
  userInfo:{
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600
  },


});

export default function ReviewListItem(props) {

  const classes = useStyles();
  const {review, reviewUser, coffee} = props;

  // formatting date
  const dateArr = new Date(review.created_at).toDateString().split(' ');
  const date = `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  
  const {user} = useContext(UserContext);
  
  // define edit and delete functionality
  const {editReview, deleteReview} = useContext(ReviewContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenReviewForm = () => {
    setOpenReviewForm(true);
  };

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
  };

  return (
    <>
    <Card className={classes.root}>
      <CardContent>
       <div>
         {review.rating} 
        <img src={bean} style={{ height:'15px', width:'15px'}}/> 
       </div>
       <div>
         {review.description}
       </div>
       <div className={classes.userInfo}>
        <img 
          src={reviewUser.avatar_url} 
          alt={reviewUser.first_name}
          className={classes.image} 
          />
        <div>{reviewUser.first_name} {reviewUser.last_name}</div>
      </div>
      <Typography variant="body2" color="textSecondary">
      {date}
      </Typography>

      </CardContent>
      <CardActions>
        {
          (user && user.id === review.user_id) ? 
          (<div>
            <Button
              variant="outlined"
              color="primary" 
              size="small"
              onClick={handleClickOpenReviewForm}
            >Edit</Button>
            <Button 
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleClickOpenDelete}
            >Delete</Button>
          </div>) : ''
        }
      </CardActions>
    </Card>
    <DeleteReview
      id={review.id}
      open={openDelete}
      handleClose={handleCloseDelete}
      handleClickOpen={handleClickOpenDelete}
    />
     <EditReview
      coffee={coffee}
      review={review}
      openReviewForm={openReviewForm}
      setOpenReviewForm={setOpenReviewForm}
      handleCloseReviewForm={handleCloseReviewForm}
      handleClickOpenReviewForm={handleClickOpenReviewForm}
    />
    </>
  );
}
