import React from 'react';
import Select, { OptionsType } from 'react-select';
import { useField } from 'formik';
import { ReactSelectOption } from '@typedefs/app';

interface Props<OptionType = string> {
  name: string;
  options: OptionsType<ReactSelectOption<OptionType>>;
  styles?: any;
  id?: string;
  placeholder?: string;
  closeMenuOnSelect?: boolean;
  isSearchable?: boolean;
  hideSelectedOptions?: boolean;
}

export default function SelectFormik<OptionType>({
  name,
  options,
  id,
  styles,
  placeholder,
  closeMenuOnSelect = true,
  isSearchable = true,
}: Props<OptionType>) {
  const [field] = useField({ name });
  const { onChange, value } = field;
  const handleChange = (option: ReactSelectOption<OptionType>) => {
    onChange({
      target: {
        name,
        value: option,
      },
    });
  };
  return (
    <Select
      id={id}
      placeholder={placeholder}
      styles={styles}
      options={options}
      onChange={handleChange}
      name={name}
      value={value}
      closeMenuOnSelect={closeMenuOnSelect}
      isSearchable={isSearchable}
    />
  );
}
