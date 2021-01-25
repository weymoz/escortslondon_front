import React, { ReactElement } from 'react';
import { useField } from 'formik';
import cx from 'classnames';
import s from './style.module.css';

type CssDisplay = 'inline' | 'block';

interface Props {
  cssDisplay?: CssDisplay;
  name: string;
  className?: string;
  onlyTouched?: boolean;
}

export default function ErrorMessageFormik({
  cssDisplay = 'block',
  name,
  className,
  onlyTouched = false,
}: Props): ReactElement {
  const [, meta] = useField({ name });
  const combinedClassName = cx(s.errorMessage, className);
  if (onlyTouched) {
    if (meta.touched) return null;
  } else {
    if (!meta.error || !meta.touched) return null;
  }

  return React.createElement(
    cssDisplay === 'block' ? 'div' : 'span',
    { className: combinedClassName },
    meta.error,
  );
}
