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
    tag: string;
  }[];
};

const PostSlider = ({ posts }: Props): ReactElement => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    speed: 300,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const slider = useRef(null);

  return (
    <section className={s.slider}>
      <div className={s.container}>
        <div className={s.titleWrapper}>
            <Title>Featured posts</Title>
        </div>
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
        <div className={s.sliderWrapper}>
          <Slider ref={slider} {...settings}>
            {posts.map(({ id, title, date, author, tag, image }) => (
              <div key={id} className={s.post}>
                <div className={s.postImage}>
                  <img src={image} alt={author} />
                  <span className={s.postTag}>{tag}</span>
                </div>
                <div className={s.postContent}>
                  <div>
                    <div className={s.postTitle}>{title}</div>
                    <div className={s.postInfo}>
                      <div className={s.postDate}>{date}</div>
                      <div className={s.postAuthor}>by {author}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PostSlider;
