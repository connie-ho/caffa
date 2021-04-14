/************************************
1. If you want to add or remove items you will need to change a variable called $slide-count in the CSS *minimum 3 slides

2. if you want to change the dimensions of the slides you will need to edit the slideWidth variable here 👇 and the $slide-width variable in the CSS.
************************************/
import React from 'react';
import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import CoffeeListItem from '../coffees/CoffeeListItem.jsx';
import CarouselSlideItem from './CarouselSlideItem.jsx';
import HomeContext from '../../contexts/DataContext';
import './CarouselSlideItem.scss';

import axios from 'axios';


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

const length = _items.length;
_items.push(..._items);

const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const keys = Array.from(Array(_items.length).keys());

export default function Carousel() {
  const { homeCoffees } = useContext(HomeContext);
  const [items, setItems] = useState(keys);
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const bigLength = items.length;

  console.log("Home Coffees in CarouselSlide :", homeCoffees)

  const prevClick = (jump = 1) => {
      if (!isTicking) {
          setIsTicking(true);
          setItems((prev) => {
              return prev.map((_, i) => prev[(i + jump) % bigLength]);
          });
      }
  };

  const nextClick = (jump = 1) => {
      if (!isTicking) {
          setIsTicking(true);
          setItems((prev) => {
              return prev.map(
                  (_, i) => prev[(i - jump + bigLength) % bigLength],
              );
          });
      }
  };

  const handleDotClick = (idx) => {
      if (idx < activeIdx) prevClick(activeIdx - idx);
      if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  useEffect(() => {
      if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
      setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
  }, [items]);

  return (
    <div className="carousel__wrap">
          <div className="carousel__inner">
              <button
                  className="carousel__btn carousel__btn--prev"
                  onClick={() => prevClick()}>
                  <i className="carousel__btn-arrow carousel__btn-arrow--left" />
              </button>
              <div className="carousel__container">
                    <h1> Carousel Template</h1>
                  <ul className="carousel__slide-list">
                      {items.map((pos, i) => (
                          <CarouselSlideItem
                              key={i}
                              idx={i}
                              pos={pos}
                              activeIdx={activeIdx}
                              coffee={homeCoffees}
                          />
                      ))}
                  </ul>
              </div>
              <button
                  className="carousel__btn carousel__btn--next"
                  onClick={() => nextClick()}>
                  <i className="carousel__btn-arrow carousel__btn-arrow--right" />
              </button>
              <div className="carousel__dots">
                  {items.slice(0, length).map((pos, i) => (
                      <button
                          key={i}
                          onClick={() => handleDotClick(i)}
                          className={i === activeIdx ? 'dot active' : 'dot'}
                      />
                  ))}
              </div>
          </div>
      </div>
  );
};