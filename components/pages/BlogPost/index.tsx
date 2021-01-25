import React from 'react';
import { Link } from 'react-router-dom';
import ProfileNavContainer from '@containers/ProfileNavContainer';
import ArrowLeft from '@svg/arrow-left.svg';

import Post from './Post';
import PostSlider from './PostSlider';

import s from './style.module.css';
import GirlsWaiting from '@sections/GirlsWaiting';
import RecommendedContainer from '@containers/RecommendedContainer';
import BlogMore from '../Blog/BlogMore';

const posts = [
  {
    id: '01',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '02',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner1.jpg',
    tag: 'Gentleman`s guide',
  },
  {
    id: '03',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner2.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '04',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '05',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner1.jpg',
    tag: 'Gentleman`s guide',
  },
  {
    id: '06',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner2.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '07',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '08',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner1.jpg',
    tag: 'Gentleman`s guide',
  },
  {
    id: '09',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: '../assets/images/banner2.jpg',
    tag: 'Erotic Stories',
  },
];

const BlogPost = props => {
  return (
    <section className={s.blogPost}>
      <section className={s.nav}>
        <div className={s.container}>
          <div className={s.topNav}>
            <div className={s.topNavSide}>
              <Link to="/blog" className={`${s.navLink} ${s.left}`}>
                <ArrowLeft />
                Back to Blog
              </Link>
            </div>
            <div className={`${s.topNavSide} ${s.alignRight}`}>
              <ProfileNavContainer />
            </div>
          </div>
        </div>
      </section>
      <Post />
      <PostSlider posts={posts}/>
      <GirlsWaiting />
      <RecommendedContainer title="Recommended"/>
      <BlogMore />
    </section>
  );
};

export default BlogPost;
