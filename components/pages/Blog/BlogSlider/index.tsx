import React, { ReactElement, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import Arrow from '@svg/sliderArrow.svg';

import Title from '@simple/Title';

import s from './style.module.css';

type Props = {
  posts: {
    id: string;
    title: string;
    text: string;
    image: string;
    author: string;
    date: string;
  }[];
};

const BlogSlider = ({ posts }: Props): ReactElement => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: false,
  };

  const slider = useRef(null);

  return (
    <section className={s.slider}>
      <div className={s.container}>
        <div className={s.sliderWrapper}>
          <Slider ref={slider} {...settings}>
            {posts.map(({ id, title, text, image, author, date }) => (
              <div key={id}>
                <Link to={`blog/${id}`} className={s.slide}>
                  <div className={s.slideContent}>
                    <div className={s.slideInfo}>
                      <div className={s.date}>{date}</div>
                      <div className={s.author}> by {author}</div>
                    </div>
                    <div className={s.slideTitle}>
                      <Title size="h5">{title}</Title>
                    </div>
                    <div className={s.slideText}>{text}</div>
                  </div>
                  <div className={s.slideImage}>
                    <img src={image} alt={title} />
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          <div className={s.arrows}>
            <div
              className={`${s.prevArrow}`}
              onClick={() => slider.current.slickPrev()}
            >
              <Arrow />
            </div>
            <div
              className={`${s.nextArrow}`}
              onClick={() => slider.current.slickNext()}
            >
              <Arrow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
