import React from 'react';
import PropTypes from 'prop-types';
import ClampLines from 'react-clamp-lines';

import s from './style.module.css';

const ReadMore = ({ text, id, lines, innerElement }) => (
  <ClampLines
    text={text}
    id={id}
    lines={lines}
    ellipsis="..."
    moreText="Read more >"
    lessText="Read less >"
    className={s.readMore}
    innerElement={innerElement}
  />
);

ReadMore.defaultProps = {
  innerElement: 'p',
};

ReadMore.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  lines: PropTypes.string,
  innerElement: PropTypes.string,
};

export default ReadMore;
