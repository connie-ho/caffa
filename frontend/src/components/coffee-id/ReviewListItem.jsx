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

const useStyles = makeStyles((theme=>({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1em',
    maxWidth: '800px',
    border: '0px solid',
    borderRadius: '1rem',
    fontSize: '1.25em',
    marginBottom: '1em',
    background: 'rgb(255,247,245)',
    "&:hover": { 
      transform: "scale3d(1.05, 1.05, 1)", 
      background: '#e4d3cf'},
  },
  image:{
    width: '2em',
    height: '2em',
    border: '0px solid',
    borderRadius: '50%',
    marginRight: '0.75em'
  },
  userInfo:{
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5em',
    fontWeight: 600
  },
  rating: {
    background: theme.palette.primary.main,
    border: '1px solid #FCE4A2',
    borderRadius: '0.5em',
    padding: '0.2em 0.5em',
    marginRight: "1em",
  },
  bean: {
    marginLeft: "1em"
  },
  button: {
    marginRight: "1em"
  },
  description: {
    marginTop: '0.5em',
    wordWrap: 'break-word'
  }

})));

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
         <span className={classes.rating}>
          {review.rating} 
          <img src={bean} style={{ height:'15px', width:'15px', marginLeft: '0.1em'}}/> 
        </span>
       <div className={classes.description}>
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
              className={classes.button}
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
