import React, { useEffect } from 'react';
import Rating from '@simple/Rating';
import { useField } from 'formik';

interface Props {
  name: string;
  onClick?: () => void;
}

export default function RatingFormik({ onClick, name }: Props) {
  const [{ value }, { touched }, { setValue, setTouched }] = useField<number>({
    name,
  });

  const handleChange = (value: number) => {
    setTouched(true);
    setValue(value);
  };

  return (
    <Rating
      rate={touched ? value : 5}
      withRate={false}
      size="lg"
      onChange={handleChange}
    />
  );
}
