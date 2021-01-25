import React, { useRef, useMemo } from 'react';
import Select from 'react-select';
import s from './style.module.css';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAddressesByPostcode,
  selectAddresses,
  cleanAddresses,
} from '@store/escortDate';
import { RootState } from '@store/reducer';
import { ReactSelectOption } from '@typedefs/app';

interface Props {
  className: string;
  onChange: (o: ReactSelectOption<string>) => void;
}

export default function SelectPostcode({ className, onChange }: Props) {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const foundAddresses = useSelector<RootState, string[]>(selectAddresses);

  const options = useMemo(() => {
    return foundAddresses.map(address => ({
      value: address,
      label: address,
    }));
  }, [foundAddresses]);

  const handleClick = () => {
    dispatch(cleanAddresses());
    dispatch(addAddressesByPostcode(inputRef.current.value));
  };

  return (
    <div className={cx(s.wrapper, className)}>
      <div className={s.inputWrapper}>
        <input placeholder="Enter Your postcode" ref={inputRef} type="text" />
        <button onClick={handleClick} type="button" className={s.findButton}>
          Find
        </button>
      </div>
      {foundAddresses.length > 0 && (
        <Select
          placeholder={`${options.length} addresses found`}
          options={options}
          onChange={onChange}
        />
      )}
    </div>
  );
}
