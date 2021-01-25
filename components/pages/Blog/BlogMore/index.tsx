import React, { useState } from 'react';

import Title from '@simple/Title';
import Input from '@simple/Input';
import Button from '@simple/Button';
import WelcomeImage from '@svg/welcome.svg';

import s from './style.module.css';

const BlogMore = () => {
  const [data, setInput] = useState({ subscribe: '' });
  const handleChange = e => {
    const { value, name } = e.target;
    setInput({ ...data, [name]: value });
  };
  return (
    <section className={s.blogMore}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.titleWrapper}>
            <Title size="h3">Hungry for more?</Title>
          </div>
          <p>Join our newsletter to stay updated on new girls and special offers!</p>
          <form className={s.form} onSubmit={e => e.preventDefault()}>
            <Input
              type="email"
              id="subscribe"
              name="subscribe"
              placeholder="Enter email address"
              value={data.subscribe}
              onChange={handleChange}
            />
            <div className={s.formBtn}>
              <Button size="sm">Subscribe</Button>
            </div>
          </form>
        </div>
        <div className={s.image}>
          <WelcomeImage />
        </div>
      </div>
    </section>
  );
};
export default BlogMore;
