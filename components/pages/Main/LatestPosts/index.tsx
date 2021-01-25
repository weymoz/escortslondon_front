import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from '@simple/Title';
import Button from '@simple/Button';
import Input from '@simple/Input';

import Arrow from '@svg/arrow-right.svg';
import posts from '@data/posts';

import s from './style.module.css';

const LatestPosts = props => {
  const handleInput = e => {
    const target = e.target;
  };
  return (
    <section className={s.latestPosts}>
      <div className={s.container}>
        <form className={s.form}>
          <div className={s.titleWrapper}>
            <Title content="Blog">Latest posts</Title>
            <p>Join our newsletter to stay updated on new girls and special offers!</p>
          </div>
          <div className={s.inputWrapper}>
            <Input
              id="subscribe"
              type="email"
              placeholder="Enter email address"
              name="subscribe"
              onChange={handleInput}
            />
            <div className={s.formBtn}>
              <Button size="sm">Join</Button>
            </div>
          </div>
        </form>
        <div className={s.itemsList}>
          {posts.map(el => (
            <div className={s.item} key={el.id}>
              <div className={s.itemImage}>
                <img src={el.image} alt={el.title} />
              </div>
              <div className={s.itemContent}>
                <div className={s.itemTitle}>{el.title}</div>
                <div className={s.itemDate}>{el.date}</div>
              </div>
            </div>
          ))}
          <div className={s.itemsListBtn}>
            <Link className={s.link} to="/">
              <span>Go to Blog</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
LatestPosts.propTypes = {};
export default LatestPosts;
