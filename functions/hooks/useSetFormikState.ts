import { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { CastingFormState } from '@pages/Casting';
import { FieldValue } from '@components/pages/Casting/FieldValue';

const useSetFormikState: <V>(
  name: string,
) => (value: FieldValue<V> | null) => void = (name: string) => {
  const formikContext = useFormikContext<CastingFormState>();
  const { setFormikState } = formikContext;
  const setState1level = useCallback(value => {
    setFormikState(state => {
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value ? value.getValue() : null,
        },
      };
    });
  }, []);

  const setState2levels = useCallback(value => {
    const [level1prop, level2prop] = name.split('.');
    setFormikState(state => {
      return {
        ...state,
        values: {
          ...state.values,
          [level1prop]: {
            ...state.values[level1prop],
            [level2prop]: value ? value.getValue() : null,
          },
        },
      };
    });
  }, []);

  if (name.includes('.')) {
    return setState2levels;
  } else {
    return setState1level;
  }
};

export default useSetFormikState;
