import React from 'react';


import BlogSlider from './BlogSlider';
import BlogPosts from './BlogPosts';
import BlogMore from './BlogMore';
import GirlsWaiting from '@sections/GirlsWaiting';

const posts = [
  {
    id: '01',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '02',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner1.jpg',
    tag: 'Gentleman`s guide',
  },
  {
    id: '03',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner2.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '04',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '05',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner1.jpg',
    tag: 'Gentleman`s guide',
  },
  {
    id: '06',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner2.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '07',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner.jpg',
    tag: 'Erotic Stories',
  },
  {
    id: '08',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'Work were sending me off on a business trip for a couple of days. I’d be travelling to Mayfair in London and then staying in a hotel that would be paid for by the company...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner1.jpg',
    tag: 'Gentleman`s guide',
  },
  {
    id: '09',
    title: 'OWO escort deep throats client on hot summers day',
    text:
      'It was the middle of the summer and my favourite client had hired us a sweet lodge just on the outskirts of London; it was refreshingly...',
    date: 'Feb 12, 2020',
    author: 'Dana Bates',
    image: './assets/images/banner2.jpg',
    tag: 'Erotic Stories',
  },
];

const Blog = props => {
  return (
    <>
      <BlogSlider posts={posts} />
      <BlogPosts posts={posts} />
      <BlogMore />
      <GirlsWaiting />
    </>
  );
};

export default Blog;
