import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import Arrow from '@svg/arrow-right.svg';

import Title from '@simple/Title';

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

const tags = [
  {
    id: '532',
    tag: 'All',
  },
  {
    id: '53312',
    tag: 'Gentleman`s guide',
  },
  {
    id: '51332',
    tag: 'Erotic Stories',
  },
];

import s from './style.module.css';

const BlogPosts = ({ posts }: Props): ReactElement => {
  return (
    <section className={s.blogPosts}>
      <div className={s.container}>
        <div className={s.blogPostsNavigation}>
          <Title size="h2">Latest posts</Title>
          <div className={s.tagList}>
            {tags.map(({ id, tag }) => (
              <div key={id} className={s.tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div className={s.blogPostsList}>
          {posts.map(({ id, title, text, date, author, tag, image }) => (
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
                  <div className={s.postText}>{text}</div>
                </div>
                <Link to="/" className={s.postLink}>
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={s.blogPostsPagination}>
          <ul className={s.paginationList}>
            <li className={s.paginationBtn}>1</li>
            <li className={s.paginationBtn}>2</li>
            <li className={s.paginationBtn}>...</li>
            <li className={s.paginationBtn}>14</li>
            <li className={s.paginationBtn}>15</li>
            <li className={`${s.paginationBtn} ${s.next}`}>
              Next <Arrow />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
