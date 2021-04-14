/************************************
1. If you want to add or remove items you will need to change a variable called $slide-count in the CSS *minimum 3 slides

2. if you want to change the dimensions of the slides you will need to edit the slideWidth variable here 👇 and the $slide-width variable in the CSS.
************************************/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CarouselSlideItem.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 500
  },
  media: {
    height: 200,

  },
});

const slideWidth = 30;

const _items = [
    {
        player: {
            title: 'Efren Reyes',
            desc: 'Known as "The Magician", Efren Reyes is well regarded by many professionals as the greatest all around player of all time.',
            image: 'https://i.postimg.cc/RhYnBf5m/er-slider.jpg',
        },
    },
    {
        player: {
            title: "Ronnie O'Sullivan",
            desc: "Ronald Antonio O'Sullivan is a six-time world champion and is the most successful player in the history of snooker.",
            image: 'https://i.postimg.cc/qBGQNc37/ro-slider.jpg',
        },
    },
    {
        player: {
            title: 'Shane Van Boening',
            desc: 'The "South Dakota Kid" is hearing-impaired and uses a hearing aid, but it has not limited his ability.',
            image: 'https://i.postimg.cc/cHdMJQKG/svb-slider.jpg',
        },
    },
    {
        player: {
            title: 'Mike Sigel',
            desc: 'Mike Sigel or "Captain Hook" as many like to call him is an American professional pool player with over 108 tournament wins.',
            image: 'https://i.postimg.cc/C12h7nZn/ms-1.jpg',
        },
    },
    {
        player: {
            title: 'Willie Mosconi',
            desc: 'Nicknamed "Mr. Pocket Billiards," Willie Mosconi was among the first Billiard Congress of America Hall of Fame inductees.',
            image: 'https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg',
        },
    },
];

console.log("_ITEMS: ", _items)
// console.log("_ITEMS: ", _items)


const length = _items.length;
_items.push(..._items);

const sleep = (ms = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

function CarouselListItem(props) {
  const classes = useStyles();
  // const params = useParams();
  const {coffee} = props;
  let {avgRating} = props;

  if (!avgRating) {
    avgRating = 'No Ratings Yet!'
  } else {
    avgRating += ' Stars'
  }

  return (
    <Link to={`/coffees/${coffee.id}`}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={coffee.image_url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {coffee.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h4">
            {coffee.region}
          </Typography>
          <Typography gutterBottom variant="h5" component="h4">
            {avgRating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {coffee.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <Button size="small" color="primary">
            Details
          </Button>
      </CardActions>
    </Card>
    </Link>
  );
}

const createItem = (position, idx) => {
    const item = {
        styles: {
            transform: `translateX(${position * slideWidth}rem)`,
        },
        player: _items[idx].player,
    };

    switch (position) {
        case length - 1:
        case length + 1:
            item.styles = {...item.styles, filter: 'grayscale(1)'};
            break;
        case length:
            break;
        default:
            item.styles = {...item.styles, opacity: 0};
            break;
    }

    return item;
};


export default function CarouselSlideItem ({pos, idx, activeIdx}) {
  const item = createItem(pos, idx, activeIdx);

    return (
        <li className="carousel__slide-item" style={item.styles}>
            <div className="carousel__slide-item-img-link">
                <img src={item.player.image} alt={item.player.title} />
            </div>
            <div className="carousel-slide-item__body">
                <h4>{item.player.title}</h4>
                <p>{item.player.desc}</p>
            </div>
        </li>
    );
};



document.getElementById('root');